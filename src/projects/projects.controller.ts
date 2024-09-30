import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SyncUsersDto } from './dtos/sync-users.dto';
import { MongoObjectIdPipe } from 'src/shared/pipes/mongo-object-id.pipe';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  async findAll() {
    return this.projectService.findAll();
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get(':id')
  async findOne(@Param('id', new MongoObjectIdPipe()) id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new MongoObjectIdPipe()) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', new MongoObjectIdPipe()) id: string) {
    return this.projectService.delete(id);
  }

  @Patch(':id/assign-users')
  async assignTo(
    @Param('id', new MongoObjectIdPipe()) id: string,
    @Body() syncUsersDto: SyncUsersDto,
  ) {
    return this.projectService.assignUsers(id, syncUsersDto);
  }

  @Patch(':id/unassign-users')
  async unassignFrom(
    @Param('id', new MongoObjectIdPipe()) id: string,
    @Body() syncUsersDto: SyncUsersDto,
  ) {
    return this.projectService.unassignUsers(id, syncUsersDto);
  }

  @Get(':id/users')
  async getUsersByProjectId(@Param('id', new MongoObjectIdPipe()) id: string) {
    return this.projectService.getUsersByProjectId(id);
  }
}
