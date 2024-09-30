import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    forwardRef(() => ProjectsModule),
    forwardRef(() => TasksModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
