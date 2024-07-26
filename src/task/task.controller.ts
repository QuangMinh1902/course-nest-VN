import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }
}
