import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import UserEntity from './user.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users/paginate')
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })
  async getUsersWithPaginate(
    @Query('limit') limit: number = 1,
    @Query('page') page: number = 4,
    @Query('keyword') keyword: string,
  ): Promise<Pagination<UserEntity>> {
    return this.userService.paginate({ limit, page }, keyword);
  }

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
