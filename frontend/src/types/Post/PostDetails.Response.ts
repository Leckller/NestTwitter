interface User {
  id: number;
  address: string;
  name: string;
  photo: string;
}

interface CommentPost {
  id: number;
  text: string;
  isComment: boolean,
}

interface Comment {
  id: number;
  comment: CommentPost;
  user: User;
}

export interface PostDetailsResponse {
  id: number;
  text: string;
  comments: Comment[];
  user: User;
  countLikes: number;
}
