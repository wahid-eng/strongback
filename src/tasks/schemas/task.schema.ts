import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from 'src/projects/schemas/project.schema';
import { TaskStatus } from 'src/shared/interfaces/task-status.interface';
import { User } from 'src/users/schemas/user.schema';

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
