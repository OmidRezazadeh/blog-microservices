import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from '../../../libs/common/src/dto/createPost.dto';
import { Repository } from 'typeorm';
import { Post } from 'blog/common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, timeout, of } from 'rxjs';

@Injectable()
export class PostServiceService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async store(createPostDto: CreatePostDto, userId: number) {
    const post = this.postRepository.create({
      ...createPostDto,
      userId: userId,
    });
    return await this.postRepository.save(post);

  }
  
  async findByUserId(userId: number) {
    // const posts = await this.postRepository.find({ where: {  userId } });
    
    // // Get user data from user service
    // const user = await lastValueFrom(
    //   this.userClient.send('user.validate', { userId }).pipe(
    //     timeout(3000),
    //     catchError(() => of(null)),
    //   ),
    // );

    // // Return posts with user data
    // return {
    //   user: user ? {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //     createdAt: user.createdAt,
    //     // Add other user fields as needed
    //   } : null,
    //   posts: posts.map(post => ({
    //     id: post.id,
    //     title: post.title,
    //     content: post.description,
    //     userId: post.userId,
    //     // Add other post fields as needed
    //   }))
    // };
  }
}
