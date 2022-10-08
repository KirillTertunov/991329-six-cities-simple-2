// import mongoose from 'mongoose';
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
    // minlength: 10,
    // maxlength: 100,
  })
  public title!: string;

  @prop({
    require: true,
    trim: true,
    // minlength: 20,
    // maxlength: 1024,
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
    // validate: {
    //   validator(v) {
    //     return v.length === 6;
    //   },
    // },
  })
  public photos!: string[];

  @prop({
    require: true,
    default: false,
  })
  public isPremium!: boolean;

  @prop({
    require: true,
    // min: 1,
    // max: 5,
  })
  public rating!: number;

  @prop({
    require: true,
    enum: AccomodationType,
  })
  public accomadationType!: AccomodationType;

  @prop({
    require: true,
    // min: 1,
    // max: 8,
  })
  public rooms!: number;

  @prop({
    require: true,
    // min: 1,
    // max: 10,
  })
  public guests!: number;

  @prop({
    require: true,
    // min: 100,
    // max: 100000,
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
