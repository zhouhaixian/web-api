import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
    // return 'This action adds a new user';
  }

  findAll() {
    return this.userModel.find().exec();
    // return `This action returns all users`;
  }

  findOne(id: string) {
    return this.userModel.findOne({ id });
    // return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ id }, updateUserDto);
    // return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.userModel.findOneAndRemove({ id });
    // return `This action removes a #${id} user`;
  }
}
