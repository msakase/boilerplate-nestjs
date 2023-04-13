import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factory } from 'rosie';
import { User } from 'src/entity/users.entity';
import { UsersService } from 'src/domain/users/users.service';
import { AuthService } from '../../auth.service';
import { LocalStrategy } from '../local.strategy';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        AuthService,
        UsersService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    service = module.get<AuthService>(AuthService);
  });

  describe('validate()', () => {
    const user: User = Factory.build<User>('User');
    it('should get valid user', () => {
      jest.spyOn(service, 'validateUser').mockImplementation(async () => {
        return user;
      });
      expect(strategy.validate(user.name, user.passwordHash)).resolves.toEqual(user);
    });

    it('should get unauthorized', () => {
      jest.spyOn(service, 'validateUser').mockImplementation(async () => {
        return undefined;
      });
      expect(strategy.validate(user.name, user.passwordHash)).rejects.toThrow(UnauthorizedException);
    });
  });
});
