import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Task from 'src/model/task.entity';
import { Equal, Repository } from 'typeorm';
import CreateTaskDto from './dto/create.task.dto';
import { ProjectService } from 'src/project/project.service';
import ChangeIsDoneDto from './dto/change.isDone.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private projectService: ProjectService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task | HttpStatus> {
    const project = await this.projectService.findProjectById(
      createTaskDto.projectId,
    );
    if (!project)
      throw new HttpException(
        'Project with provided id has not been found',
        HttpStatus.NOT_FOUND,
      );
    return await this.taskRepository.save({
      body: createTaskDto.body,
      project,
    });
  }

  async getAllByProjectId(params): Promise<Task[] | HttpStatus> {
    return await this.taskRepository.find({
      relations: {
        project: true,
      },
      where: {
        project: {
          id: params.id,
        },
      },
    });
  }

  async changeIsDone(
    changeIsDoneDto: ChangeIsDoneDto,
  ): Promise<Task | HttpStatus> {
    const task = await this.taskRepository.findOneBy({
      id: Equal(changeIsDoneDto.taskId),
    });

    if (!task)
      throw new HttpException(
        'Task with provided id has not been found',
        HttpStatus.NOT_FOUND,
      );
    
    return await this.taskRepository.save({
      ...task,
      isDone: changeIsDoneDto.isDone
    })
  }
}
