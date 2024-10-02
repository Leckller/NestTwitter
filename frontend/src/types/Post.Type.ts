type User = {
  id: number;
  address: string;
  name: string;
  photo: string;
};

type Like = {
  id: number;
  user: User;
};

type PostType = {
  id: number;
  text: string;
  user: User;
  likes: Like[];
};

export default PostType;
