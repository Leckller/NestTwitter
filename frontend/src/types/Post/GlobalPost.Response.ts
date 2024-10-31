export interface User {
  id: number;
  address: string;
  photo: string;
  name: string;
}

export interface GlobalPostResponse {
  id: number;
  isComment: boolean;
  text: string;
  user: User;
  likes: number;
  comments: number;
}
