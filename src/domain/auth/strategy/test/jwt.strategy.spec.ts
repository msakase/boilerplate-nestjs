import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtPayload, JwtStrategy } from '../jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  process.env.JWT_SECRET_KEY = 'key';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy, ConfigService],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  describe('validate()', () => {
    const payload: JwtPayload = {
      userId: 1,
      userName: 'name',
    };
    it('should get payload', () => {
      expect(strategy.validate(payload)).resolves.toEqual(payload);
    });
  });
});
