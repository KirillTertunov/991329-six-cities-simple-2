import {
  // IsDateString,
  IsEnum,
  IsInt,
  // IsMongoId,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsObject,
  IsArray,
  IsNotEmptyObject,
  IsBoolean,
} from 'class-validator';

import { CityType } from '../../../types/city-type.enum.js';
import { AccomodationType } from '../../../types/accommodation-type.enum.js';
import { Coordinates } from '../../../types/coordinate.type.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title?: string;

  @IsOptional()
  @MinLength(10, { message: 'Minimum title length must be 20' })
  @MaxLength(100, { message: 'Maximum title length must be 1024' })
  public description?: string;

  // @IsOptional()
  // public postDate?: Date;

  @IsOptional()
  @IsEnum(CityType, { message: 'incorrect city' })
  public city?: CityType;

  @IsOptional()
  @IsString({ message: 'image is required' })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: 'Field photos must be an array' })
  public photos?: string[];

  @IsOptional()
  @IsBoolean()
  public isPremium?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  public rating?: number;

  @IsOptional()
  @IsEnum(AccomodationType, { message: 'incorrect type' })
  public accomadationType?: AccomodationType;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(8)
  public rooms?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  public guests?: number;

  @IsOptional()
  @IsInt()
  @Min(100)
  @Max(100000)
  public price?: number;

  @IsOptional()
  @IsArray({ message: 'Field facilities must be an array' })
  public facilities?: string[];

  // @IsOptional()
  // public userId?: string;

  // @IsOptional()
  // public comments?: number;

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  public coords?: Coordinates | object;
}
