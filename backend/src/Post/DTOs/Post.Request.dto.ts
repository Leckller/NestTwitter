import { IsString } from "class-validator";

export default class PostRequestDto {
    @IsString()
    text: string;

    @IsString()
    textColor: string;

    @IsString()
    bgColor: string;

}