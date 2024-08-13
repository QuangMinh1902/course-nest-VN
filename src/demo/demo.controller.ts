import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TaskService } from 'src/task/task.service';

@Controller('demo')
export class DemoController {
  constructor(
    private configService: ConfigService,
    private taskService: TaskService,
  ) {}
  @Get()
  demofunction() {
    return this.configService.get('port');
  }

  @Get('task')
  testModule() {
    return this.taskService.testModule();
  }
}
