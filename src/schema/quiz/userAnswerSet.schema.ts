import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type UserAnswerSetDocument = UserAnswerSet & Document;

@Schema()
export class UserAnswerSet {
  @Prop()
  score: number;

  @Prop()
  name: string;

  @Prop()
  student_id: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'QuestionSet',
    required: true,
  })
  set_id: Types.ObjectId;
}

export const UserAnswerSetSchema = SchemaFactory.createForClass(UserAnswerSet);
