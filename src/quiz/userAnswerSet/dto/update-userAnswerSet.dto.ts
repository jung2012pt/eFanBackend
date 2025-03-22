import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAnswerSetDto } from './create-userAnswerSet.dto';

export class UpdateUserAnswerSetDto extends PartialType(
  CreateUserAnswerSetDto,
) {}
