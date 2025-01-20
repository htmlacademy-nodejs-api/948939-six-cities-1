import { UserType } from './../../../types/user.js';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsEnum
} from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';

export class CreateUserDto {
  @IsString()
  @MinLength(1, { message: CreateUserMessages.name.minLength })
  @MaxLength(15, { message: CreateUserMessages.name.maxLength })
  public name!: string;

  @IsEmail({},{ message: CreateUserMessages.email.invalidFormat })
  public email!: string;

  @IsString()
  public avatar?: string;

  @IsString()
  @MinLength(6, { message: CreateUserMessages.password.minLength })
  @MaxLength(12, { message: CreateUserMessages.password.maxLength })
  public password!: string;

  @IsString()
  @IsEnum(UserType, { message: CreateUserMessages.type.invalid })
  public type!: UserType;
}
