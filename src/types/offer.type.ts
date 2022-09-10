import { CityType } from './city-type.enum';
import { AccomodationType } from './accommodation-type.enum';
import { User } from './user.type';
import { Coordinates } from './coordinate.type';

export type Offer = {
  title: string,
  description: string,
  postDate: Date,
  city: CityType,
  previewImage: string,
  photos: string[],
  isPremium: boolean,
  rating: number,
  accomadationType: AccomodationType,
  rooms: number,
  guests: number,
  price: number,
  facilities: string[],
  user: User,
  comments: number,
  coords: Coordinates|object,
}
