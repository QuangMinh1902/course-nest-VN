import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTaskDto,
  DetailTaskDto,
  FilterTasksDto,
  UpdateTaskDto,
} from './dtos/create-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  ////////////////////////////////////////////////////////////////////////////////////////////////
  @Get('')
  @ApiOkResponse({
    type: DetailTaskDto,
    isArray: true,
  })
  getAllTasks(): DetailTaskDto[] {
    return this.taskService.getAllTasks();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  @Get('filter-tasks')
  @ApiOkResponse({
    type: DetailTaskDto,
    isArray: true,
  })
  getTasksWithFilters(
    @Query() filterTasksDto: FilterTasksDto,
  ): DetailTaskDto[] {
    if (Object.keys(filterTasksDto).length) {
      return this.taskService.getTasksWithFilters(filterTasksDto);
    }

    return this.taskService.getAllTasks();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  @Post()
  @ApiCreatedResponse({
    type: DetailTaskDto,
  })
  createTask(@Body() createTaskDto: CreateTaskDto): DetailTaskDto {
    return this.taskService.createTask(createTaskDto);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  @Get('/:id')
  @ApiOkResponse({
    type: DetailTaskDto || Array,
  })
  getTaskById(@Param('id') id: string): DetailTaskDto | [] {
    const taskById = this.taskService.getTaskById(id);
    return taskById == undefined ? [] : taskById;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  @Patch('/:id/status')
  @ApiOkResponse({
    type: DetailTaskDto,
  })
  updateTaskStatusByID(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): DetailTaskDto {
    return this.taskService.updateTaskStatusByID(id, updateTaskDto);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  @Delete('/:id')
  @ApiOkResponse({
    type: String,
  })
  deleteTaskById(@Param('id') id: string): string {
    this.taskService.deleteTaskById(id);
    return 'Delete succesfully';
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  @Get('demo-request-object/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'This is ID of task',
    schema: { oneOf: [{ type: 'integer' }] },
  })
  @ApiQuery({
    name: 'keyword',
    description: 'This is keyword search for task',
    schema: { oneOf: [{ type: 'string' }] },
  })
  demoQuestObject(@Req() request) {
    return request.params;
  }
}
