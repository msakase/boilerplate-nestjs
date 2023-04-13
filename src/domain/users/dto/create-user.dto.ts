import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @MaxLength(100)
  @IsNotEmpty()
  password: string;
}
