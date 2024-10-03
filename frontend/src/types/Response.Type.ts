export default interface ResponseType<T> {
  ok: boolean,
  message: string,
  result: T
}
