import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { UserMessages } from './user.messages.js';

export class LoginUserDto {
  @IsEmail({},{ message: UserMessages.email.invalidFormat })
  public email!: string;

  @IsString()
  @MinLength(6, { message: UserMessages.password.minLength })
  @MaxLength(12, { message: UserMessages.password.maxLength })
  public password!: string;
}
