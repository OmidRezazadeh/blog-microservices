import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceModule } from './user-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST ,
        port: parseInt(process.env.DB_PORT || '5433'),
        username: process.env.DB_USERNAME || 'blog_user',
        password: process.env.DB_PASSWORD || 'blog_pass',
        database: process.env.DB_DATABASE || 'blog_db',
        autoLoadEntities: true, // 👈 این با forFeature کار می‌کنه
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),
    UserServiceModule,
  ],
})
export class AppModule {}
