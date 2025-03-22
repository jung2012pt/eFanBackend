import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  QuestionSet,
  QuestionSetDocument,
} from '../../schema/quiz/questionSet.schema';
import { CreateQuestionSetDto } from './dto/create-questionSet.dto';
import { UpdateQuestionSetDto } from './dto/update-questionSet.dto';

@Injectable()
export class QuestionSetService {
  constructor(
    @InjectModel(QuestionSet.name)
    private questionSetModel: Model<QuestionSetDocument>,
  ) {}

  async create(dto: CreateQuestionSetDto): Promise<QuestionSet> {
    return new this.questionSetModel(dto).save();
  }

  async findAll(): Promise<QuestionSet[]> {
    return this.questionSetModel.find().exec();
  }

  async findOne(id: string): Promise<QuestionSet> {
    const found = await this.questionSetModel.findById(id).exec();
    if (!found) throw new NotFoundException(`QuestionSet #${id} not found`);
    return found;
  }

  async update(id: string, dto: UpdateQuestionSetDto): Promise<QuestionSet> {
    const updated = await this.questionSetModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`QuestionSet #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.questionSetModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`QuestionSet #${id} not found`);
    return { message: 'Deleted successfully' };
  }
}
