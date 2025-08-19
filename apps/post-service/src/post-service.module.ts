import { Module } from '@nestjs/common';
import { PostServiceController } from './post-service.controller';
import { PostServiceService } from './post-service.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),

    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
    }),
  ],
  controllers: [PostServiceController],
  providers: [PostServiceService],
  exports: [PostServiceService],
})
export class PostServiceModule {}
