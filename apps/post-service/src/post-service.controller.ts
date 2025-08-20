import { Body, Controller, Request , Post, UseGuards, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostServiceService } from './post-service.service';
import { CreatePostDto } from './dto/createPost.dto';
import { JwtAuthGuard } from '@blog/auth';

@Controller('post')
export class PostServiceController {
  constructor(private readonly postServiceService: PostServiceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('store')
  async store(
    @Body() createPostDto:CreatePostDto,
    @Request() request) {
      const userId = request.user.id;
      return this.postServiceService.store(createPostDto, userId);
  }

  @MessagePattern('post.byUser')
  async getPostsByUser(@Payload() data: { userId: number }) {
    return this.postServiceService.findByUserId(data.userId);
  }
}
