import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostServiceService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ){}
 async store(createPostDto:CreatePostDto,userId:number){
  const post = this.postRepository.create({
    ...createPostDto,
    userId: userId,
  });

  return await this.postRepository.save(post);

  }
}
