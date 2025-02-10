// course.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  lessonAmount: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// Virtual field to populate lessons
CourseSchema.virtual('lessons', {
  ref: 'Lesson', // Reference to the Lesson model
  localField: '_id', // Course ID
  foreignField: 'courseId', // Lesson references Course using courseId
});
