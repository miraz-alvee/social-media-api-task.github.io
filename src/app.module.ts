import { dataSourceOptions } from './../db/data-source';
import { MiddlewareConsumer, Module, RequestMethod, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
//import { CurrentUserMiddleware } from './middleware/current-user.middleware';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, PostModule],
  controllers: [AppController,],
  providers: [
    AppService,
    
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(CurrentUserMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
