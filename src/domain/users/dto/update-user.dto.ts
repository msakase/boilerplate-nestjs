import { IsNotEmpty, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @MaxLength(100)
  @IsNotEmpty()
  password: string;
}
