import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from './user.model';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  name: string;

  email: string;

  password: string;

  role: UserRole;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
