import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
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
