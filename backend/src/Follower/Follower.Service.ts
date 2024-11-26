import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import FollowerEntity from "./Follower.Entity";
import { In, Repository } from "typeorm";
import UserEntity from "../User/User.entity";
import ResponseDto from "src/Utils/Response.Dto";
import LikeEntity from "src/Like/Like.entity";
import PostEntity from "src/Post/Post.entity";

@Injectable()
export default class FollowerService {

    constructor(
        @InjectRepository(FollowerEntity)
        private readonly followerRepo: Repository<FollowerEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(PostEntity)
        private readonly postRepo: Repository<PostEntity>,
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

        const posts = await this.postRepo
            .createQueryBuilder("post")
            // Faz o join para encontrar os seguidores 
            .innerJoin(FollowerEntity, "follower", "follower.followingId = :userId", { userId })
            // Faz o join com os usuários seguidos
            .innerJoin(UserEntity, "followedUser", "followedUser.id = follower.followedId")
            // Carrega a relação e conta os likes
            .loadRelationCountAndMap('post.likes', 'post.likes', 'likes')
            // Carrega a relação e conta os comentários
            .loadRelationCountAndMap('post.comments', 'post.comments', 'comments')
            // Faz o join para obter informações do autor do post
            .innerJoinAndSelect("post.user", "author")
            .where("post.userId = followedUser.id")
            .where("post.isComment = false")
            .orderBy('post.created_at', 'DESC')
            .select([
                'post',
                "author.id",
                "author.address",
                "author.photo",
                "author.name",
            ])
            .skip(page * 10)
            .take(10)
            .getMany();

        // Verifica quais dos posts foi curtido pelo usuário
        const userLiked = await this.likeRepo.find({
            where: {
                user: { id: userId },
                post: { id: In([...posts.map(p => p.id)]) },
            },
            relations: { post: true, user: true, },
            select: {
                post: { id: true },
                user: { id: true }
            }
        })

        const postsWithLikes = posts.map(p => {
            const isLiked = userLiked.some(pl => pl.post.id === p.id);
            return { ...p, isLiked }
        })

        return new ResponseDto('Buble posts', true, postsWithLikes);

    }

};