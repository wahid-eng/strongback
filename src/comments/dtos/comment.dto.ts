import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  body: string;
}
