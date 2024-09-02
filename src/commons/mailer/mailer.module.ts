import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAILER_HOST'),
          port: configService.get('MAILER_PORT'),
          secure: true,
          auth: {
            user: configService.get('MAILER_USERNAME'),
            pass: configService.get('MAILER_PASSWORD'),
          },
        },
      }),
    }),
  ],
})
export class CustomMailerModule {}
