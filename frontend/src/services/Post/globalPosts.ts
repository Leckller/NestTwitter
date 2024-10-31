import { GlobalPostRequest } from '../../types/Post/GlobalPost.Request';
import { GlobalPostResponse } from '../../types/Post/GlobalPost.Response';
import { bird } from '../../utils/bird';
import { baseUrl } from '../baseUrl';

export const globalPosts = async ({ page = 0 }: GlobalPostRequest) => {
  const request = await bird<GlobalPostResponse>(`${baseUrl}/global/${page}`, 'GET');

  console.log(request);
  return request;
};
