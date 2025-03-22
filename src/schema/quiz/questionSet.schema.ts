import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionSetDocument = QuestionSet & Document;

@Schema()
export class QuestionSet {

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const QuestionSetSchema = SchemaFactory.createForClass(QuestionSet);
