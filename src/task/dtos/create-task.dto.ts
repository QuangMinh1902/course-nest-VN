import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../task.model';

export class CreateTaskDto {
  title: string;
  description: string;
}

export class UpdateTaskDto {
  @ApiProperty({ enum: Object.keys(TaskStatus) })
  status: TaskStatus;
}

export class FilterTasksDto {
  status?: TaskStatus;
  keyword?: string;
}

export class DetailTaskDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
