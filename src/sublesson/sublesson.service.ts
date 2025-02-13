import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubLesson, SubLessonDocument } from '../schema/subLesson.schema';
import { CreateSubLessonDto } from './dto/create-sublesson.dto';
import { UpdateSubLessonDto } from './dto/update-sublesson.dto';

@Injectable()
export class SubLessonService {
  constructor(@InjectModel(SubLesson.name) private subLessonModel: Model<SubLessonDocument>) {}

  // Create SubLesson
  async create(createSubLessonDto: CreateSubLessonDto): Promise<SubLesson> {
    const newSubLesson = new this.subLessonModel(createSubLessonDto);
    return newSubLesson.save();
  }

  // Get All SubLessons
  async findAll(): Promise<SubLesson[]> {
    return this.subLessonModel.find().exec();
  }

  // Get SubLesson by ID
  async findOne(id: string): Promise<SubLesson> {
    const subLesson = await this.subLessonModel.findById(id).exec();
    if (!subLesson) {
      throw new NotFoundException(`SubLesson with ID ${id} not found`);
    }
    return subLesson;
  }

  // Update SubLesson by ID
  async update(id: string, updateSubLessonDto: UpdateSubLessonDto): Promise<SubLesson> {
    const updatedSubLesson = await this.subLessonModel.findByIdAndUpdate(id, updateSubLessonDto, {
      new: true,
      runValidators: true,
    }).exec();
    
    if (!updatedSubLesson) {
      throw new NotFoundException(`SubLesson with ID ${id} not found`);
    }
    return updatedSubLesson;
  }

  // Delete SubLesson by ID
  async remove(id: string): Promise<{ message: string }> {
    const deletedSubLesson = await this.subLessonModel.findByIdAndDelete(id).exec();
    if (!deletedSubLesson) {
      throw new NotFoundException(`SubLesson with ID ${id} not found`);
    }
    return { message: 'SubLesson deleted successfully' };
  }
}
