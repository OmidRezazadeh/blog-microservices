import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from './base.entity';
@Entity()
export class Profile extends BaseEntity{
    @Column()
    bio?:string

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
    @Column()
    userId: number;
}