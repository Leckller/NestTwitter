import { PostType, UserType } from "./PostType";

export interface PostCommentType {
  id: number;
  comment: PostType
  user: UserType
}

export interface PostDetailsResponse extends PostType {
  postComments: PostCommentType[];
}