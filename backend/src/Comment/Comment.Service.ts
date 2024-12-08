import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CommentEntity from "./Comment.Entity";
import { Repository } from "typeorm";
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
            .leftJoin("comment.user", "user")
            .loadRelationCountAndMap('fields.likes', 'fields.likes')
            .loadRelationCountAndMap('fields.comments', 'fields.comments')
            .where(`user.id = ${userId}`)
            .skip(page * 10)
            .take(10)
            .getMany()

        const userComments = await this.commentRepo
            .find({
                where: { user },
                skip: page * 10,
                take: 10,
                relations: { comment: { user: true }, post: { user: true } },
                select: {
                    post: { id: true, user: { address: true } },
                    comment: { id: true, user: { photo: true, address: true, name: true }, text: true },
                }
            });

        return new ResponseDto("Comentários do usuário!", true, { teste });

    }

}