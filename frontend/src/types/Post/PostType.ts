export interface User {
  id: number;
  address: string;
  photo: string;
  name: string;
}

export interface PostType {
  id: number;
  isComment: boolean;
  text: string;
  created_at: Date;
  user: User;
  likes: number;
  comments: number;
}
