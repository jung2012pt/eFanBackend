import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Import Modules
import { QuestionSetModule } from './questionSet/questionSet.module';
import { QuestionModule } from './question/question.module';
import { ChoiceModule } from './choice/choice.module';
import { AnswerModule } from './answer/answer.module';
import { UserAnswerSetModule } from './userAnswerSet/userAnswerSet.module';
import { UserAnswerModule } from './userAnswer/userAnswer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/quizdb'), // 👈 เปลี่ยน URL ตาม MongoDB ของคุณ
    QuestionSetModule,
    QuestionModule,
    ChoiceModule,
    AnswerModule,
    UserAnswerSetModule,
    UserAnswerModule,
  ],
  controllers: [],
  providers: [],
})
export class QuizModule {}
