import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { QuestionSetService } from './questionSet.service';
import { CreateQuestionSetDto } from './dto/create-questionSet.dto';
import { UpdateQuestionSetDto } from './dto/update-questionSet.dto';

@Controller('question-sets')
export class QuestionSetController {
  constructor(private readonly questionSetService: QuestionSetService) {}

  @Post()
  create(@Body() dto: CreateQuestionSetDto) {
    return this.questionSetService.create(dto);
  }

  @Get()
  findAll() {
    return this.questionSetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionSetService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQuestionSetDto) {
    return this.questionSetService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionSetService.remove(id);
  }
}
