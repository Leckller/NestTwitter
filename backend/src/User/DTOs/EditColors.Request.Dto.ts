import { IsString } from "class-validator";

export default class editColorsRequestDto {

    @IsString()
    bgColor: string;
    @IsString()
    textColor: string;

}