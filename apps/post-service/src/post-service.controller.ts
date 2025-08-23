import { Body, Controller, NotFoundException, Request} from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { PostServiceService } from './post-service.service';
import { CreatePostDto } from '../../../libs/common/src/dto/createPost.dto';

@Controller('post')
export class PostServiceController {
  constructor(private readonly postServiceService: PostServiceService) {}


  @MessagePattern('post.create')
  async store(@Payload() data:{userId:number,createPostDto:CreatePostDto}) {    
      return this.postServiceService.store(data.createPostDto, data.userId);
  }
  

  @MessagePattern('post.findById')
  async findById(@Payload() data: { userId:number,id:number }) {
      return this.postServiceService.findByUserId(data.userId,data.id);
  }
}
