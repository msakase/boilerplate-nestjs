import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } }).then(res => {
      if (!res) {
        throw new NotFoundException();
      }
      return res;
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.userRepository.save({
      name: dto.name,
      passwordHash: bcrypt.hashSync(dto.password, 10),
    });
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    user.name = dto.name;
    user.passwordHash = bcrypt.hashSync(dto.password, 10);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return this.userRepository.remove(user);
  }

  async existName(name: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { name } }).then(res => {
      if (!res) {
        return null;
      }
      return res;
    });
  }
}
