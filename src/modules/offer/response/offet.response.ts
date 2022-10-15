import {Expose} from 'class-transformer';

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
    facilities!: string[];

  @Expose()
    user!: object;

  @Expose()
    comments!: number;

  @Expose()
    coords!: object;
}
