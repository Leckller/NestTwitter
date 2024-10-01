import { ResponseType, UserType } from '../types';
import GetUserByAddressDto from './Get-User-By-Address.Dto';

const baseUrl = 'http://localhost:3000';

type FetchConfig = {
  url:string, body?: any, method: 'POST' | 'GET',
  headers?: object
};

export default class UserConnection {
  private async Request<T>({ body, method, url, headers = {} }: FetchConfig): Promise<T> {
    const request = await fetch(url, {
      method,
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
    });

    const response = await request.json();

    return response;
  }

  async createUser(): Promise<{ token: string } | ResponseType> {
    const request = await this.Request<{ token: string } | ResponseType >({
      body: JSON.stringify({
        address: '',
        banner: '',
        email: '',
        name: '',
        password: '',
        photo: '',
      } as Partial<UserType>),
      method: 'POST',
      url: baseUrl,
    });

    return request;
  }

  async getUserByAddress(address: string, token: string): Promise<GetUserByAddressDto> {
    const request = await this.Request<GetUserByAddressDto>({
      url: `${baseUrl}/${address}`,
      method: 'GET',
      headers: { authorization: token },
    });

    return request;
  }

  async loginUser(email: string, password: string): Promise<{ token: string }> {
    const request = await this.Request<{ token: string }>({ url: baseUrl,
      method: 'POST',
      body: { email, password } });
    return request;
  }
}
