import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({
    type: MongooseSchema.Types.String,
    ref: 'QuestionSet',
    required: true,
  })
  set_id: string;

  @Prop({ required: true })
  question_text: string;

  @Prop({ required: true })
  question_title: string;

  @Prop({ required: true })
  question_number: number;

  @Prop({ required: true })
  question_type: string;
}


export const QuestionSchema = SchemaFactory.createForClass(Question);
