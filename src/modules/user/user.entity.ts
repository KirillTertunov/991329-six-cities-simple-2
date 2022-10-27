import typegoose, {
  getModelForClass,
  defaultClasses,
} from '@typegoose/typegoose';
import { User } from '../../types/user.type.js';
import { UserType } from '../../types/user-type.enum.js';
import { createSHA256 } from '../../utils/common.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.email = data.email;
    this.avatarPath = data.avatarPath;
    this.firstname = data.firstname;
    this.type = data.type;
    this.password = data.password;
  }

  @prop({
    require: true,
    unique: true,
  })
  public firstname!: string;

  @prop({
    require: true,
    unique: true,
  })
  public email!: string;

  @prop({ require: true })
  public avatarPath!: string;

  @prop({
    require: true,
  })
  public password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }

  public getPassword() {
    return this.password;
  }

  @prop({
    require: true,
    default: 'Normal',
    type: () => String,
    enum: UserType,
  })
  public type!: UserType;
}

export const UserModel = getModelForClass(UserEntity);
