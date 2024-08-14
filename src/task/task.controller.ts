import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import CreateTaskDto from './dto/create.task.dto';
import Task from 'src/model/task.entity';
import ChangeIsDoneDto from './dto/change.isDone.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task | HttpStatus> {
      return this.taskService.create(createTaskDto);
    }

    @Get('all/:id')
    createUser(@Param() params: any): Promise<Task[] | HttpStatus> {
      return this.taskService.getAllByProjectId(params);
    }

    @Patch('is-done')
    changeIsDone(@Body() changeIsDoneDto: ChangeIsDoneDto): Promise<Task | HttpStatus> {
      return this.taskService.changeIsDone(changeIsDoneDto);
    }

}
