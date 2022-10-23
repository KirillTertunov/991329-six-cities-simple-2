import {
  IsArray,
  // IsDateString,
  IsEnum,
  IsInt,
  // IsMongoId,
  IsObject,
  IsNotEmptyObject,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsBoolean,
  IsString,
} from 'class-validator';

import { CityType } from '../../../types/city-type.enum.js';
import { AccomodationType } from '../../../types/accommodation-type.enum.js';
import { Coordinates } from '../../../types/coordinate.type.js';

export default class CreateOfferDto {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(10, {message: 'Minimum title length must be 20'})
  @MaxLength(100, {message: 'Maximum title length must be 1024'})
  public description!: string;

  // public postDate!: Date;

  @IsEnum(CityType, {message: 'incorrect city'})
  public city!: CityType;


  @IsString({message: 'image is required'})
  public previewImage!: string;

  @IsArray({message: 'Field photos must be an array'})
  public photos!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @IsInt()
  @Min(1)
  @Max(5)
  public rating!: number;

  @IsEnum(AccomodationType, {message: 'incorrect type'})
  public accomadationType!: AccomodationType;

  @IsInt()
  @Min(1)
  @Max(8)
  public rooms!: number;

  @IsInt()
  @Min(1)
  @Max(10)
  public guests!: number;

  @IsInt()
  @Min(100)
  @Max(100000)
  public price!: number;

  @IsArray({message: 'Field facilities must be an array'})
  public facilities!: string[];

  public userId!: string;
  // public comments!: number;
  @IsObject()
  @IsNotEmptyObject()
  public coords!: Coordinates | object;
}
