import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Factory } from 'rosie';
import { User } from 'src/entity/users.entity';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create()', () => {
    const user: User = Factory.build('User');
    const dto: CreateUserDto = {
      name: user.name,
      password: user.passwordHash,
    };
    it('should successfully insert a user', () => {
      jest.spyOn(repository, 'save').mockImplementation(async () => {
        return user;
      });
      expect(service.create(dto)).resolves.toEqual(user);
    });

    it('should call reposity function with correct arguments', () => {
      const saveFunc = jest.spyOn(repository, 'save').mockImplementation(async () => {
        return user;
      });
      service.create(dto);
      expect(saveFunc.mock.calls[0][0].name).toBe(dto.name);
      expect(bcrypt.compareSync(user.passwordHash, saveFunc.mock.calls[0][0].passwordHash)).toBeTruthy();
    });
  });

  describe('findAll()', () => {
    it('should return users', () => {
      const user: User = Factory.build('User');
      jest.spyOn(repository, 'find').mockImplementation(async () => {
        return [user];
      });
      expect(service.findAll()).resolves.toEqual([user]);
    });

    it('should return empty array by not found users', () => {
      const user: User[] = [];
      jest.spyOn(repository, 'find').mockImplementation(async () => {
        return user;
      });
      expect(service.findAll()).resolves.toEqual([]);
    });
  });

  describe('findOne()', () => {
    it('should return user', () => {
      const user: User = Factory.build('User');
      jest.spyOn(repository, 'findOne').mockImplementation(async () => {
        return user;
      });
      expect(service.findOne(1)).resolves.toEqual(user);
    });

    it('should return not found exception', () => {
      const user: User = undefined;
      jest.spyOn(repository, 'findOne').mockImplementation(async () => {
        return user;
      });
      expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update()', () => {
    const user: User = Factory.build('User');
    const dto: UpdateUserDto = {
      name: '次郎',
      password: 'password2',
    };

    it('should successfully update a user', () => {
      const expectUser: User = {
        ...user,
        name: dto.name,
        passwordHash: bcrypt.hashSync(dto.password, 10),
      };
      jest.spyOn(repository, 'findOne').mockImplementation(async () => {
        return user;
      });
      jest.spyOn(repository, 'save').mockImplementation(async () => {
        return expectUser;
      });
      expect(service.update(user.id, dto)).resolves.toEqual(expectUser);
    });

    it('not found a update user', () => {
      const undefinedUser: User = undefined;
      jest.spyOn(repository, 'findOne').mockImplementation(async () => {
        return undefinedUser;
      });
      expect(service.update(2, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove()', () => {
    const user: User = Factory.build('User');
    it('should successfully delete a user', () => {
      jest.spyOn(repository, 'findOne').mockImplementation(async () => {
        return user;
      });
      jest.spyOn(repository, 'remove').mockImplementation(async () => {
        return user;
      });
      expect(service.remove(user.id)).resolves.toEqual(user);
    });

    it('not found a delete user', () => {
      jest.spyOn(repository, 'findOne').mockImplementation(async () => {
        return undefined;
      });
      expect(service.remove(user.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('existName()', () => {
    it('should return user', () => {
      const user: User = Factory.build('User');
      jest.spyOn(repository, 'findOne').mockImplementation(async () => {
        return user;
      });
      expect(service.existName(user.name)).resolves.toEqual(user);
    });

    it('should return null', () => {
      const user: User = undefined;
      jest.spyOn(repository, 'findOne').mockImplementation(async () => {
        return user;
      });
      expect(service.existName('')).resolves.toBeNull();
    });
  });
});
