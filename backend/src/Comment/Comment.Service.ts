import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CommentEntity from "./Comment.Entity";
import { Repository } from "typeorm";
import CreateCommentRequestDto from "./DTOs/CreateComment.Request.Dto";
import ResponseDto from "src/Utils/Response.Dto";
import PostEntity from "src/Post/Post.entity";
import UserEntity from "src/User/User.entity";

@Injectable()
export default class CommentService {

    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepo: Repository<CommentEntity>,
        @InjectRepository(PostEntity)
        private readonly postRepo: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,

    ) { }

    public async createComment({ postId, text }: CreateCommentRequestDto, userId: number) {

        const post = await this.postRepo.findOne({ where: { id: postId } })

        if (!post) {

            throw new NotFoundException(new ResponseDto('Post não encontrado', false, {}));

        }

        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user) {

            throw new NotFoundException(new ResponseDto('User não encontrado', false, {}));

        }


        const newPost = this.postRepo.create({
            text, user
        })

        const comment = this.commentRepo.create({
            post, user, comment: newPost
        });

        return new ResponseDto("Comentário adicionado!", true, { comment });

    }

    public async getCommentsByUser(userId: number, page = 0) {

        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user) {

            throw new NotFoundException(new ResponseDto('User não encontrado', false, {}));

        }

        const userComments = await this.commentRepo
            .find({
                where: { user },
                skip: page * 10,
                take: 10,
                relations: { comment: { user: true, likes: true }, post: true },
                select: {
                    post: { id: true, user: { address: true } },
                    comment: { id: true, user: { photo: true, address: true, name: true } }
                }
            });

        return new ResponseDto("Comentários do usuário!", true, { userComments });

    }

}