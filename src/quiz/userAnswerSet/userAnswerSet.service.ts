import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  UserAnswerSet,
  UserAnswerSetDocument,
} from '../../schema/quiz/userAnswerSet.schema';
import { CreateUserAnswerSetDto } from './dto/create-userAnswerSet.dto';
import { UpdateUserAnswerSetDto } from './dto/update-userAnswerSet.dto';

@Injectable()
export class UserAnswerSetService {
  constructor(
    @InjectModel(UserAnswerSet.name)
    private userAnswerSetModel: Model<UserAnswerSetDocument>,
  ) {}

  async create(dto: CreateUserAnswerSetDto): Promise<UserAnswerSet> {
    const createdSet = new this.userAnswerSetModel(dto);
    return createdSet.save();
  }

  async findAll(): Promise<UserAnswerSet[]> {
    return this.userAnswerSetModel.find().populate('set_id').exec();
  }

  async findOne(id: string): Promise<UserAnswerSet> {
    const set = await this.userAnswerSetModel
      .findById(id)
      .populate('set_id')
      .exec();
    if (!set) throw new NotFoundException(`UserAnswerSet #${id} not found`);
    return set;
  }

  async update(
    id: string,
    dto: UpdateUserAnswerSetDto,
  ): Promise<UserAnswerSet> {
    const updated = await this.userAnswerSetModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`UserAnswerSet #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.userAnswerSetModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`UserAnswerSet #${id} not found`);
    return { message: 'Deleted successfully' };
  }
}
