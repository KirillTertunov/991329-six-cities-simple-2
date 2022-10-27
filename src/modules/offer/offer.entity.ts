import typegoose, {
  getModelForClass,
  defaultClasses,
  Ref,
} from '@typegoose/typegoose';
import { AccomodationType } from '../../types/accommodation-type.enum.js';
import { CityType } from '../../types/city-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { Coordinates } from '../../types/coordinate.type.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    require: true,
    trim: true,
  })
  public title!: string;

  @prop({
    require: true,
    trim: true,
  })
  public description!: string;

  @prop({ require: true })
  public postDate!: Date;

  @prop({
    require: true,
    type: () => String,
    enum: CityType,
  })
  public city!: CityType;

  @prop({ require: true })
  public previewImage!: string;

  @prop({
    require: true,
    type: () => [String],
  })
  public photos!: string[];

  @prop({
    require: true,
    default: false,
  })
  public isPremium!: boolean;

  @prop({
    require: true,
  })
  public rating!: number;

  @prop({
    require: true,
    enum: AccomodationType,
  })
  public accomadationType!: AccomodationType;

  @prop({
    require: true,
  })
  public rooms!: number;

  @prop({
    require: true,
  })
  public guests!: number;

  @prop({
    require: true,
  })
  public price!: number;

  @prop({
    require: true,
  })
  public facilities!: string[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public comments!: number;

  @prop({ required: true })
  public coords!: Coordinates | object;
}

export const OfferModel = getModelForClass(OfferEntity);
