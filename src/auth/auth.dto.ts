import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class ForgotPasswordAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordAuthDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  password: string;
}
