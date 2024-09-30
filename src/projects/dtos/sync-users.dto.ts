import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class SyncUsersDto {
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @IsNotEmpty({ each: true })
  users: string[];
}
