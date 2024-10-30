import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities, modules } from '.';
import GuardModule from './Guard/Guard.Module';
import UserModule from './User/User.Module';
import AuthModule from './Auth/Auth.Module';

@Module({
  exports: [GuardModule, AuthModule, UserModule],
  imports: [
    ...modules,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // port: Number(process.env.DB_PORT) || 3306,
      // host: process.env.DB_HOST || "localhost",
      // username: process.env.DB_USERNAME || "root",
      // password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "nestwitter.db",
      synchronize: true,
      entities,
    })
  ],
})
export class AppModule { }
