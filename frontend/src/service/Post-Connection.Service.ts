import { PostType } from '../types';
import ResponseType from '../types/Response.Type';

const baseUrl = 'http://localhost:3000/post';

type FetchConfig = {
  url:string, body?: any, method: 'POST' | 'GET',
  headers?: object
};

export class PostConnection {
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

  public async postCreate(post: {text: string, bgColor: string, textColor: string}, token: string): Promise<ResponseType<any>> {
    const request = await this.Request<ResponseType<any>>({
      method: 'POST',
      url: baseUrl,
      headers: { authorization: token },
      body: JSON.stringify(post),
    });

    return request;
  }

  public async globalPosts(token: string): Promise<ResponseType<{ posts: PostType[] }>> {
    const request = await this.Request<ResponseType<{ posts: PostType[] }>>({
      method: 'GET',
      url: `${baseUrl}/global`,
      headers: { authorization: token },
    });

    return request;
  }
}

export default new PostConnection();
