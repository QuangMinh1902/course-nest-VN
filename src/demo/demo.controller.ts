import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('demo')
export class DemoController {
  constructor(private configService: ConfigService) {}
  @Get()
  demofunction() {
    return this.configService.get('port');
  }
}
