import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { UserRole } from './user.model';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/address/address.dto';

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

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUserDto {
  page: number = 4;
  limit: number;
  keyword: string;
}
