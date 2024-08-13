import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import {
  CreateTaskDto,
  FilterTasksDto,
  UpdateTaskDto,
} from './dtos/create-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  testModule(): string {
    return 'test module';
  }

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: FilterTasksDto) {
    const { status, keyword } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(
        (task: Task) => task.status === status.toUpperCase(),
      );
    }

    if (keyword) {
      tasks = tasks.filter((task: Task) => {
        return task.title.includes(keyword);
      });
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string) {
    return this.tasks.find((task: Task) => task.id == id);
  }

  updateTaskStatusByID(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.getTaskById(id);
    task.status = updateTaskDto.status;
    return task;
  }

  deleteTaskById(id: string) {
    this.tasks = this.tasks.filter((task: Task) => task.id != id);
    return this.tasks;
  }
}
