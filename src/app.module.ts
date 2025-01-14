import { dataSourceOptions } from './../db/data-source';
import { MiddlewareConsumer, Module, RequestMethod, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';


import { CurrentUserMiddleware } from './middleware/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, PostModule],
  controllers: [AppController,],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
