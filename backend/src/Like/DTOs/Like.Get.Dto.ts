import { IsNumber } from "class-validator";

export default class LikeGetDto {

    @IsNumber()
    postId: number;
    
}