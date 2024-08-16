import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './user.entity';
import { UserNotFoundException } from './user.exception';

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

  //Get User by email
  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new UserNotFoundException(email);
  }
}
