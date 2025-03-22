import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAnswerDto } from './create-userAnswer.dto';

export class UpdateUserAnswerDto extends PartialType(CreateUserAnswerDto) {}
