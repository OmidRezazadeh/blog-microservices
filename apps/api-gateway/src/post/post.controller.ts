import { JwtAuthGuard } from '@blog/auth';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from 'blog/common/dto/createPost.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post('store')
  async store(@Body() createPostDto: CreatePostDto, @Request() request) {
    const userId = request.user.id;
    return await this.postService.store(createPostDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Param('id') id: number, @Request() request) {
    const userId = request.user.id;
     return await this.postService.findById(userId,id)
  }
}
