// meu fetch customizado

export const bird = async <T>(
  url: string,
  method: 'POST' | 'PATCH' | 'GET' | 'DELETE ' = 'GET',
  body: any,
  headers: object = {},
): Promise<T> => {
  const request = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    method,
    body: JSON.stringify(body),
  });

  const response = await request.json() as T;

  return response;
};
