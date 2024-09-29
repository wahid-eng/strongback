import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Comment } from './schemas/comment.schema';
import { CommentDto } from './dtos/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private readonly userService: UsersService,
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
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Comment ID is invalid.');
    }

    const comment = await this.commentModel.findById(id).exec();
    if (!comment) {
      throw new BadRequestException(`Comment with ID ${id} not found.`);
    }

    return comment;
  }

  async update(id: string, commentDto: CommentDto): Promise<Comment> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Comment ID is invalid');
    }

    const comment = await this.commentModel.findById(id).exec();
    if (!comment) {
      throw new BadRequestException(`Comment with ID ${id} not found.`);
    }

    const { body } = commentDto;

    const updatedComment = await this.commentModel
      .findByIdAndUpdate(
        id,
        { body },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();
    return updatedComment;
  }

  async delete(id: string): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Comment ID is invalid');
    }

    const comment = await this.commentModel.findById(id).exec();
    if (!comment) {
      throw new BadRequestException(`Comment with ID ${id} not found.`);
    }

    return comment.deleteOne();
  }
}
