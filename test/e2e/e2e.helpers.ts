import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

export const appInit = async (metaData: ModuleMetadata): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule(metaData).compile();
  const app: INestApplication = moduleFixture.createNestApplication();
  await app.init();
  return app;
};
