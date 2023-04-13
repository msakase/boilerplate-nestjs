import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entity/users.entity';

export interface JwtPayload {
  userId: User['id'];
  userName: User['name'];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return { userId: payload.userId, userName: payload.userName };
  }
}
