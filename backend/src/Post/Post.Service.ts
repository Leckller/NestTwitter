import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PostEntity from "./Post.entity";
import { Repository } from "typeorm";
import UserEntity from "../User/User.entity";
import ResponseDto from "src/Utils/Response.Dto";
import PostRequestDto from "./DTOs/Post.Request.dto";
import CommentEntity from "src/Comment/Comment.Entity";

@Injectable()
export default class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepo: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
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

        // Pega as info do post e conta quantos likes e comentários tem
        const posts = await this.postRepo
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.user", "user")
            .leftJoinAndSelect("post.likes", "like")
            .loadRelationCountAndMap("post.likes", "post.likes")
            .loadRelationCountAndMap("post.comments", "post.comments")
            .andWhere('post.isComment = false')
            .select([
                "post",
                "user.id",
                "user.address",
                "user.photo",
                "user.name",
            ])
            .take(10)
            .orderBy('', 'ASC')
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

    public async postDetails(postId: number) {

        // Pega o post e conta os likes e comentários
        const post = await this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .loadRelationCountAndMap('post.likes', 'post.likes')
            .loadRelationCountAndMap('post.comments', 'post.comments')
            .select([
                'post',
                'user.id',
                'user.photo',
                'user.name',
                'user.address',
            ])
            .where(`post.id = ${postId}`)
            .getOne()

        // Pega as info do comentário e conta quantos comentarios e likes tem
        const postComments = await this.commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.comment', 'fields')
            .leftJoinAndSelect('comment.user', 'user')
            .loadRelationCountAndMap('fields.likes', 'fields.likes')
            .loadRelationCountAndMap('fields.comments', 'fields.comments')
            .where(`comment.post.id = ${postId}`)
            .select([
                'comment',
                'fields',
                'user.id',
                'user.photo',
                'user.name',
                'user.address',
            ])
            .take(5)
            .getMany();


        if (!post) {

            throw new NotFoundException(new ResponseDto("Post não encontrado", false, {}));

        };

        return new ResponseDto('Post details', true, { ...post, postComments });

    }

    // Pega os comentários de um post usando paginação
    public async getPostComments(postId: number, page: number) {

        // Pega as info do comentário e conta quantos comentarios e likes tem
        const postComments = await this.commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.comment', 'fields')
            .leftJoinAndSelect('comment.user', 'user')
            .loadRelationCountAndMap('fields.likes', 'fields.likes')
            .loadRelationCountAndMap('fields.comments', 'fields.comments')
            .where(`comment.post.id = ${postId}`)
            .select([
                'comment',
                'fields',
                'user.id',
                'user.photo',
                'user.name',
                'user.address',
            ])
            .skip(page * 10)
            .take(10)
            .getMany();

        return new ResponseDto('Post Comments', true, { postComments });

    }

}