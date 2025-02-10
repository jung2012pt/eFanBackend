// lesson.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Course } from '../schema/course.schema';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true }) // Reference Course
  courseId: Types.ObjectId;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
