import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  QuestionSet,
  QuestionSetSchema,
} from '../../schema/quiz/questionSet.schema';
import { QuestionSetService } from './questionSet.service';
import { QuestionSetController } from './questionSet.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionSet.name, schema: QuestionSetSchema },
    ]),
  ],
  controllers: [QuestionSetController],
  providers: [QuestionSetService],
  exports: [QuestionSetService],
})
export class QuestionSetModule {}
