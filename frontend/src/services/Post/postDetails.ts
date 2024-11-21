import { PostDetailsRequest } from '../../types/Post/PostDetails.Request';
import { PostDetailsResponse } from '../../types/Post/PostDetails.Response';
import { Request } from '../../types/Request';
import { bird } from '../../utils/bird';
import { baseUrl } from '../baseUrl';

// Função para fazer a requisição dos detalhes de um post
// Vai receber o post em si, e 5 comentários 
export const postDetails = async ({ id, authorization }: PostDetailsRequest) => {
  const request = await bird<Request<PostDetailsResponse>>(
    {
      url: `${baseUrl}/post/details/${id}`,
      headers: { authorization },
    },
  );

  console.log(request);
  return request;
};
