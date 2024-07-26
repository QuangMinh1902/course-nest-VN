import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: Math.random().toString(),
      title: createTaskDto.title,
    };
    this.tasks.push(task);
    return task;
  }
}
