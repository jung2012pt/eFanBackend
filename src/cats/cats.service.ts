// src/cats/cats.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  // Create a new cat
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  // Retrieve all cats
  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  // Retrieve a single cat by ID
  async findOne(id: string): Promise<Cat> {
    const cat = await this.catModel.findById(id).exec();
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return cat;
  }

  // Update a cat by ID
  async update(id: string, updateCatDto: Partial<CreateCatDto>): Promise<Cat> {
    const updatedCat = await this.catModel
      .findByIdAndUpdate(id, updateCatDto, { new: true })
      .exec();
    if (!updatedCat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return updatedCat;
  }

  // Remove a cat by ID
  async remove(id: string): Promise<Cat> {
    const deletedCat = await this.catModel.findByIdAndDelete(id).exec();
    if (!deletedCat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return deletedCat;
  }
}
