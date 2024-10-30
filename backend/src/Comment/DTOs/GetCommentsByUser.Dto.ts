import { IsNumber } from "class-validator";

export default class GetCommentsByUserDto {

  @IsNumber()
  userId: number;

}