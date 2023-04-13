import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkipAuth } from 'src/common/decorators/public.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUser, getResponseUser } from './dto/response-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<ResponseUser[]> {
    return (await this.usersService.findAll()).map(user => getResponseUser(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseUser> {
    return this.usersService.findOne(+id).then(user => getResponseUser(user));
  }

  @SkipAuth()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto).then(user => getResponseUser(user));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ResponseUser> {
    return this.usersService.update(+id, updateUserDto).then(user => getResponseUser(user));
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseUser> {
    return this.usersService.remove(+id).then(user => getResponseUser(user));
  }
}
