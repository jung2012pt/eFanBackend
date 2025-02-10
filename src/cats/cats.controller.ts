// src/cats/cats.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // POST /cats - Create a new cat
  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  // GET /cats - Retrieve all cats
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // GET /cats/:id - Retrieve a cat by its ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  // PUT /cats/:id - Update a cat by its ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCatDto: Partial<CreateCatDto>,
  ): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  // DELETE /cats/:id - Delete a cat by its ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Cat> {
    return this.catsService.remove(id);
  }
}
