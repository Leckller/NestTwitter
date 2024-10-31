import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import FollowerEntity from "./Follower.Entity";
import { Repository } from "typeorm";
import UserEntity from "../User/User.entity";
import ResponseDto from "src/Utils/Response.Dto";
import LikeEntity from "src/Like/Like.entity";

@Injectable()
export default class FollowerService {

    constructor(
        @InjectRepository(FollowerEntity)
        private readonly followerRepo: Repository<FollowerEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(LikeEntity)
        private readonly likeRepo: Repository<LikeEntity>,
    ) { }

    public async createFollower(followedId: number, followingId: number) {

        if (followedId === followingId) {

            throw new BadRequestException(new ResponseDto("Você não pode seguir a si mesmo.", false, {}));

        }

        const followedUser = await this.userRepo.findOne({ where: { id: followedId } });

        if (!followedUser) {

            throw new NotFoundException(new ResponseDto("Usuário não encontrado", false, {}));

        }

        const followingUser = await this.userRepo.findOne({ where: { id: followingId } });

        if (!followingUser) {

            throw new NotFoundException(new ResponseDto("Usuário não encontrado", false, {}));

        }

        const findFollow = await this.followerRepo.findOne({ where: { followed: followedUser, following: followingUser } });

        // Caso encontre o vinculo entre os usuários, ele é removido.
        if (findFollow) {

            await this.followerRepo.remove(findFollow);

            return new ResponseDto(`${followingUser.name} deixou de seguir ${followedUser.name}`, true, {});

        }
        // Caso não encontre o vinculo entre os usuários, ele é criado.
        const follow = this.followerRepo.create({ followed: followedUser, following: followingUser });

        await this.followerRepo.save(follow);

        return new ResponseDto(`${followingUser.name + "-" + followingUser.address} agora está seguindo ${followedUser.name + "-" + followedUser.address}`, true, {});

    }

    public async getPostsByFollows(userId: number, page = 0) {

        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user) {

            throw new NotFoundException(new ResponseDto("Usuário não encontrado", false, {}));

        }

        // essa aq vai ser chata de fazer tbm
        const posts = await this.followerRepo.find({
            where: { following: user },
            relations: { followed: { posts: { likes: { user: true } } } },
            order: { id: "DESC" },
            skip: page * 8,
            take: 10,
            select: {
                followed: {
                    id: true, name: true, photo: true, address: true, posts: {
                        id: true,
                        text: true,
                        bgColor: true,
                        textColor: true,
                        likes: { id: true, user: { photo: true, name: true, address: true, id: true } }
                    }
                }
            }
        });

        return new ResponseDto('Buble posts', true, { posts });

    }

};