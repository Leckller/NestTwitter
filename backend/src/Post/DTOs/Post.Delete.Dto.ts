import { IsNumber } from "class-validator";

export default class PostDeleteDto {

    @IsNumber()
    postId: number;

}