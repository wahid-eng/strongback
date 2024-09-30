import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'Task' })
  tasks: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  users: Types.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
