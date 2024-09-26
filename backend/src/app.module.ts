import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {entities, controllers} from '.';
import GuardModule from './Guard/Guard.Module';
import UserModule from './User/User.Module';
import AuthModule from './Auth/Auth.Module';

@Module({
  exports: [GuardModule, AuthModule, UserModule],
  imports: [
    GuardModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: Number(process.env.DB_PORT) || 3306,
      host: process.env.DB_HOST || "localhost",
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "nesTwitter",
      entities: [entities.LikeEntity, entities.PostEntity, entities.UserEntity],
      // synchronize: process.env.ENV === "development",
    })
  ],
})
export class AppModule {}
