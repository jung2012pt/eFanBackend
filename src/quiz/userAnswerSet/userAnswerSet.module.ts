import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  UserAnswerSet,
  UserAnswerSetSchema,
} from '../../schema/quiz/userAnswerSet.schema';
import { UserAnswerSetService } from './userAnswerSet.service';
import { UserAnswerSetController } from './userAnswerSet.controller';
import { Answer, AnswerSchema } from 'src/schema/quiz/answer.schema';
import { UserAnswer, UserAnswerSchema } from 'src/schema/quiz/userAnswer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAnswerSet.name, schema: UserAnswerSetSchema },
      { name: Answer.name, schema: AnswerSchema },
      { name: UserAnswer.name, schema: UserAnswerSchema },
    ]),
  ],
  providers: [UserAnswerSetService],
  controllers: [UserAnswerSetController],
  exports: [UserAnswerSetService],
})
export class UserAnswerSetModule {}
