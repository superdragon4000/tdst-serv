import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import CreateTaskDto from './dto/create.task.dto';
import Task from 'src/model/task.entity';

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

}
