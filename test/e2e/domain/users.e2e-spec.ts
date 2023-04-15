import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { Factory } from 'rosie';
import { INestApplication } from '@nestjs/common';
import { User } from 'src/entity/users.entity';
import { CreateUserDto } from 'src/domain/users/dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersModule } from 'src/domain/users/users.module';
import { Repository } from 'typeorm';
import { TestingModule } from '@nestjs/testing';
import { appInit, getTestDB } from '../e2e.helpers';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: Repository<User>;

  beforeAll(async () => {
    [app, module] = await appInit(
      {
        imports: [getTestDB([User]), UsersModule],
      },
      false,
    );
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await app.close();
    module.close();
  });

  beforeEach(async () => {
    await repository.clear();
  });

  describe('/users (GET)', () => {
    const list: User[] = Factory.buildList<User>('User', 5);
    it('should get correnct http code', async () => {
      await repository.save(list);
      const res: { body: [User] } = await request(app.getHttpServer()).get('/users').expect(200);
    });
    it('should get all users', async () => {
      await repository.save(list);
      const res: { body: [User] } = await request(app.getHttpServer()).get('/users');
      expect(res.body.length).toEqual(5);
    });
    it('should get correct user name', async () => {
      await repository.save(list);
      const res: { body: [User] } = await request(app.getHttpServer()).get('/users');
      expect(res.body[0].name).toEqual(list[0].name);
    });
  });

  describe('/users/:i (GET)', () => {
    const list: User[] = Factory.buildList<User>('User', 5);
    it('should get correct http code', async () => {
      await repository.save(list);
      const res: { body: User } = await request(app.getHttpServer()).get(`/users/${list[0].id}`).expect(200);
    });
    it('should get correct user name', async () => {
      await repository.save(list);
      const res: { body: User } = await request(app.getHttpServer()).get(`/users/${list[0].id}`);
      expect(res.body.name).toEqual(list[0].name);
    });
  });

  describe('/users (POST)', () => {
    const dto: CreateUserDto = {
      name: 'test',
      password: 'password',
    };
    it('should get correct http code', async () => {
      const res: { body: User } = await request(app.getHttpServer()).post('/users').send(dto).expect(201);
    });
    it('should get a correct user', async () => {
      const res: { body: User } = await request(app.getHttpServer()).post('/users').send(dto);
      expect(res.body.name).toEqual(dto.name);
    });
    it('should insert a user with hashed password', async () => {
      const res: { body: User } = await request(app.getHttpServer()).post('/users').send(dto);
      const user: User[] = await repository.find({ where: { name: dto.name } });
      expect(bcrypt.compareSync(dto.password, user[0].passwordHash)).toBeTruthy();
    });
  });

  describe('/users/:i (PATCH)', () => {
    const dto: CreateUserDto = {
      name: 'test',
      password: 'password',
    };
    const user: User = Factory.build<User>('User');
    it('shuold get correnct http code', async () => {
      await repository.save(user);
      const res: { body: User } = await request(app.getHttpServer()).patch(`/users/${user.id}`).send(dto).expect(200);
    });
    it('should update user name and password', async () => {
      await repository.save(user);
      const res: { body: User } = await request(app.getHttpServer()).patch(`/users/${user.id}`).send(dto).expect(200);
      const updatedUser: User[] = await repository.find({ where: { id: user.id } });
      expect(dto.name).toEqual(updatedUser[0].name);
      expect(bcrypt.compareSync(dto.password, updatedUser[0].passwordHash)).toBeTruthy();
    });
  });

  describe('/users/:i (DELETE)', () => {
    const user: User = Factory.build<User>('User');
    it('should get correct http code', async () => {
      await repository.save(user);
      const res: { body: User } = await request(app.getHttpServer()).delete(`/users/${user.id}`).expect(200);
    });
    it('should delete user', async () => {
      await repository.save(user);
      const res: { body: User } = await request(app.getHttpServer()).delete(`/users/${user.id}`);
      const noUser: User[] = await repository.find({ where: { id: user.id } });
      expect(noUser.length).toEqual(0);
    });
  });
});
