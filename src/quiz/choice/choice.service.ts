import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Choice, ChoiceDocument } from '../../schema/quiz/choice.schema';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';

@Injectable()
export class ChoiceService {
  constructor(
    @InjectModel(Choice.name) private choiceModel: Model<ChoiceDocument>,
  ) {}

  async create(dto: CreateChoiceDto): Promise<Choice> {
    return new this.choiceModel(dto).save();
  }

  async findAll(): Promise<Choice[]> {
    return this.choiceModel.find().populate('question_id').exec();
  }

  async findOne(id: string): Promise<Choice> {
    const found = await this.choiceModel
      .findById(id)
      .populate('question_id')
      .exec();
    if (!found) throw new NotFoundException(`Choice #${id} not found`);
    return found;
  }

  async update(id: string, dto: UpdateChoiceDto): Promise<Choice> {
    const updated = await this.choiceModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Choice #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.choiceModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Choice #${id} not found`);
    return { message: 'Deleted successfully' };
  }
}
