import { IsNumber, IsString } from "class-validator";

export default class CreateCommentRequestDto {

    @IsNumber()
    postId: number;

    @IsString()
    text: string;

}