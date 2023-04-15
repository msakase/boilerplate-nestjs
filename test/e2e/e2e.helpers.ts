import { CanActivate, DynamicModule, INestApplication, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/domain/auth/guard/jwt-auth.guard';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const appInit = async (
  metaData: ModuleMetadata,
  skipAuth = true,
): Promise<[INestApplication, TestingModule]> => {
  const mockJwtAuthGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };
  const builder: TestingModuleBuilder = await Test.createTestingModule(metaData);
  if (skipAuth) {
    builder.overrideProvider(JwtAuthGuard).useValue(mockJwtAuthGuard);
  }
  const module = await builder.compile();
  const app: INestApplication = module.createNestApplication();
  await app.init();
  return [app, module];
};

export const getTestDB = (entities: any): DynamicModule => {
  return TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
  });
};
