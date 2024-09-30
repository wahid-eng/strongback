import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dtos/comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MongoObjectIdPipe } from 'src/shared/pipes/mongo-object-id.pipe';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}
  @Get()
  async findAll() {
    return this.commentService.findAll();
  }

  @Post()
  async create(@Body() commentDto: CommentDto, @Req() req) {
    return this.commentService.create(commentDto, req.user._id);
  }

  @Get(':id')
  async findOne(@Param('id', new MongoObjectIdPipe()) id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new MongoObjectIdPipe()) id: string,
    @Body() commentDto: CommentDto,
  ) {
    return this.commentService.update(id, commentDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', new MongoObjectIdPipe()) id: string) {
    return this.commentService.delete(id);
  }
}
