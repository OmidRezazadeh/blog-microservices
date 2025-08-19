import { User } from 'apps/user-service/src/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity('posts')
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string
    @Column()
    description:string
    
    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
    @Column()
    userId: number;
}