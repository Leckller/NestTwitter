import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import FollowerEntity from "./Follower.Entity";
import { Repository } from "typeorm";
import UserEntity from "../User/User.entity";
import ResponseDto from "src/Utils/Response.Dto";

@Injectable()
export default class FollowerService {

    constructor (
        @InjectRepository(FollowerEntity) private readonly followerRepository: Repository<FollowerEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}

    public async createFollower(followedId: number, followingId: number) {

        if(followedId === followingId) {

            throw new BadRequestException(new ResponseDto("Você não pode seguir a si mesmo.", false, {}));

        }

        const followedUser = await this.userRepository.findOne({where: {id: followedId}});
        
        if(!followedUser) {

            throw new NotFoundException(new ResponseDto("Usuário não encontrado", false, {}));

        }

        const followingUser = await this.userRepository.findOne({where: {id: followingId}});

        if(!followingUser) {

            throw new NotFoundException(new ResponseDto("Usuário não encontrado", false, {}));

        }

        const findFollow = await this.followerRepository.findOne({where: {followed: followedUser, following: followingUser}});

        if(findFollow) {

            await this.followerRepository.remove(findFollow);

            return new ResponseDto(`${followingUser.name} deixou de seguir ${followedUser.name}`, true, {});

        }

        const follow = this.followerRepository.create({followed: followedUser, following: followingUser});

        await this.followerRepository.save(follow);

        return new ResponseDto(`${followingUser.name + "-" + followingUser.address} agora está seguindo ${followedUser.name + "-" + followedUser.address}`, true, {});

    }

    public async getPostsByFollows(userId: number) {

        const user = await this.userRepository.findOne({where: {id: userId}});
        
        if(!user) {

            throw new NotFoundException(new ResponseDto("Usuário não encontrado", false, {}));

        }

        const posts = await this.followerRepository.find({
            where: {following: user},
            relations: {followed: {posts: {likes: {user: true}}}},
            order: {id: "DESC"},
            take: 10,
            select: {
                followed: {
                    id: true, name: true, photo: true, address: true, posts: {
                        id: true,
                        text: true,
                        bgColor: true,
                        textColor: true,
                        likes: {id: true, user: {photo: true, name: true, address: true, id: true}}
                    }
                }
            }
        });

        return new ResponseDto('Buble posts', true, {posts});

    }

};