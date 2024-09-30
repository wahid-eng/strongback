import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Project } from 'src/projects/schemas/project.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { name, description, status, deadline, project } = createTaskDto;

    const isValidProject = await this.projectModel.findById(project).exec();
    if (!isValidProject) {
      throw new BadRequestException(`Project with ID ${project} not found.`);
    }

    const task = new this.taskModel({
      name,
      description,
      status,
      deadline,
      project,
    });

    await task.save();

    await this.projectModel.findByIdAndUpdate(
      project,
      { $addToSet: { tasks: task._id } },
      { runValidators: true },
    );

    return task;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new BadRequestException(`Task with ID ${id} not found.`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { name, description, status, deadline, project } = updateTaskDto;

    const task = await this.taskModel
      .findByIdAndUpdate(
        id,
        { name, description, status, deadline, project },
        { new: true, runValidators: true },
      )
      .exec();
    if (!task) {
      throw new BadRequestException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  async delete(id: string): Promise<any> {
    const task = await this.taskModel.findByIdAndDelete(id).exec();
    if (!task) {
      throw new BadRequestException(`Task with ID ${id} not found.`);
    }
    return task;
  }
}
