export interface Request<T> {
  message: string;
  ok: boolean;
  result: T;
  response?: Request<any>;
}
