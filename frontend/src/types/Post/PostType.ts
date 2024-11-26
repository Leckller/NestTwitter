export interface UserType {
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
  user: UserType;
  likes: number;
  comments: number;
  isLiked: boolean;
}
