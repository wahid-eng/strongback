import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CommentDto } from './dtos/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async create(commentDto: CommentDto, user: string): Promise<Comment> {
    const { body } = commentDto;

    const comment = new this.commentModel({ body, user });
    return comment.save();
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentModel.findById(id).exec();
    if (!comment) {
      throw new BadRequestException(`Comment with ID ${id} not found.`);
    }
    return comment;
  }

  async update(id: string, commentDto: CommentDto): Promise<Comment> {
    const { body } = commentDto;
    const comment = await this.commentModel
      .findByIdAndUpdate(id, { body }, { new: true, runValidators: true })
      .exec();
    if (!comment) {
      throw new BadRequestException(`Comment with ID ${id} not found.`);
    }
    return comment;
  }

  async delete(id: string): Promise<any> {
    const comment = await this.commentModel.findByIdAndDelete(id).exec();
    if (!comment) {
      throw new BadRequestException(`Comment with ID ${id} not found.`);
    }
    return comment;
  }
}
