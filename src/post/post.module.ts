import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { CurrentUserMiddleware } from 'src/middleware/current-user.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([PostEntity]),UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware) // Apply CurrentUserMiddleware
      .forRoutes({ path: 'posts/*', method: RequestMethod.ALL }); // Apply to all Post routes
  }
}
