import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './user.entity';
import { UserNotFoundException } from './user.exception';
import { CreateUserDto, UpdateUserDto } from './user.dto';

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
  async createUser(userData: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
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

  async deleteUser(id: number) {
    const deleteResponse = await this.userRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new UserNotFoundException(id);
    }
    return 'Delete is successfully.';
  }
}
