import { PostDetailsRequest } from '../../types/Post/PostDetails.Request';
import { PostDetailsResponse } from '../../types/Post/PostDetails.Response';
import { Request } from '../../types/Request';
import { bird } from '../../utils/bird';
import { baseUrl } from '../baseUrl';

// Função para fazer a requisição dos detalhes de um post
// Vai receber o post em si, e comentários com paginação
// Quando olhar isso dnv é importante criar uma nova rota para a api para pegar apenas comentários com paginação ->
// ou vai ficar sendo enviado dados repetidos (o post que está sendo detalhado e quantidade de curtidas)
export const postDetails = async ({ id, page, authorization }: PostDetailsRequest) => {
  const request = await bird<Request<PostDetailsResponse>>(
    `${baseUrl}/details/${id}/${page}`,
    'GET',
    {},
    { authorization },
  );

  console.log(request);
  return request;
};
