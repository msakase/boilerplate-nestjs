import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { Factory } from 'rosie';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { User } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/domain/auth/auth.module';
import { UsersModule } from 'src/domain/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/domain/auth/guard/jwt-auth.guard';
import { appInit, getTestDB } from '../e2e.helpers';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: Repository<User>;

  beforeAll(async () => {
    [app, module] = await appInit(
      {
        imports: [
          ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
          }),
          getTestDB([User]),
          AuthModule,
          UsersModule,
        ],
        providers: [
          {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
          },
        ],
      },
      false,
    );
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await app.close();
    module.close();
  });

  describe('/login (POST)', () => {
    const user: User = Factory.build<User>('User', { passwordHash: bcrypt.hashSync('password', 10) });
    const req = {
      username: user.name,
      password: 'password',
    };
    it('should get correct http code', async () => {
      await repository.save(user);
      const res: { body: { access_token: string } } = await request(app.getHttpServer())
        .post('/auth/login')
        .send(req)
        .expect(201);
    });
  });

  describe('JwtAuthGuard', () => {
    const user: User = Factory.build<User>('User', { passwordHash: bcrypt.hashSync('password', 10) });
    it('should get unauthorized', async () => {
      const res = await request(app.getHttpServer()).get('/users').expect(401);
    });
    it('should get correct data', async () => {
      const req = {
        username: user.name,
        password: 'password',
      };
      await repository.save(user);
      const res1: { body: { access_token: string } } = await request(app.getHttpServer()).post('/auth/login').send(req);
      const res: { body: User[] } = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `bearer ${res1.body.access_token}`)
        .expect(200);
      expect(res.body[0].name).toEqual(user.name);
    });
  });
});
