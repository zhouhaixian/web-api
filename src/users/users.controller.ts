import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger/dist';
import { sha256 } from 'hash.js';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    const { id, email, password } = createUserDto;
    return this.usersService.create({
      id,
      email,
      password: sha256().update(password).digest('hex'),
    });
  }

  // @Get('find')
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id/:password')
  async update(
    @Param('id') id: string,
    @Param('password') password: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.findOne(id);
    if (user === null) throw new BadRequestException('User does not exist');
    if (sha256().update(password).digest('hex') !== user.password)
      throw new BadRequestException('Password error');
    return this.usersService.update(id, {
      id: updateUserDto.id,
      email: updateUserDto.email,
      password: sha256().update(updateUserDto.password).digest('hex'),
    });
  }

  @Delete(':id/:password')
  async remove(@Param('id') id: string, @Param('password') password: string) {
    const user = await this.findOne(id);
    if (user === null) throw new BadRequestException('User does not exist');
    if (sha256().update(password).digest('hex') !== user.password)
      throw new BadRequestException('Password error');
    return this.usersService.remove(id);
  }
}
