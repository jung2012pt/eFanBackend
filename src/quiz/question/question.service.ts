import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question, QuestionDocument } from '../../schema/quiz/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async create(dto: CreateQuestionDto): Promise<Question> {
    return new this.questionModel(dto).save();
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().populate('set_id').exec();
  }

  async findOne(id: string): Promise<Question> {
    const found = await this.questionModel
      .findById(id)
      .populate('set_id')
      .exec();
    if (!found) throw new NotFoundException(`Question #${id} not found`);
    return found;
  }

  async update(id: string, dto: UpdateQuestionDto): Promise<Question> {
    const updated = await this.questionModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Question #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.questionModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Question #${id} not found`);
    return { message: 'Deleted successfully' };
  }
}
