import { Injectable } from '@nestjs/common';
import TokenEntity from './token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTokenDto } from './token.dto';
import NotFoundException from 'src/commons/exceptions/not-found.exception';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {}

  async createToken(token: CreateTokenDto) {
    const newToken = this.tokenRepository.create(token);
    const savedToken = await this.tokenRepository.save(newToken);
    return savedToken;
  }

  async deleteToken(accessToken: string) {
    const deleteResponse = await this.tokenRepository.delete({ accessToken });
    if (!deleteResponse.affected) {
      throw new NotFoundException('Token', accessToken);
    }
    return 'Delete token successfully';
  }

  async checkOwnerAccessToken(
    userId: number,
    accessToken: string,
  ): Promise<TokenEntity> {
    const token = await this.tokenRepository.findOne({
      where: {
        accessToken: accessToken,
        author: {
          id: userId.toString(),
        },
      },
      relations: ['author'],
    });

    console.log({ token });

    if (token) {
      return token;
    }
    throw new NotFoundException('Token', accessToken);
  }
}
