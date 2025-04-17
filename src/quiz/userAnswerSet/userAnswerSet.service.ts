import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  UserAnswerSet,
  UserAnswerSetDocument,
} from '../../schema/quiz/userAnswerSet.schema';
import { CreateUserAnswerSetDto } from './dto/create-userAnswerSet.dto';
import { UpdateUserAnswerSetDto } from './dto/update-userAnswerSet.dto';
import { log } from 'console';
import { Answer, AnswerDocument } from 'src/schema/quiz/answer.schema';
import { UserAnswer, UserAnswerDocument } from 'src/schema/quiz/userAnswer.schema';

@Injectable()
export class UserAnswerSetService {
  constructor(
    @InjectModel(UserAnswerSet.name)
    private userAnswerSetModel: Model<UserAnswerSetDocument>,
    @InjectModel(Answer.name)
    private answerModel: Model<AnswerDocument>,
    @InjectModel(UserAnswer.name)
    private userAnswerModel: Model<UserAnswerDocument>,
  ) {}

  async create(dto: CreateUserAnswerSetDto): Promise<UserAnswerSet> {
    const createdSet = new this.userAnswerSetModel(dto);
    return createdSet.save();
  }

  async summit(dto: CreateUserAnswerSetDto): Promise<any> {
    console.log('summit(service)', dto);

    const { name, student_id, set_id, answers } = dto;
    let score = 0;
    const total = Object.keys(answers).length;

    // 1. Create the UserAnswerSet record (initially with score: 0)
    const createdSet = await this.userAnswerSetModel.create({
      name,
      student_id,
      set_id,
      score: 0, // temporary
    });

    // 2. Loop through all answers
    for (const questionId of Object.keys(answers)) {
      const userAnswer = answers[questionId];

      const question = await this.answerModel.findOne({
        question_id: questionId,
      });

      if (!question) {
        console.warn(`Question not found: ${questionId}`);
        continue;
      }

      const { correct_choice_id, correct_text } = question;

      let isCorrect = false;

      if (correct_choice_id) {
        if (userAnswer === correct_choice_id) {
          isCorrect = true;
          score++;
        }
      } else if (Array.isArray(userAnswer) && Array.isArray(correct_text)) {
        const isMatch =
          userAnswer.length === correct_text.length &&
          userAnswer.every((ans, i) => ans === correct_text[i]);

        if (isMatch) {
          isCorrect = true;
          score++;
        }
      }

      // 3. Save each answer to the UserAnswer table
      await this.userAnswerModel.create({
        question_id: questionId,
        user_answer_set_id: createdSet._id,
        chosen_choice_id:
          typeof userAnswer === 'string' ? userAnswer : undefined,
        chosen_text: Array.isArray(userAnswer) ? userAnswer : undefined,
      });
    }

    // 4. Update score on the UserAnswerSet
    createdSet.score = score;
    await createdSet.save();

    return {
      status: 'success',
      score,
      total,
    };
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
