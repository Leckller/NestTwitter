import { IsNumber } from "class-validator";

export default class FollowerRequestDto {
    
    // Quem segue
    @IsNumber()
    followingId: number;

    // Quem é seguido
    @IsNumber()
    followedId: number;

}