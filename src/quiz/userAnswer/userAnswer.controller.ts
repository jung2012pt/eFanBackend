import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserAnswerService } from './userAnswer.service';
import { CreateUserAnswerDto } from './dto/create-userAnswer.dto';
import { UpdateUserAnswerDto } from './dto/update-userAnswer.dto';

@Controller('user-answers')
export class UserAnswerController {
  constructor(private readonly userAnswerService: UserAnswerService) {}

  @Post()
  create(@Body() dto: CreateUserAnswerDto) {
    return this.userAnswerService.create(dto);
  }

  @Get()
  findAll() {
    return this.userAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAnswerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserAnswerDto) {
    return this.userAnswerService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAnswerService.remove(id);
  }
}
