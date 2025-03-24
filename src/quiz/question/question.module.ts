import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Question, QuestionSchema } from '../../schema/quiz/question.schema';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Choice, ChoiceSchema } from '../../schema/quiz/choice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Choice.name, schema: ChoiceSchema },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
