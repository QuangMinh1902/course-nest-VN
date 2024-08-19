import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import UserEntity from './user.entity';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getUsers();
  }

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Get('/validate-password')
  async validatePassword() {
    const password = '123456789';
    const hash = '$2b$10$C87GIT14fOqorQIJDcE6P.PIk04XlJESSNw6Mr.ahKBokNTcCpu8m';
    const isValid = await bcrypt.compare(password, hash);
    console.log(isValid);
    return isValid;
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() userData: UpdateUserDto) {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
