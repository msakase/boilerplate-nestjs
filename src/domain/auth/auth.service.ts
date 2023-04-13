import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/users.entity';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './strategy/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) {}

  async validateUser(name: string, password: string): Promise<User> {
    const existUser = await this.usersService.existName(name);
    if (existUser && bcrypt.compareSync(password, existUser.passwordHash)) {
      return existUser;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { userId: user.id, userName: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
