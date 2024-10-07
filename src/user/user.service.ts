import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import UserEntity from './user.entity';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from './user.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import NotFoundException from 'src/commons/exceptions/not-found.exception';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private addressService: AddressService,
  ) {}

  // Get all users with paginate
  async paginate(
    filterUserDto: FilterUserDto,
  ): Promise<Pagination<UserEntity>> {
    let whereStm = [];
    if (filterUserDto.keyword) {
      whereStm = [
        // { name: ILike('%' + filterUserDto.keyword + '%') },
        { email: ILike('%' + filterUserDto.keyword + '%') },
      ];
    }

    const options = {
      limit: filterUserDto.limit,
      page: filterUserDto.page,
    };

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
      // select: {
      //   name: true,
      //   email: true,
      // },
      where: {},
      relations: ['address'],
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
    let address = null;
    if (userData.address) {
      address = await this.addressService.createAddress(userData.address);
    }

    const newUser = this.userRepository.create(userData);
    if (address) {
      newUser.address = address;
    }
    const user = await this.userRepository.save(newUser);
    return user;
  }

  async getUserById(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: id.toString() },
      relations: ['address'],
    });
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
    const deleteResponse = await this.userRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException('User', id);
    }
    return 'Delete is successfully.';
  }

  async restoreSoftDelete(id: number) {
    const result = await this.userRepository.restore(id);
    if (!result) {
      throw new NotFoundException('User', id);
    }
    return 'Restore is successfully.';
  }

  async getUserByToken(token: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ tokenResetPass: token });
    if (user) {
      return user;
    }
    throw new NotFoundException('User', token);
  }
}
