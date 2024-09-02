import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signIn: SignInDto) {
    const user = await this.usersService.getUserByEmail(signIn.email);
    const payload = { id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
