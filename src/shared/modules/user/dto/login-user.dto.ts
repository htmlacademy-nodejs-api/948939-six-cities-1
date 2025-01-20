import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { LoginUserMessages } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({},{ message: LoginUserMessages.email.invalidFormat })
  public email!: string;

  @IsString()
  @MinLength(6, { message: LoginUserMessages.password.minLength })
  @MaxLength(12, { message: LoginUserMessages.password.maxLength })
  public password!: string;
}
