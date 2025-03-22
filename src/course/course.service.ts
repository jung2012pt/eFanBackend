import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from '../schema/course.schema'
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Lesson,LessonDocument } from 'src/schema/lesson.schema';
// import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,) {}
  
  // Create Course
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const newCourse = new this.courseModel(createCourseDto);
    return newCourse.save();
  }
  async findAll(): Promise<Course[]> {
    return (
      this.courseModel
        .find()
        .sort({ _id: 1 })
        // .populate({
        //   path: 'lessons', // Populate lessons for each course
        //   populate: { path: 'subLessons' } // Populate sub-lessons inside each lesson
        // })
        .exec()
    );
  }
  
  // Get All Courses
  async findOne(id: string): Promise<Course > {
    const course = await this.courseModel
      .findById(id)
      .populate('lessons')
      .lean() // Converts to plain object
      .exec();

      

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course ; // Type assertion
  }



  // Update Course by ID
  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const updatedCourse = await this.courseModel.findByIdAndUpdate(id, updateCourseDto, {
      new: true, // Return updated document
      runValidators: true, // Validate before update
    }).exec();
    
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updatedCourse;
  }

  // Delete Course by ID
  async remove(id: string): Promise<{ message: string }> {
    const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec();
    if (!deletedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return { message: 'Course deleted successfully' };
  }
}
