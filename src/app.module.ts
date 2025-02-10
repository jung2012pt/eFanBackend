// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { CourseModule } from './course/course.module';
@Module({
  imports: [
    // Adjust the connection string as needed
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    CourseModule,
    CatsModule,
  ],
})
export class AppModule {}
