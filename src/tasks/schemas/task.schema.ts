import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from 'src/projects/schemas/project.schema';
import { User } from 'src/users/schemas/user.schema';

export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_VERIFICATION = 'IN_VERIFICATION',
  COMPLETED = 'COMPLETED',
}

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ enum: TaskStatus, default: TaskStatus.BACKLOG })
  status: string;

  @Prop()
  deadline: Date;

  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  project: Project;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
