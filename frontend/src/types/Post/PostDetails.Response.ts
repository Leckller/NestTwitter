import { User } from "./GlobalPost.Response";

interface PostComment {
  id: number;
  comment: {
    id: number;
    isComment: boolean;
    text: string;
    likes: number;
    comments: number;
  };
  user: {
    id: number;
    address: string;
    name: string;
    photo: string;
  };
}

export interface PostDetailsResponse {
  id: number;
  isComment: boolean;
  text: string;
  comments: number;
  likes: number;
  user: User;
  postComments: PostComment[];
}