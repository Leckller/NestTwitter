import { bird } from '../utils/bird';
import { baseUrl } from './baseUrl';

export const login = async (email: string, password: string) => {
  const request = await bird(`${baseUrl}login`, 'POST', {
    email, password,
  });

  console.log(request);
  return request;
};
