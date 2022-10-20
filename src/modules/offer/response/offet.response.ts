import { Type, Expose } from 'class-transformer';

import UserResponse from '../../user/response/user.response.js';

export default class OfferResponse {
  @Expose()
    title!: string;

  @Expose()
    description!: string;

  @Expose()
    postDate!: string;

  @Expose()
    city!: string;

  @Expose()
    previewImage!: string;

  @Expose()
    photos!: string[];

  @Expose()
    isPremium!: boolean;

  @Expose()
    rating!: number;

  @Expose()
    accomadationType!: string;

  @Expose()
    rooms!: number;

  @Expose()
    guests!: number;

  @Expose()
    price!: number;

  @Expose()
  public commentCount!: number;

  @Expose()
    facilities!: string[];

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
    comments!: number;

  @Expose()
    coords!: object;
}
