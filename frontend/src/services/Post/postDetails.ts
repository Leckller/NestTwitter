import { PostDetailsRequest } from '../../types/Post/PostDetails.Request';
import { PostDetailsResponse } from '../../types/Post/PostDetails.Response';
import { bird } from '../../utils/bird';
import { baseUrl } from '../baseUrl';

export const postDetails = async ({ id, page, authorization }: PostDetailsRequest) => {
  const request = await bird<PostDetailsResponse>(
    `${baseUrl}/details/${id}/${page}`,
    'GET',
    {},
    { authorization },
  );

  console.log(request);
  return request;
};
