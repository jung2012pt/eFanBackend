import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Answer, AnswerDocument } from '../../schema/quiz/answer.schema';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
  ) {}

  async create(dto: CreateAnswerDto): Promise<Answer> {
    const createdAnswer = new this.answerModel(dto);
    return createdAnswer.save();
  }

  async findAll(): Promise<Answer[]> {
    return this.answerModel
      .find()
      .populate('question_id correct_choice_id')
      .exec();
  }

  async findOne(id: string): Promise<Answer> {
    const answer = await this.answerModel
      .findById(id)
      .populate('question_id correct_choice_id')
      .exec();
    if (!answer) throw new NotFoundException(`Answer #${id} not found`);
    return answer;
  }

  async update(id: string, dto: UpdateAnswerDto): Promise<Answer> {
    const updated = await this.answerModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Answer #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.answerModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Answer #${id} not found`);
    return { message: 'Deleted successfully' };
  }
}
