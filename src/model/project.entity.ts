import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Task from './task.entity';
import { BaseEntity } from './base.entity';
import User from './user.entity';

@Entity()
class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[]

    @ManyToOne(() => User, (user) => user.projects)
    user: User
}

export default Project;