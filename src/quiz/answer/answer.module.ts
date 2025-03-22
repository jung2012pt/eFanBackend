import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Answer, AnswerSchema } from '../../schema/quiz/answer.schema';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
  ],
  providers: [AnswerService],
  controllers: [AnswerController],
  exports: [AnswerService],
})
export class AnswerModule {}
