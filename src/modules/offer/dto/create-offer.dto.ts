import { CityType } from '../../../types/city-type.enum.js';
import { AccomodationType } from '../../../types/accommodation-type.enum.js';
import { Coordinates } from '../../../types/coordinate.type.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: CityType;
  public previewImage!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public accomadationType!: AccomodationType;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public facilities!: string[];
  public userId!: string;
  public comments!: number;
  public coords!: Coordinates|object;
}
