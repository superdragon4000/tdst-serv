import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Project from './project.entity';
import { BaseEntity } from './base.entity';

export enum UserStatus {
    ADMIN = "admin",
    EDITOR = "editor",
    ACTIVE = "active",
    SUSPENDED = "suspended",
    DELETED = "deleted"
}

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserStatus,
        default: UserStatus.ACTIVE
    })
    status: UserStatus;

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[]
}

export default User;