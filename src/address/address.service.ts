import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AddressEntity from './address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async createAddress(addressData: CreateAddressDto): Promise<AddressEntity> {
    const newAddress = this.addressRepository.create(addressData);
    const address = await this.addressRepository.save(newAddress);
    return address;
  }
}
