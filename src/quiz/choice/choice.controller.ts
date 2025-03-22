import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';

@Controller('choices')
export class ChoiceController {
  constructor(private readonly choiceService: ChoiceService) {}

  @Post()
  create(@Body() dto: CreateChoiceDto) {
    return this.choiceService.create(dto);
  }

  @Get()
  findAll() {
    return this.choiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.choiceService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChoiceDto) {
    return this.choiceService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.choiceService.remove(id);
  }
}
