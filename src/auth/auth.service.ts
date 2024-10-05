import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ResetPasswordAuthDto, SignInDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';

import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private tokenService: TokenService,
  ) {}

  async signIn(signIn: SignInDto) {
    const user = await this.usersService.getUserByEmail(signIn.email);
    const payload = { id: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return this.tokenService.createToken({
      accessToken,
      author: user,
    });
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.getUserByEmail(email);
    user.tokenResetPass = crypto.randomUUID();
    const updatedUser = await this.usersService.updateUser(+user.id, user);
    // console.log(updatedUser);
    const html = `Please click <a href="http://localhost:3000/reset-password?tokenResetPass=${updatedUser.tokenResetPass}">here</a> to reset your password`;

    console.log(123);
    await this.mailerService.sendMail({
      from: 'FLIT <info@flit.edu.vn>',
      to: updatedUser.email,
      subject: 'Reset Password',
      html: html,
    });
    return updatedUser;
  }

  async resetPassword(resetPasswordDto: ResetPasswordAuthDto) {
    const user = await this.usersService.getUserByToken(resetPasswordDto.token);
    user.tokenResetPass = '';
    user.password = await bcrypt.hash(resetPasswordDto.password, 10);
    return await this.usersService.updateUser(+user.id, user);
  }
}
