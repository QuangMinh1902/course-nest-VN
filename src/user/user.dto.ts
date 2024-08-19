import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from './user.model';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string = 'minh';

  @IsEmail()
  email: string = 'minh@gmail.com';

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  role: UserRole;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
