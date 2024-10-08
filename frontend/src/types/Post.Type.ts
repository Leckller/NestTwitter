type User = {
  id: number;
  address: string;
  name: string;
  photo: string;
};

export type LikeType = {
  id: number;
  user: User;
};

type PostType = {
  id: number;
  text: string;
  bgColor: string;
  textColor: string;
  user: User;
  likes: LikeType[];
};

export default PostType;
