import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubLesson, SubLessonSchema } from '../schema/subLesson.schema';
import { SubLessonService } from './sublesson.service';
import { SubLessonController } from './sublesson.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: SubLesson.name, schema: SubLessonSchema }])],
  providers: [SubLessonService],
  controllers: [SubLessonController],
})
export class SubLessonModule {}
