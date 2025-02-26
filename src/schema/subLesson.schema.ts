import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type SubLessonDocument = SubLesson & Document;

@Schema()
export class SubLesson {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Lesson', required: true })
  lessonId: Types.ObjectId;

  @Prop()
  reactComponent: string;
}

export const SubLessonSchema = SchemaFactory.createForClass(SubLesson);
