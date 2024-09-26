import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {LikeEntity,PostEntity,UserEntity} from './index.Entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: Number(process.env.DB_PORT) || 3306,
      host: process.env.DB_HOST || "localhost",
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "nesTwitter",
      entities: [LikeEntity, PostEntity, UserEntity],
      synchronize: true,
      // synchronize: process.env.ENV === "development",
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
