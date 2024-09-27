import { IsNumber } from "class-validator";

export default class LikeRequestDto {

    @IsNumber()
    postId: number;
    
}