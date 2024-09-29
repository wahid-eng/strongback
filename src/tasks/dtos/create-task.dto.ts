import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from 'src/shared/interfaces/task-status.interface';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  deadline: Date;

  @IsString()
  project: string;

  @IsString()
  user: string;
}
