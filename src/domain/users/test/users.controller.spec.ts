import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Factory } from 'rosie';
import { Repository } from 'typeorm';
import { User } from 'src/entity/users.entity';
import { UsersService } from '../users.service';
import { UsersController } from '../users.controller';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    const user: User = Factory.build('User');

    it('should create a user', () => {
      const dto: CreateUserDto = {
        name: user.name,
        password: user.passwordHash,
      };

      jest.spyOn(service, 'create').mockImplementation(async () => {
        return user;
      });

      expect(controller.create(dto)).resolves.toEqual(user);
    });
  });

  describe('findAll()', () => {
    const user: User = Factory.build('User');

    it('should return users', () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return [user];
      });

      expect(controller.findAll()).resolves.toEqual([user]);
    });

    it('should return empty array by not found users', () => {
      const noUser: User[] = [];

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return noUser;
      });

      expect(controller.findAll()).resolves.toEqual(noUser);
    });
  });

  describe('findOne()', () => {
    const user: User = Factory.build('User');

    it('should return user', () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        return user;
      });

      expect(controller.findOne(1)).resolves.toEqual(user);
    });

    it('should return not found exception', () => {
      jest.spyOn(service, 'findOne').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(controller.findOne(2)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });

  describe('update()', () => {
    const user: User = Factory.build('User');

    it('should update a user', () => {
      const dto: UpdateUserDto = {
        name: '次郎',
        password: 'password1',
      };
      const expectUser: User = {
        ...user,
        name: dto.name,
        passwordHash: dto.password,
      };

      jest.spyOn(service, 'update').mockImplementation(async () => {
        return expectUser;
      });

      expect(controller.update(user.id.toString(), dto)).resolves.toEqual(expectUser);
    });
  });

  describe('remove()', () => {
    const user: User = Factory.build('User');

    it('should remove a user', () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => {
        return user;
      });

      expect(controller.remove(user.id.toString())).resolves.toEqual(user);
    });
  });
});
