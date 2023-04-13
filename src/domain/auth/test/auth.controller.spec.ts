import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factory } from 'rosie';
import { User } from 'src/entity/users.entity';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [AuthModule],
      controllers: [AuthController],
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

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('login()', () => {
    const user = Factory.build<User>('User');
    const token = { access_token: 'token string' };

    it('should get access_token', () => {
      jest.spyOn(service, 'login').mockImplementation(async () => {
        return token;
      });
      expect(controller.login({ user })).resolves.toEqual(token);
    });
  });
});
