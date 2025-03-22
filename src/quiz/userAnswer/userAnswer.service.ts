import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  UserAnswer,
  UserAnswerDocument,
} from '../../schema/quiz/userAnswer.schema';
import { CreateUserAnswerDto } from './dto/create-userAnswer.dto';
import { UpdateUserAnswerDto } from './dto/update-userAnswer.dto';

@Injectable()
export class UserAnswerService {
  constructor(
    @InjectModel(UserAnswer.name)
    private userAnswerModel: Model<UserAnswerDocument>,
  ) {}

  async create(dto: CreateUserAnswerDto): Promise<UserAnswer> {
    const created = new this.userAnswerModel(dto);
    return created.save();
  }

  async findAll(): Promise<UserAnswer[]> {
    return this.userAnswerModel
      .find()
      .populate('user_answer_set_id question_id chosen_choice_id')
      .exec();
  }

  async findOne(id: string): Promise<UserAnswer> {
    const found = await this.userAnswerModel
      .findById(id)
      .populate('user_answer_set_id question_id chosen_choice_id')
      .exec();
    if (!found) throw new NotFoundException(`UserAnswer #${id} not found`);
    return found;
  }

  async update(id: string, dto: UpdateUserAnswerDto): Promise<UserAnswer> {
    const updated = await this.userAnswerModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`UserAnswer #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.userAnswerModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`UserAnswer #${id} not found`);
    return { message: 'Deleted successfully' };
  }
}
