import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { User } from 'src/users/schemas/user.schema';
import { SyncUsersDto } from './dtos/sync-users.dto';
import { Task } from 'src/tasks/schemas/task.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, description } = createProjectDto;

    const project = new this.projectModel({
      name,
      description,
    });

    project.save();

    return project;
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new BadRequestException(`Project with ID ${id} not found.`);
    }
    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const { name, description } = updateProjectDto;
    const project = await this.projectModel
      .findByIdAndUpdate(
        id,
        { name, description },
        { new: true, runValidators: true },
      )
      .exec();

    if (!project) {
      throw new BadRequestException(`Project with ID ${id} not found.`);
    }
    return project;
  }

  async delete(id: string): Promise<any> {
    const project = await this.projectModel.findByIdAndDelete(id).exec();
    if (!project) {
      throw new BadRequestException(`Project with ID ${id} not found.`);
    }
    await this.userModel
      .updateMany(
        { _id: { $in: project.users } },
        { $pull: { projects: project._id } },
        { runValidators: true },
      )
      .exec();

    const response = await this.taskModel.findOne({ project: project._id });

    console.log(response);
    return project;
  }

  async getUsersByProjectId(id: string) {
    const response = await this.projectModel
      .findById(id)
      .select('-_id users')
      .populate({ path: 'users', select: '-projects -password' })
      .exec();
    return response.users;
  }

  async assignUsers(
    projectId: string,
    syncUsersDto: SyncUsersDto,
  ): Promise<any> {
    const { users } = syncUsersDto;
    const project = await this.projectModel
      .findByIdAndUpdate(
        projectId,
        { $addToSet: { users: { $each: users } } },
        { new: true, runValidators: true },
      )
      .exec();
    if (!project) {
      throw new BadRequestException(`Project with ID ${projectId} not found.`);
    }

    await this.userModel
      .updateMany(
        { _id: { $in: users } },
        { $addToSet: { projects: projectId } },
        { runValidators: true },
      )
      .exec();

    return project;
  }

  async unassignUsers(
    projectId: string,
    syncUsersDto: SyncUsersDto,
  ): Promise<any> {
    const { users } = syncUsersDto;
    const project = await this.projectModel
      .findByIdAndUpdate(
        projectId,
        { $pull: { users: { $in: users } } },
        { new: true, runValidators: true },
      )
      .exec();
    if (!project) {
      throw new BadRequestException(`Project with ID ${projectId} not found.`);
    }

    await this.userModel
      .updateMany(
        { _id: { $in: users } },
        { $pull: { projects: projectId } },
        { runValidators: true },
      )
      .exec();

    return project;
  }
}
