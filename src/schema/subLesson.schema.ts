import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SubLessonDocument = SubLesson & Document;

@Schema()
export class SubLesson {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Lesson', required: true })
  lessonId: string;
}

export const SubLessonSchema = SchemaFactory.createForClass(SubLesson);
