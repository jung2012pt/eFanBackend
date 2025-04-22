import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserAnswerSetService } from './userAnswerSet.service';
import { CreateUserAnswerSetDto } from './dto/create-userAnswerSet.dto';
import { UpdateUserAnswerSetDto } from './dto/update-userAnswerSet.dto';

@Controller('user-answer-sets')
export class UserAnswerSetController {
  constructor(private readonly userAnswerSetService: UserAnswerSetService) {}

  @Post()
  create(@Body() dto: CreateUserAnswerSetDto) {
    return this.userAnswerSetService.create(dto);
  }
  @Post('/summit')
  summit(@Body() dto: CreateUserAnswerSetDto) {
    return this.userAnswerSetService.summit(dto);
  }
  // @Get('set/:setID')
  // findAllBySetID(@Param('setID') setID: string) {
  //   return this.userAnswerSetService.findAllBySetID(setID);
  // }
  @Get()
  findAll() {
    return this.userAnswerSetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAnswerSetService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserAnswerSetDto) {
    return this.userAnswerSetService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAnswerSetService.remove(id);
  }
}
