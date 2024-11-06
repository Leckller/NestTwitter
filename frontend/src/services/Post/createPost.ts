import { CreatePostRequest } from '../../types/Post/CreatePost.Request';
import { CreatePostResponse } from '../../types/Post/CreatePost.Response';
import { Request } from '../../types/Request';
import { bird } from '../../utils/bird';
import { baseUrl } from '../baseUrl';

// Função para fazer envio de um novo post para o banco de dados
export const createPost = async ({ text, authorization }: CreatePostRequest) => {
  const request = await bird<Request<CreatePostResponse>>(
    {
      url: `${baseUrl}/post`,
      headers: { authorization },
      body: { text },
      method: 'POST',
    },
  );

  console.log(request);
  return request;
};
