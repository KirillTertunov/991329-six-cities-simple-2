import { UserType } from './user-type.enum';

export type User = {
  firstname: string,
  email: string,
  avatarPath: string,
  type: UserType,
  password: string,
}
