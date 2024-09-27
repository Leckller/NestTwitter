import { IsString } from "class-validator";

export default class GetUserRequestDto {

    @IsString()
    address: string;

}