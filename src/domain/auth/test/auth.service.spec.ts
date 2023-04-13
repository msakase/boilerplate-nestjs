import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Factory } from 'rosie';
import { Repository } from 'typeorm';
import { User } from 'src/entity/users.entity';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser()', () => {
    const password = faker.internet.password();
    const user: User = Factory.build<User>('User', { passwordHash: bcrypt.hashSync(password, 10) });

    it('should get valid user', () => {
      jest.spyOn(usersService, 'existName').mockImplementation(async () => {
        return user;
      });
      expect(authService.validateUser(user.name, password)).resolves.toEqual(user);
    });

    it('should not get user', () => {
      jest.spyOn(usersService, 'existName').mockImplementation(async () => {
        return undefined;
      });
      expect(authService.validateUser(user.name, password)).resolves.toBeNull();
    });
  });

  describe('login()', () => {
    const user: User = Factory.build<User>('User');
    const token = 'token string';

    it('should get access_token', () => {
      jest.spyOn(jwtService, 'sign').mockImplementation(() => {
        return token;
      });
      expect(authService.login(user)).resolves.toEqual({ access_token: token });
    });
  });
});
