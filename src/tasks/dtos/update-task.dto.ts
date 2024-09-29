import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TaskStatus)
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  deadline: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  project: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  user: string;
}
