import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  cssFileName: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.virtual('lessons', {
  ref: 'Lesson', // Matches the Lesson model name
  localField: '_id',
  foreignField: 'courseId',
});