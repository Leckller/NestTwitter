import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PostEntity from "./Post.entity";
import { Repository } from "typeorm";
import UserEntity from "../User/User.entity";
import ResponseDto from "src/Utils/Response.Dto";
import PostRequestDto from "./DTOs/Post.Request.dto";
import LikeEntity from "src/Like/Like.entity";
import CommentEntity from "src/Comment/Comment.Entity";

@Injectable()
export default class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepo: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(LikeEntity)
        private readonly likeRepo: Repository<LikeEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRepo: Repository<CommentEntity>,
    ) { }

    private async findUser(userId: number) {

        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user) {

            throw new NotFoundException(new ResponseDto("Usuário inválido! Faça o login novamente.", false, {}))

        }

        return user;

    }

    public async createPost({ text }: PostRequestDto, userId: number) {

        const user = await this.findUser(userId);

        const post = this.postRepo.create({ user, text });

        await this.postRepo.save(post);

        const responsePost = {
            ...post,
            user: {
                id: post.user.id,
                address: post.user.address,
                photo: post.user.photo,
                name: post.user.name,
            },
            // likes: 0 as any usar isso aqui mais tarde
        } as PostEntity

        return new ResponseDto("Post criado!", true, { ...responsePost });

    }

    public async getGlobalPosts(page = 0) {

        const posts = await this.postRepo
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.user", "user")
            .leftJoinAndSelect("post.likes", "like")
            // Conta quantos likes tem
            .loadRelationCountAndMap("post.likes", "post.likes")
            // Conta quantos comentarios tem
            .loadRelationCountAndMap("post.comments", "post.comments")
            // Pega apenas postagens q n sejam um comentário
            .andWhere('post.isComment = false')
            .select([
                "post",
                "user.id",
                "user.address",
                "user.photo",
                "user.name",
            ])
            .take(10)
            .skip(page * 10)
            .getMany();

        return new ResponseDto("Global posts", true, posts);

    }

    public async deletePost(userId: number, postId: number) {

        try {
            const post = await this.postRepo.findOne({ where: { id: postId }, relations: { user: true } });

            if (!post) {

                throw new NotFoundException(new ResponseDto("Post não encontrado", false, {}));

            }

            if (post.user.id !== userId) {

                throw new BadRequestException(new ResponseDto("Você não tem permissão para fazer isso", false, {}));

            }


            await this.postRepo.delete(post);

            return new ResponseDto("Post deletado", true, {});

        } catch {

            throw new BadRequestException(new ResponseDto("Erro no servidor.", false, {}));

        }

    }

    public async postDetails(postId: number, page = 0) {

        const post = await this.postRepo.findOne({
            where: { id: postId },
            relations: {
                comments: { user: true, comment: true },
                user: true,
            },
            select: {
                id: true,
                text: true,
                user: { id: true, address: true, photo: true, name: true },
            }
        });

        const comments = await this.commentRepo.find({
            where: { post },
            relations: { user: true, comment: true },
            select: {
                id: true,
                // Tem q adicionar coisa aqui.
                comment: { id: true, text: true },
                user: { id: true, address: true, photo: true, name: true },
            },
            skip: page * 8,
            take: 8,
        })

        if (!post) {

            throw new NotFoundException(new ResponseDto("Post não encontrado", false, {}));

        }

        const countLikes = await this.likeRepo.count({ where: { post } });

        return new ResponseDto('Post details', true, { ...post, comments, countLikes });

    }

}