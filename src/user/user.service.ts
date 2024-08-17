import { Injectable, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './user.entity';
import { UserNotFoundException } from './user.exception';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // Get All users
  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({
      select: {
        name: true,
        email: true,
      },
      where: {},
    });
  }

  // Get User by email
  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new UserNotFoundException(email);
  }

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    // Tạo một instance của UserEntity từ DTO
    const user = this.userRepository.create(createUserDto);

    // Băm mật khẩu trước khi lưu
    user.password = await bcrypt.hash(user.password, 10);

    // Lưu user vào database
    return this.userRepository.save(user);
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: id.toString() });
    if (user) {
      return user;
    }
    throw new UserNotFoundException(id);
  }

  async updateUser(id: number, userData: UpdateUserDto) {
    await this.userRepository.update({ id: id.toString() }, userData);
    const updatedUser = await this.getUserById(id);
    if (updatedUser) {
      return updatedUser;
    }
    throw new UserNotFoundException(id);
  }
}
