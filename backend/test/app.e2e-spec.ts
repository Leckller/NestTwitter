import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import UserEntity from '../src/User/User.entity';
import { Repository } from 'typeorm';

describe('--- E2E - User ---', () => {
  let app: INestApplication;
  let values = {};
  let repository = Repository<UserEntity>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue:values
        }
      ]
      
    }).compile();

    app = moduleFixture.createNestApplication();


    await app.init();
  });

  it('/ (GET)', () => {

    const mockUser = new UserEntity({
      address: 'ruy',
      banner: 'a',
      email: 'ruy@gmail.com',
      name: 'Ruy',
      password: 'Abc123!!!',
      photo: 'a'
    })
    
    return request(app.getHttpServer())
      .post('/user')
      .send(mockUser)
      .expect(200)
      .expect({})
    
    });
});
