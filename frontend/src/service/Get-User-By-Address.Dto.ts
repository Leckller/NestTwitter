import { PostType } from '../types';

export default class GetUserByAddressDto {
  // eslint-disable-next-line max-params
  constructor(
    public banner: string,
    public name: string,
    public photo: string,
    public address: string,
    public bgColor: string,
    public textColor: string,
    public posts: PostType[],
  ) {}
}
