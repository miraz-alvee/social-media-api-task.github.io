import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { CurrentUserMiddleware } from './middleware/current-user.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use middleware globally
  //app.use(new CurrentUserMiddleware());
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
