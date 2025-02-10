import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from '../schema/course.schema'
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Lesson } from 'src/schema/lesson.schema';
// import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  @InjectModel(Lesson.name) private lessonModel: Model<Lesson>,) {}
  
  // Create Course
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const newCourse = new this.courseModel(createCourseDto);
    return newCourse.save();
  }

  // Get All Courses
  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  // Get Course by ID
  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel
      .findById(id)
      .populate('lessons') // Populate the lessons field
      .exec();
    console.log(id);
    console.log(course);
 
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
   // Find all lessons related to this course
   // Convert `id` to ObjectId before querying
   const lessons = await this.lessonModel.find({ courseId: new Types.ObjectId(id) }).exec();

 console.log(lessons);
 
  return course; // Merge course data with lessons
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
