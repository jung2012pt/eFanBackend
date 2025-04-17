import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserAnswerDocument = UserAnswer & Document;

@Schema()
export class UserAnswer {
  @Prop({ type: MongooseSchema.Types.String, ref: 'Question', required: true })
  question_id: string;

  @Prop({
    type: MongooseSchema.Types.String,
    ref: 'UserAnswerSet',
    required: true,
  })
  user_answer_set_id: string;

  @Prop({ type: MongooseSchema.Types.String, ref: 'Choice', required: false })
  chosen_choice_id: string;

  @Prop({ required: false })
  chosen_text: [string];
}

export const UserAnswerSchema = SchemaFactory.createForClass(UserAnswer);
