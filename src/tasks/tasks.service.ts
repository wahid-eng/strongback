import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';
import { Task } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private readonly projectService: ProjectsService,
    private readonly userService: UsersService,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { name, description, status, deadline, project, user } =
      createTaskDto;

    await this.validateUserAndProjectExistace({
      userId: user,
      projectId: project,
    });

    const task = new this.taskModel({
      name,
      description,
      status,
      deadline,
      project,
      user,
    });

    return task.save();
  }

  async findOne(id: string): Promise<Task> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Task ID is invalid.');
    }

    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new BadRequestException(`Task with ID ${id} not found.`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Task ID is invalid');
    }

    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new BadRequestException(`Task with ID ${id} not found.`);
    }

    const { name, description, status, deadline, project, user } =
      updateTaskDto;

    await this.validateUserAndProjectExistace({
      userId: user,
      projectId: project,
    });

    const updatedTask = await this.taskModel
      .findByIdAndUpdate(
        id,
        { name, description, status, deadline, project, user },
        { new: true, runValidators: true },
      )
      .exec();
    return updatedTask;
  }

  async delete(id: string): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Task ID is invalid');
    }

    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new BadRequestException(`Task with ID ${id} not found.`);
    }

    return task.deleteOne();
  }

  private async validateUserAndProjectExistace({
    userId,
    projectId,
  }: {
    userId?: string;
    projectId?: string;
  }): Promise<any> {
    if (userId?.length) {
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException(
          'Request contains invalid user ID: ' + userId,
        );
      }

      const user = await this.userService.findByIds([userId]);
      if (user.length === 0) {
        throw new BadRequestException(
          'Request contains invalid user ID: ' + userId,
        );
      }
    }

    if (projectId?.length) {
      if (!Types.ObjectId.isValid(projectId)) {
        throw new BadRequestException(
          'Request contains invalid project ID: ' + projectId,
        );
      }
      const project = await this.projectService.findOne(projectId);
      if (!project) {
        throw new BadRequestException(
          'Request contains invalid project ID: ' + projectId,
        );
      }
    }
  }
}
