import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ChoiceDocument = Choice & Document;

@Schema()
export class Choice {


  @Prop({ type: MongooseSchema.Types.String, ref: 'Question', required: true })
  question_id: string;

  @Prop({ required: true })
  choice_text: string;
}

export const ChoiceSchema = SchemaFactory.createForClass(Choice);
