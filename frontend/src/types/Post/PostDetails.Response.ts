interface User {
  id: number;
  address: string;
  name: string;
  photo: string;
}

interface CommentPost {
  id: number;
  text: string;
}

interface Comment {
  id: number;
  post: CommentPost;
  user: User;
}

export interface PostDetailsResponse {
  id: number;
  text: string;
  comments: Comment[];
  user: User;
  countLikes: number;
}
