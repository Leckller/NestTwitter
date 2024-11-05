import { CreatePostRequest } from '../../types/Post/CreatePost.Request';
import { CreatePostResponse } from '../../types/Post/CreatePost.Response';
import { Request } from '../../types/Request';
import { bird } from '../../utils/bird';
import { baseUrl } from '../baseUrl';

export const createPost = async ({ text, authorization }: CreatePostRequest) => {
  const request = await bird<Request<CreatePostResponse>>(
    `${baseUrl}/post`,
    'POST',
    { text },
    { authorization },
  );

  console.log(request);
  return request;
};
