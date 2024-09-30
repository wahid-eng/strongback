import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id/projects')
  async getProjects(@Param('id') id: string) {
    return this.userService.getProjectsByUserId(id);
  }

  @Get(':id/tasks')
  async getTasks(@Param('id') id: string) {
    return this.userService.getTasksByUserId(id);
  }
}
