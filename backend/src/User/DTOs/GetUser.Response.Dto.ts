import PostEntity from "src/Post/Post.entity";
import { UserType } from "src/types";

export default class GetUserResponseDto implements Partial<UserType> {

    constructor(
    public banner: string,
    public name: string,
    public photo: string,
    public address: string,
    public posts: PostEntity[],
    ) {}
    
}