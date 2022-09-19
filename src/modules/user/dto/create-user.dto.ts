import { UserType } from '../../../types/user-type.enum.js';

export default class CreateUserDto {
  public email!: string ;
  public avatarPath!: string;
  public firstname!: string;
  public type!: UserType;
  public password!: string;
}
