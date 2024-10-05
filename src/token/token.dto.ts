import { IsNotEmpty, IsString } from 'class-validator';
import UserEntity from 'src/user/user.entity';

export class CreateTokenDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string = '';

  @IsNotEmpty()
  author: UserEntity;
}
