import LoginUserDto from './dto/login-user.dto.js';
import CreateUserDto from './dto/create-user.dto.js';

import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';


export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findById(offerId: string): Promise<DocumentType<UserEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null>;
}
