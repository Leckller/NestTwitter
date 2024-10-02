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

  async followUser(userId: number) {
    const request = await this.Request({
      method: 'POST',
      url: baseUrl,
      body: JSON.stringify({ followedId: userId }),
    });

    return request;
  }

  async getFollowersPosts() {
    const request = await this.Request({
      method: 'GET',
      url: `${baseUrl}/circle`,
    });

    return request;
  }
}

export default new FollowConnection();
