import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Connection, createConnection } from 'typeorm';
import { TransactionalTestContext } from 'typeorm-transactional-tests';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from 'src/entity/users.entity';
import { appInit } from 'test/e2e/e2e.helpers';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;
  let transactionalContext: TransactionalTestContext;

  beforeAll(async () => {
    connection = await createConnection({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'testdb',
      entities: [User],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    });
    transactionalContext = new TransactionalTestContext(connection);
    app = await appInit({
      imports: [AppModule],
    });
  });

  afterAll(async () => {
    app.close();
    connection.close();
  });

  beforeEach(async () => {
    transactionalContext.start();
  });

  afterEach(async () => {
    transactionalContext.finish();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });
});
