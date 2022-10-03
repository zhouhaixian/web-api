import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsAscii,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
