import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserAnswerSetDocument = UserAnswerSet & Document;

@Schema()
export class UserAnswerSet {
  

  @Prop({
    type: MongooseSchema.Types.String,
    ref: 'QuestionSet',
    required: true,
  })
  set_id: string;

  @Prop()
  score: number;

  @Prop()
  name: string;

  @Prop()
  student_id: string;
}

export const UserAnswerSetSchema = SchemaFactory.createForClass(UserAnswerSet);
