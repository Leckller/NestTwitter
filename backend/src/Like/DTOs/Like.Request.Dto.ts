import { IsNumber } from "class-validator";

export default class LikeRequestDto {

    @IsNumber()
    userId: number;

    @IsNumber()
    postId: number;
    
}