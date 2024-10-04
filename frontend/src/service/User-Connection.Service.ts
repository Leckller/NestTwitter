import { ResponseType, UserType, UserTypeToken } from '../types';
import GetUserByAddressDto from './Get-User-By-Address.Dto';
import PostUserCreateDto from './Post-User-Create.Dto';

const baseUrl = 'http://localhost:3000/user';

type FetchConfig = {
  url:string, body?: any, method: 'POST' | 'GET',
  headers?: object
};

export class UserConnection {
  private async Request<T>({ body, method, url, headers = {} }: FetchConfig): Promise<T> {
    const request = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
    });

    const response = await request.json();

    return response;
  }

  async createUser(newUser: PostUserCreateDto)
    : Promise<ResponseType<{ token: string, user: UserTypeToken }>> {
    const { address, email, name, password } = newUser;

    const request = await this.Request<ResponseType<{ token: string, user: UserTypeToken }> >({
      body: JSON.stringify({
        banner: '',
        photo: '',
        address,
        email,
        name,
        password,
      } as Partial<UserType>),
      method: 'POST',
      url: baseUrl,
    });

    return request;
  }

  async getUserByAddress(address: string, token: string)
    : Promise<ResponseType<GetUserByAddressDto>> {
    const request = await this.Request<ResponseType<GetUserByAddressDto>>({
      url: `${baseUrl}/${address}`,
      method: 'GET',
      headers: { authorization: token },
    });

    return request;
  }

  async loginUser(email: string, password: string)
    : Promise<ResponseType<{ token: string, user: UserTypeToken }>> {
    const request = await this.Request<ResponseType<{ token: string, user: UserTypeToken }>>(
      {
        url: `${baseUrl}/login`,
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
    );
    return request;
  }
}

export default new UserConnection();
