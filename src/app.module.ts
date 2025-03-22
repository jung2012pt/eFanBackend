// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { SubLessonModule } from './sublesson/sublesson.module';
import { QuestionSetModule } from './quiz/questionSet/questionSet.module';
import { QuestionModule } from './quiz/question/question.module';
import { ChoiceModule } from './quiz/choice/choice.module';
import { AnswerModule } from './quiz/answer/answer.module';
import { UserAnswerSetModule } from './quiz/userAnswerSet/userAnswerSet.module';
import { UserAnswerModule } from './quiz/userAnswer/userAnswer.module';
@Module({
  imports: [
    // Adjust the connection string as needed
    MongooseModule.forRoot(
      'mongodb+srv://jung2012:eFanimation@efandatabase.ccpdb.mongodb.net/eFanAlldata?retryWrites=true&w=majority&appName=eFanDatabase',
    ),
    CourseModule,

    LessonModule,
    SubLessonModule,
    QuestionSetModule,
    QuestionModule,
    ChoiceModule,
    AnswerModule,
    UserAnswerSetModule,
    UserAnswerModule,
  ],
})
export class AppModule {}
