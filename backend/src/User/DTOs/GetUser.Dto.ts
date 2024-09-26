import PostEntity from "src/Post/Post.entity";
import { UserType } from "src/types";

export default class GetUserDto implements Partial<UserType> {

    banner: string;
    name: string;
    photo: string;
    address: string;
    posts: PostEntity[]

}