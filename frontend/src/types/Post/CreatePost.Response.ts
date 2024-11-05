interface User {
  id: number;
  address: string;
  photo: string;
  name: string;
}

export interface CreatePostResponse {
  id: number;
  text: string;
  user: User;
  isComment: boolean;
}
