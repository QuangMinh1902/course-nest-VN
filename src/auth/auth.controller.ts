import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  ForgotPasswordAuthDto,
  ResetPasswordAuthDto,
  SignInDto,
} from './auth.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth('access-token')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  @Post('')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req) {
    const payload = req.currentPayloadUser;
    return {
      user: await this.userService.getUserById(payload.id),
    };
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordAuthDto) {
    return await this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordAuthDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Get('/signout')
  @UseGuards(AuthGuard)
  async signOut(@Req() req) {
    return await this.tokenService.deleteToken(req.accessToken);
  }
}
