import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SubLessonService } from './sublesson.service';
import { CreateSubLessonDto } from './dto/create-sublesson.dto';
import { UpdateSubLessonDto } from './dto/update-sublesson.dto';

@Controller('sublessons')
export class SubLessonController {
  constructor(private readonly subLessonService: SubLessonService) {}

  @Post()
  create(@Body() createSubLessonDto: CreateSubLessonDto) {
    return this.subLessonService.create(createSubLessonDto);
  }

  @Get()
  findAll() {
    return this.subLessonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subLessonService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubLessonDto: UpdateSubLessonDto) {
    return this.subLessonService.update(id, updateSubLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subLessonService.remove(id);
  }
}
