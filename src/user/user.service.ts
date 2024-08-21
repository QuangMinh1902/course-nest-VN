import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import UserEntity from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import NotFoundException from 'src/exceptions/not-found.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // Get all users with paginate
  async paginate(
    options: IPaginationOptions,
    keyword: string,
  ): Promise<Pagination<UserEntity>> {
    let whereStm = [];
    if (keyword !== 'admin') {
      whereStm = [
        { name: ILike('%' + keyword + '%') },
        { email: ILike('%' + keyword + '%') },
      ];
    }
    return paginate<UserEntity>(this.userRepository, options, {
      where: whereStm,
      order: {
        id: 'ASC',
      },
    });
  }

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
    throw new NotFoundException('User', email);
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
    throw new NotFoundException('User', id);
  }

  async updateUser(id: number, userData: UpdateUserDto) {
    await this.userRepository.update({ id: id.toString() }, userData);
    const updatedUser = await this.getUserById(id);
    if (updatedUser) {
      return updatedUser;
    }
    throw new NotFoundException('User', id);
  }

  async deleteUser(id: number) {
    const deleteResponse = await this.userRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException('User', id);
    }
    return 'Delete is successfully.';
  }
}
