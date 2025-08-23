import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePostDto } from 'blog/common/dto/createPost.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_SERVICE') private readonly rabbitClient:ClientProxy
    ){}
     async store(createPostDto:CreatePostDto,userId:number){
            return await firstValueFrom(this.rabbitClient.send('post.create',{createPostDto,userId}))
     }
}
