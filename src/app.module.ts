// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { SubLessonModule } from './sublesson/sublesson.module';
@Module({
  imports: [
    // Adjust the connection string as needed
    MongooseModule.forRoot('mongodb+srv://jung2012:eFanimation@efandatabase.ccpdb.mongodb.net/eFanAlldata?retryWrites=true&w=majority&appName=eFanDatabase'),
    CourseModule,
    CatsModule,
    LessonModule,
    SubLessonModule,
  ],
})
export class AppModule {}
