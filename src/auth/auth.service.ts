import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async signIn(signIn: SignInDto) {
    const user = await this.usersService.getUserByEmail(signIn.email);
    const payload = { id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
}
