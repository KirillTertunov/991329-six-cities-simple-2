import {IsInt, Min, Max, IsMongoId, IsString, Length} from 'class-validator';
export default class CreateCommentDto {

  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @IsInt()
  @Min(1)
  @Max(8)
  public rating!: number;

  @IsMongoId({message: 'offer field must be a valid id'})
  public offerId!: string;

  @IsMongoId({message: 'userId field must be a valid id'})
  public userId!: string;
}
