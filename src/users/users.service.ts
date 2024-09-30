import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from 'src/auth/dtos/register-user.dto';
import { Task } from 'src/tasks/schemas/task.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password } = registerUserDto;
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new this.userModel({ name, email, password });
    return user.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User with this email does not exists');
    }

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User with this id does not exists');
    }

    return user;
  }

  async getProjectsByUserId(id: string) {
    const response = await this.userModel
      .findById(id)
      .populate({ path: 'projects', select: '-users' })
      .exec();
    return response.projects;
  }

  async getTasksByUserId(id: string) {
    const response = await this.userModel.findById(id).exec();
    return response;
  }
}
