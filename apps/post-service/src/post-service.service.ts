import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../../libs/common/src/dto/createPost.dto';
import { Repository } from 'typeorm';
import { Post } from 'blog/common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, timeout, of } from 'rxjs';

@Injectable()
export class PostServiceService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @Inject('POST_SERVICE') private readonly rabbitClient:ClientProxy,

  ) {}

  async store(createPostDto: CreatePostDto, userId: number) {
    try {
      const post = this.postRepository.create({
        ...createPostDto,
        userId: userId,
      });
      this.rabbitClient.emit('post.alert',{
        message:'make post for you'
      }).pipe(timeout(3000),
    catchError(()=> of(null))
    )
      return await this.postRepository.save(post);
    } catch (error) {
      console.log(error)
    }

  }

  async findByUserId(userId: number, id: number) {
    const post = await this.postRepository.findOne({
      where: { userId: userId, id: id },
    });
    if (!post) {
      return new RpcException({
        status: 400,
        error: 'پستی یافت نشد',
      });
    }
    return post;
  }
  async delete(id: number, userId: number) {
    const deleteResult = await this.postRepository.delete({
      id: id,
      userId: userId
    });
    if (deleteResult.affected === 0) {
      return new RpcException({
        status: 404, // Should be 404 for not found, not 400
        error: 'Not Found',
        message: 'پستی یافت نشد'
      });
    }

    return {
      success: true,
      message: 'پست با موفقیت حذف شد',
      deletedId: id
    };

  }
}
