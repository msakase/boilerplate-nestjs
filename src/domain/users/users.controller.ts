import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { SkipAuth } from 'src/common/decorators/public.decorator';
import { User } from 'src/entity/users.entity';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ description: 'get user list', type: [User] })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ description: 'get specified user info', type: User })
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @SkipAuth()
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ description: 'create new user', type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ description: 'update new user info', type: User })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ description: 'delete a user', type: User })
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(+id);
  }
}
