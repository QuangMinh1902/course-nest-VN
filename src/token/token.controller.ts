import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokenService } from './token.service';
import { CreateTokenDto } from './token.dto';

@Controller('token')
@ApiTags('Token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post('/create')
  async createToken(@Body() createTokenDto: CreateTokenDto) {
    const token = await this.tokenService.createToken(createTokenDto);
    return { token };
  }
}
