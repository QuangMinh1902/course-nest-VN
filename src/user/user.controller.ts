import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import UserEntity from './user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() userData: UpdateUserDto) {
    return this.userService.updateUser(id, userData);
  }
}
