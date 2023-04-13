import * as passport from 'passport';
import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { JwtAuthGuard } from '../jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthGuard, Reflector],
    }).compile();

    reflector = module.get<Reflector>(Reflector);
    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  describe('canActivate()', () => {
    passport.use('jwt', { authenticate: payload => false });
    const context = createMock<ExecutionContext>();

    it('should get true in public', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockImplementation(() => {
        return true;
      });
      expect(guard.canActivate(context)).toBeTruthy();
    });

    it('should get false not in public', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockImplementation(() => {
        return false;
      });
      expect(guard.canActivate(context)).rejects.toBeFalsy();
    });
  });
});
