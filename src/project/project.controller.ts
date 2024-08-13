import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import CreateProjectDto from './dto/create.project.dto';
import Project from 'src/model/project.entity';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() createProjectDto: CreateProjectDto): Promise<Project | HttpStatus> {
      return this.projectService.create(createProjectDto);
    }

    @Get('all')
    getAll(): Promise<Project[] | HttpStatus> {
      return this.projectService.getAll();
    }
}
