import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  UserAnswer,
  UserAnswerSchema,
} from '../../schema/quiz/userAnswer.schema';
import { UserAnswerService } from './userAnswer.service';
import { UserAnswerController } from './userAnswer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAnswer.name, schema: UserAnswerSchema },
    ]),
  ],
  providers: [UserAnswerService],
  controllers: [UserAnswerController],
  exports: [UserAnswerService],
})
export class UserAnswerModule {}
