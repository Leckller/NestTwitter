import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CommentEntity from "./Comment.Entity";
import { Repository } from "typeorm";
import CreateCommentRequestDto from "./DTOs/CreateComment.Request.Dto";
import ResponseDto from "src/Utils/Response.Dto";

@Injectable()
export default class CommentService {

    constructor(
        @InjectRepository(CommentEntity) private readonly CommentRepository: Repository<CommentEntity>
    ) { }

    public async createComment({ postId, text }: CreateCommentRequestDto, userId: number) {

        const postExists = await this.CommentRepository.findOne({ where: { id: postId } })

        if (!postExists) {

            throw new NotFoundException(new ResponseDto('Post não encontrado', false, {}));

        }

    }

}