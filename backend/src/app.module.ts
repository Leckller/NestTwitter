import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {entities, controllers} from '.';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: Number(process.env.DB_PORT) || 3306,
      host: process.env.DB_HOST || "localhost",
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "nesTwitter",
      entities: [entities.LikeEntity, entities.PostEntity, entities.UserEntity],
      synchronize: true,
      // synchronize: process.env.ENV === "development",
    })
  ],
  controllers: [controllers.LikeController, controllers.UserController, controllers.PostController],
  providers: [],
})
export class AppModule {}
