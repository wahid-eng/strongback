import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly userService: UsersService,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, description, users } = createProjectDto;

    if (users?.length) {
      await this.validateUserExistace(users);
    }

    const project = new this.projectModel({
      name,
      description,
      users,
    });

    await project.save();
    return project;
  }

  async findOne(id: string): Promise<Project> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Project ID is invalid.');
    }

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
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Project ID is invalid');
    }

    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new BadRequestException(`Project with ID ${id} not found.`);
    }

    const { name, description, users } = updateProjectDto;

    if (users?.length) {
      await this.validateUserExistace(users);
    }

    const updatedProject = await this.projectModel
      .findByIdAndUpdate(
        id,
        { name, description, users },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();
    return updatedProject;
  }

  async delete(id: string): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Project ID is invalid');
    }

    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new BadRequestException(`Project with ID ${id} not found.`);
    }

    return project.deleteOne();
  }

  async validateUserExistace(users: string[]): Promise<any> {
    const invalidIds = users.filter(
      (userId) => !Types.ObjectId.isValid(userId),
    );
    if (invalidIds.length) {
      throw new BadRequestException(
        'Request contains invalid user IDs: ' + invalidIds.join(', '),
      );
    }

    const existingUsers = await this.userService.findByIds(users);
    const existingUserIds = existingUsers.map((user) => user._id.toString());

    const nonExistingIds = users.filter(
      (userId) => !existingUserIds.includes(userId),
    );

    if (nonExistingIds.length) {
      throw new BadRequestException(
        `Users with IDs not found: ${nonExistingIds.join(', ')}`,
      );
    }
  }
}
