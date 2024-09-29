import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ enum: TaskStatus })
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
  @IsNotEmpty()
  @IsString()
  project: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user: string;
}
