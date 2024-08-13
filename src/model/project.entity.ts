import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Task from './task.entity';
import { BaseEntity } from './base.entity';

@Entity()
class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[]
}

export default Project;