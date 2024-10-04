import ResponseType from '../types/Response.Type';

const baseUrl = 'http://localhost:3000/like';

type FetchConfig = {
  url:string, body?: any, method: 'POST' | 'GET',
  headers?: object
};

export class LikeConnection {
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

  async likePost(postId: number, token: string): Promise<ResponseType<any>> {
    const request = await this.Request<ResponseType<any>>({
      method: 'POST',
      url: baseUrl,
      body: JSON.stringify({ postId }),
      headers: { authorization: token },
    });

    return request;
  }
}

export default new LikeConnection();
