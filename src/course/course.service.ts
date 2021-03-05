import { ResultException } from './../shared/result';
import { QueryModel } from './../shared/model/query.model';
import { CourseRepository } from './course.repository';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private readonly courseRepository: CourseRepository
  ) {}

  public async getCourses(query: QueryModel): Promise<any> {
    try {
      return await this.courseRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getCourse(id: string): Promise<any> {
    try {
      return await this.courseRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addCourse(newCourse: CourseDto): Promise<any> {
    try {
      return await this.courseRepository.save(newCourse);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateCourse(id: string, newCourse: CourseDto): Promise<any> {
    try {
      const dbCourse = this.getCourse(id);
      if (dbCourse) {
        return await this.courseRepository.update(id, newCourse);
      }
      return new ResultException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteCourse(id: string): Promise<any> {
    try {
      return await this.courseRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
