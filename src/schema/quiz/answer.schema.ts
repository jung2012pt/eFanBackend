import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  

  @Prop({ type: MongooseSchema.Types.String, ref: 'Question', required: true })
  question_id: string;

  @Prop({ type: MongooseSchema.Types.String, ref: 'Choice', required: true })
  correct_choice_id: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
