export interface User {
  id: number;
  address: string;
  name: string;
  photo: string;
  textColor: string;
  bgColor: string;
}

export interface GlobalPostResponse {
  id: number;
  isComment: boolean;
  text: string;
  textColor: string;
  bgColor: string;
  user: User;
  likes: number;
  comments: number;
}
