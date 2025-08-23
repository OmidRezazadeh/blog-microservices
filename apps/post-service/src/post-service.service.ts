import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../../libs/common/src/dto/createPost.dto';
import { Repository } from 'typeorm';
import { Post } from 'blog/common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

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
