import { IsNotEmpty, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'user name',
    type: String,
    required: true,
    maxLength: 100,
  })
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'password',
    type: String,
    required: true,
    maxLength: 100,
  })
  @MaxLength(100)
  @IsNotEmpty()
  password: string;
}
