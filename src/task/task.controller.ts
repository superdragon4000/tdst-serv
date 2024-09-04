import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import CreateTaskDto from './dto/create.task.dto';
import Task from 'src/model/task.entity';
import ChangeIsDoneDto from './dto/change.isDone.dto';
import DeleteTaskDto from './dto/delete.task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task | HttpStatus> {
    return this.taskService.create(createTaskDto);
  }

  @Get('all/:id')
  getAllByProjectId(@Param() params: any): Promise<Task[] | HttpStatus> {
    return this.taskService.getAllByProjectId(params);
  }

  @Patch('is-done')
  changeIsDone(
    @Body() changeIsDoneDto: ChangeIsDoneDto,
  ): Promise<Task | HttpStatus> {
    return this.taskService.changeIsDone(changeIsDoneDto);
  }

  @Delete('delete')
  deleteTask(@Body() deleteTaskDto: DeleteTaskDto) {
    return this.taskService.deleteTask(deleteTaskDto);
  }
}
