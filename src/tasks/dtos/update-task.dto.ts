import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from 'src/shared/interfaces/task-status.interface';

export class UpdateTaskDto {
  @IsOptional()
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

  @IsOptional()
  @IsString()
  project: string;

  @IsOptional()
  @IsString()
  user: string;
}
