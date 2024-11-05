import { GlobalPostRequest } from '../../types/Post/GlobalPost.Request';
import { GlobalPostResponse } from '../../types/Post/GlobalPost.Response';
import { Request } from '../../types/Request';
import { bird } from '../../utils/bird';
import { baseUrl } from '../baseUrl';

export const globalPosts = async ({ page = 0, authorization }: GlobalPostRequest) => {
  const request = await bird<Request<GlobalPostResponse[]>>(
    `${baseUrl}/global/${page}`,
    'GET',
    {},
    { authorization },
  );

  console.log(request);
  return request;
};
