import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  body: string;
}
