import { PostType } from '../types';
import ResponseType from '../types/Response.Type';

const baseUrl = 'http://localhost:3000/follow';

type FetchConfig = {
  url:string, body?: any, method: 'POST' | 'GET',
  headers?: object
};

export class FollowConnection {
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

  async followUser(userId: number, token: string)
    : Promise<ResponseType<{ posts: PostType[] }>> {
    const request = await this.Request<ResponseType<{ posts: PostType[] }>>({
      method: 'POST',
      url: baseUrl,
      body: JSON.stringify({ followedId: userId }),
      headers: { authorization: token },
    });

    return request;
  }

  async getFollowersPosts(token:string): Promise<ResponseType<{ posts: PostType[] }>> {
    const request = await this.Request<ResponseType<{ posts: PostType[] }>>({
      method: 'GET',
      url: `${baseUrl}/circle`,
      headers: { authorization: token },
    });

    return request;
  }
}

export default new FollowConnection();
