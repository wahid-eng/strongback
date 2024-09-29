import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new this.userModel({ name, email, password });
    return user.save();
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User with this email does not exists');
    }

    return user;
  }
}
