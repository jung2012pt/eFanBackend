import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Course } from './course.schema';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
LessonSchema.virtual('sublessons', {
  ref: 'Sublesson', // Matches the Lesson model name
  localField: '_id',
  foreignField: 'lessonId',
});