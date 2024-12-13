import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CommentEntity from "./Comment.Entity";
import { In, Repository } from "typeorm";
import CreateCommentRequestDto from "./DTOs/CreateComment.Request.Dto";
import ResponseDto from "src/Utils/Response.Dto";
import PostEntity from "src/Post/Post.entity";
import UserEntity from "src/User/User.entity";
import LikeEntity from "src/Like/Like.entity";

@Injectable()
export default class CommentService {

    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepo: Repository<CommentEntity>,
        @InjectRepository(PostEntity)
        private readonly postRepo: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(LikeEntity)
        private readonly likeRepo: Repository<LikeEntity>,

    ) { }

    public async createComment({ postId, text }: CreateCommentRequestDto, userId: number) {

        try {

            const post = await this.postRepo.findOne({ where: { id: postId } })

            if (!post) {

                throw new NotFoundException(new ResponseDto('Post não encontrado', false, {}));

            }

            const user = await this.userRepo.findOne({
                where: { id: userId },
                select: {
                    id: true, address: true, name: true, photo: true
                }
            });

            if (!user) {

                throw new NotFoundException(new ResponseDto('User não encontrado', false, {}));

            }


            const newPost = this.postRepo.create({
                text, user, isComment: true
            })

            await this.postRepo.save(newPost);

            const comment = this.commentRepo.create({
                post, user, comment: newPost
            });

            await this.commentRepo.save(comment);

            return new ResponseDto("Comentário adicionado!", true, {
                id: comment.id,
                postId, comment: {
                    id: comment.id,
                    comment: {
                        id: newPost.id,
                        isComment: true,
                        text,
                        likes: 0,
                        comments: 0,
                    },
                    user: user
                }
            });

        } catch (err) {

            return new ResponseDto("Erro durante a criação do comentário!", false, { err });

        }
    }

    public async getCommentsByUser(userId: number, page = 0) {

        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user) {

            throw new NotFoundException(new ResponseDto('User não encontrado', false, {}));

        }

        const teste = await this.commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.post', 'post')
            .leftJoinAndSelect('comment.comment', 'fields')
            .leftJoinAndSelect("post.user", "author")
            .leftJoin("comment.user", "user")
            .loadRelationCountAndMap('post.likes', 'post.likes')
            .loadRelationCountAndMap('post.comments', 'post.comments')
            .loadRelationCountAndMap('fields.likes', 'fields.likes')
            .loadRelationCountAndMap('fields.comments', 'fields.comments')
            .select([
                "comment",
                "fields",
                "post",
                "author.id",
                "author.address",
                "author.photo",
                "author.name"
            ])
            .orderBy('fields.created_at', 'DESC')
            .where(`user.id = ${userId}`)
            .skip(page * 10)
            .take(10)
            .getMany()

        const userLiked = await this.likeRepo.find({
            where: {
                user: { id: userId },
                post: { id: In([...teste.map(p => p.comment.id), ...teste.map(p => p.post.id)]) },
            },
            relations: { post: true, user: true },
            select: {
                post: { id: true },
                user: { id: true }
            }
        });

        const postsWithLikes = teste.map(p => {
            const isLikedPost = userLiked.some(pl => pl.post.id === p.post.id);
            const isLikedComment = userLiked.some(pl => pl.post.id === p.comment.id);
            return {
                ...p,
                comment: { ...p.comment, isLiked: isLikedComment },
                post: { ...p.post, isLiked: isLikedPost }
            }
        });

        return new ResponseDto("Comentários do usuário!", true, [...postsWithLikes]);

    }

}