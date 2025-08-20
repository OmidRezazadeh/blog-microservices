import { Entity, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
