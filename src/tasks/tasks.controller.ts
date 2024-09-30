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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MongoObjectIdPipe } from 'src/shared/pipes/mongo-object-id.pipe';
import { UpdateTaskDto } from './dtos/update-task.dto';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Post()
  async create(@Body() createProjectDto: CreateTaskDto) {
    return this.taskService.create(createProjectDto);
  }

  @Get(':id')
  async findOne(@Param('id', new MongoObjectIdPipe()) id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new MongoObjectIdPipe()) id: string,
    @Body() updateProjectDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateProjectDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', new MongoObjectIdPipe()) id: string) {
    return this.taskService.delete(id);
  }
}
