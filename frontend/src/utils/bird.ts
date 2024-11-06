// meu fetch customizado

export const bird = async <T>(
  { body, headers = {}, method = 'GET', url }: { url: string,
    method?: 'POST' | 'PATCH' | 'GET' | 'DELETE ',
    body?: object,
    headers?: object, },
): Promise<T> => {
  const request = body ? await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    method,
    body: JSON.stringify(body),
  }) : await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    method,
  });

  const response = await request.json() as T;

  return response;
};
