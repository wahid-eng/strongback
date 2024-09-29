import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  body: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
