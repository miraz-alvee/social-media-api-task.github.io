import { dataSourceOptions } from './../db/data-source';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
