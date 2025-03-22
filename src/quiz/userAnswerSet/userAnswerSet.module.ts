import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  UserAnswerSet,
  UserAnswerSetSchema,
} from '../../schema/quiz/userAnswerSet.schema';
import { UserAnswerSetService } from './userAnswerSet.service';
import { UserAnswerSetController } from './userAnswerSet.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAnswerSet.name, schema: UserAnswerSetSchema },
    ]),
  ],
  providers: [UserAnswerSetService],
  controllers: [UserAnswerSetController],
  exports: [UserAnswerSetService],
})
export class UserAnswerSetModule {}
