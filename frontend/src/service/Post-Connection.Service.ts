import { PostType } from '../types';

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

  public async postCreate(text: string, token: string): Promise<{ ok: boolean }> {
    const request = await this.Request({
      method: 'POST',
      url: baseUrl,
      headers: { authorization: token },
      body: JSON.stringify({ text }),
    });

    return request as any;
  }

  public async globalPosts(token: string): Promise<{ posts: PostType }> {
    const request = await this.Request({
      method: 'GET',
      url: `${baseUrl}/global`,
      headers: { authorization: token },
    });

    return request as any;
  }
}

export default new PostConnection();
