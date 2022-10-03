import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  IsAscii,
  IsEmail,
  IsNotEmpty,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @ApiProperty()
  id: string;

  @IsEmail()
  @MaxLength(25)
  @ApiProperty()
  email: string;

  @Length(8, 20)
  @IsString()
  @IsAscii()
  @ApiProperty()
  password: string;
}
