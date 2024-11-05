import { Request } from '../../types/Request';
import { RegisterRequest } from '../../types/User/Register.Request';
import { RegisterResponse } from '../../types/User/Register.Response';
import { bird } from '../../utils/bird';
import { baseUrl } from '../baseUrl';

// Função para envio de cadastro de novo usuário
export const register = async ({
  email, password, address, banner, name, photo,
}: RegisterRequest) => {
  const request = await bird<Request<RegisterResponse>>(`${baseUrl}`, 'POST', {
    email, password, address, banner, name, photo,
  });

  console.log(request);
  return request;
};
