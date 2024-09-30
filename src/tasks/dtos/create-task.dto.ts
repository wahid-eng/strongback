import {
  IsEnum,
  IsMongoId,
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
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ enum: TaskStatus })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  deadline: Date;

  @ApiProperty()
  @IsMongoId()
  project: string;
}
