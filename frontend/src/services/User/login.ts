import { Request } from '../../types/Request';
import { LoginRequest } from '../../types/User/Login.Request';
import { LoginResponse } from '../../types/User/Login.Response';
import { bird } from '../../utils/bird';
import { baseUrl } from '../baseUrl';

export const login = async ({ email, password }: LoginRequest) => {
  const request = await bird<Request<LoginResponse>>(`${baseUrl}/login`, 'POST', {
    email, password,
  });

  console.log(request);
  return request;
};
