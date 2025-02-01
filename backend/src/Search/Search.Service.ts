import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import FollowerEntity from "src/Follower/Follower.Entity";
import LikeEntity from "src/Like/Like.Entity";
import PostEntity from "src/Post/Post.Entity";
import UserEntity from "src/User/User.Entity";
import ResponseDto from "src/Utils/Response.Dto";
import { In, Like, Repository } from "typeorm";

@Injectable()
export class SearchService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly PostRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly UserRepository: Repository<UserEntity>,
        @InjectRepository(LikeEntity)
        private readonly likeRepo: Repository<LikeEntity>,
        @InjectRepository(FollowerEntity)
        private readonly followerRepo: Repository<FollowerEntity>,
    ) { }

    public async searchUsers(tokenId: number, text: string, page = 0) {
        const findUser = await this.UserRepository
            .createQueryBuilder('user')
            .where(`user.name LIKE '%${text}%' OR user.address LIKE '%${text}%'`)
            .select([
                'user.id',
                'user.address',
                'user.photo',
                'user.name'
            ])
            .skip(3 * page)
            .take(3)
            .getMany();

        const following = await this.followerRepo.find({
            relations: { followed: true, following: true },
            select: { followed: { id: true }, following: { id: true } },
            where: {
                followed: { id: In([...findUser.map(u => u.id)]) },
                following: { id: tokenId }
            }
        });

        // Adiciona o campo que diz se o usuário segue ou n
        const users = findUser.map(u => (
            { ...u, isFollowing: following.some(f => f.followed.id === u.id) }
        ));


        return new ResponseDto('Resultados da pesquisa', true, { users });
    }

    public async searchPosts(tokenId: number, text: string, page = 0) {

        const findPosts = await this.PostRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect("post.user", "user")
            .loadRelationCountAndMap('post.comments', 'post.comments')
            .loadRelationCountAndMap('post.likes', 'post.likes')
            .where(`post.text LIKE '%${text}%'`)
            .orderBy('post.created_at', 'DESC')
            .select([
                "post",
                "user.id",
                "user.address",
                "user.photo",
                "user.name",
            ])
            .skip(6 * page)
            .take(6)
            .getMany();

        const userLiked = await this.likeRepo.find({
            where: {
                user: { id: tokenId },
                post: { id: In([...findPosts.map(p => p.id)]) },
            },
            relations: { post: true, user: true, },
            select: {
                post: { id: true },
                user: { id: true }
            }
        });

        const postsWithLikes = findPosts.map(p => {
            const isLiked = userLiked.some(pl => pl.post.id === p.id);
            return { ...p, isLiked }
        });

        return new ResponseDto('Resultados da pesquisa', true, { posts: postsWithLikes });
    }

    public async search(tokenId: number, text: string) {

        const findUser = await this.UserRepository
            .createQueryBuilder('user')
            .where(`user.name LIKE '%${text}%' OR user.address LIKE '%${text}%'`)
            .select([
                'user.id',
                'user.address',
                'user.photo',
                'user.name'
            ])
            .take(3)
            .getMany();

        const following = await this.followerRepo.find({
            relations: { followed: true, following: true },
            select: { followed: { id: true }, following: { id: true } },
            where: {
                followed: { id: In([...findUser.map(u => u.id)]) },
                following: { id: tokenId }
            }
        });

        // Adiciona o campo que diz se o usuário segue ou n
        const users = findUser.map(u => (
            { ...u, isFollowing: following.some(f => f.followed.id === u.id) }
        ));

        const findPosts = await this.PostRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect("post.user", "user")
            .loadRelationCountAndMap('post.comments', 'post.comments')
            .loadRelationCountAndMap('post.likes', 'post.likes')
            .where(`post.text LIKE '%${text}%'`)
            .orderBy('post.created_at', 'DESC')
            .select([
                "post",
                "user.id",
                "user.address",
                "user.photo",
                "user.name",
            ])
            .take(6)
            .getMany();

        const userLiked = await this.likeRepo.find({
            where: {
                user: { id: tokenId },
                post: { id: In([...findPosts.map(p => p.id)]) },
            },
            relations: { post: true, user: true, },
            select: {
                post: { id: true },
                user: { id: true }
            }
        });

        const postsWithLikes = findPosts.map(p => {
            const isLiked = userLiked.some(pl => pl.post.id === p.id);
            return { ...p, isLiked }
        });

        return new ResponseDto('Resultados da pesquisa', true, { users, posts: postsWithLikes });

    }

}