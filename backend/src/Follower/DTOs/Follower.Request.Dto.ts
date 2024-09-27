import { IsNumber } from "class-validator";

export default class FollowerRequestDto {
    
    // Quem é seguido
    @IsNumber()
    followedId: number;

}