import { Body, Controller, Request , Post, UseGuards } from '@nestjs/common';
import { PostServiceService } from './post-service.service';
import { CreatePostDto } from './dto/createPost.dto';
import { JwtAuthGuard } from '@blog/auth/guards/jwt.auth.guard';

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
}
