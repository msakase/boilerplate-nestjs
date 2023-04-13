import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SkipAuth } from 'src/common/decorators/public.decorator';
import { User } from 'src/entity/users.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: User }) {
    const { user } = req;
    return this.authService.login(user);
  }
}
