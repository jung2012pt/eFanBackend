import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from '../schema/lesson.schema';
import { CreateLessonDto } from '../lesson/dto/create-lesson.dto';
import { UpdateLessonDto } from '../lesson/dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>) {}

  // Create Lesson
  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const newLesson = new this.lessonModel(createLessonDto);
    return newLesson.save();
  }

  // Get All Lessons
  async findAll(): Promise<Lesson[]> {
    return this.lessonModel.find().exec();
  }

  // Get All Lessons from a specific course
  async findAllByCourse(courseId: string): Promise<Lesson[]> {
    return this.lessonModel.find({ courseId }).exec();
  }

  // Get Lesson by ID
  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id).exec();
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  // Update Lesson by ID
  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const updatedLesson = await this.lessonModel.findByIdAndUpdate(id, updateLessonDto, {
      new: true,
      runValidators: true,
    }).exec();
    
    if (!updatedLesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return updatedLesson;
  }

  // Delete Lesson by ID
  async remove(id: string): Promise<{ message: string }> {
    const deletedLesson = await this.lessonModel.findByIdAndDelete(id).exec();
    if (!deletedLesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return { message: 'Lesson deleted successfully' };
  }
}
