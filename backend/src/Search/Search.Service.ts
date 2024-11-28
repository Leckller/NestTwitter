import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import LikeEntity from "src/Like/Like.entity";
import PostEntity from "src/Post/Post.entity";
import UserEntity from "src/User/User.entity";
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
    ) { }

    public async search(tokenId: number, text: string, page = 0) {

        const findUserByName = await this.UserRepository
            .createQueryBuilder('user')
            .where(`user.name LIKE '%${text}%'`)
            .select([
                'user.id',
                'user.address',
                'user.photo',
                'user.name'
            ])
            .skip(page * 3)
            .take(3)
            .getMany();

        const findUserByAddress = await this.UserRepository
            .createQueryBuilder('user')
            .where(`user.address LIKE '%${text}%'`)
            .select([
                'user.id',
                'user.address',
                'user.photo',
                'user.name'
            ])
            .skip(page * 3)
            .take(3)
            .getMany();

        const findPosts = await this.PostRepository
            .createQueryBuilder('post')
            .loadRelationCountAndMap('post.comments', 'post.comments')
            .loadRelationCountAndMap('post.likes', 'post.likes')
            .where(`post.text LIKE '%${text}%'`)
            .orderBy('post.created_at', 'DESC')
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

        return new ResponseDto('Resultados da pesquisa', true, { users: [...findUserByAddress, ...findUserByName], posts: postsWithLikes });

    }

}