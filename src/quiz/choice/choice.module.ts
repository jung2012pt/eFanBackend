import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Choice, ChoiceSchema } from '../../schema/quiz/choice.schema';
import { ChoiceService } from './choice.service';
import { ChoiceController } from './choice.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Choice.name, schema: ChoiceSchema }]),
  ],
  controllers: [ChoiceController],
  providers: [ChoiceService],
  exports: [ChoiceService],
})
export class ChoiceModule {}
