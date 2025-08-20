import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, timeout, of } from 'rxjs';

@Injectable()
export class PostServiceService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @Inject('USER_RMQ') 
    private readonly userClient: ClientProxy,
  ){}
  
 async store(createPostDto:CreatePostDto,userId:number){
  
  const isValid = await lastValueFrom(
   this.userClient
   .send('user.validate',{userId})
   .pipe(timeout(3000),catchError(()=> of(false))),);
    console.log(isValid);

  if (!isValid) {
    throw new UnauthorizedException('invalid user');
  }
  const post = this.postRepository.create({
    ...createPostDto,
    userId: userId,
  });
  const saved= await this.postRepository.save(post);
  
  
  this.userClient.emit('post.created', {
    postId: saved.id,
    userId,
    title: saved.title,
  });
  console.log('📤 post.created emitted to exchange');
return saved
  }
}
