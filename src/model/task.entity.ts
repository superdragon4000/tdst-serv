import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Project from './project.entity';
import { BaseEntity } from './base.entity';

@Entity()
class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    body: string;

    @Column()
    isDone: boolean;

    @ManyToOne(() => Project, (project) => project.tasks)
    project: Project
}

export default Task;