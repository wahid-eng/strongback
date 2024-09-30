import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CommentDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  body: string;
}
