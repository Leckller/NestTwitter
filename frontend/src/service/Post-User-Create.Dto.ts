export default class PostUserCreateDto {
  constructor(
    public name: string,
    public address: string,
    public password: string,
    public email: string,
  ) {}
}
