import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionSetDto } from './create-questionSet.dto';

export class UpdateQuestionSetDto extends PartialType(CreateQuestionSetDto) {}
