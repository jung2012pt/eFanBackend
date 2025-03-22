import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Question, QuestionSchema } from '../../schema/quiz/question.schema';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
