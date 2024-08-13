import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Project from 'src/model/project.entity';
import { Equal, Repository } from 'typeorm';
import CreateProjectDto from './dto/create.project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
  ): Promise<Project | HttpStatus> {
    return await this.projectRepository.save({
      name: createProjectDto.name,
    });
  }

  async getAll(): Promise<Project[] | HttpStatus> {
    return await this.projectRepository.find({});
  }

  async findProjectById(id: string): Promise<Project> {
    return await this.projectRepository.findOneBy({
        id: Equal(id),
      });
  }
}
