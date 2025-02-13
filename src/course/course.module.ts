import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from '../schema/course.schema';
import { Lesson, LessonSchema } from 'src/schema/lesson.schema';
import { SubLesson, SubLessonSchema } from 'src/schema/subLesson.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema },{ name: Lesson.name, schema: LessonSchema },{ name: SubLesson.name, schema: SubLessonSchema }])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
