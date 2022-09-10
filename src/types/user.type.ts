import { UserType } from './user-type.enum';

export type User = {
  firstname: string,
  email: string,
  avatarPath: string,
  password: string,
  type: UserType,
}
