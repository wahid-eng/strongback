import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsString()
  deadline: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  project: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  user: string;
}
