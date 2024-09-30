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

export class UpdateTaskDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TaskStatus)
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  deadline: Date;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  project: string;
}
