import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from 'src/course/course.repository';
import { ResultException } from 'src/shared/result';
import { StudentRepository } from 'src/student/student.repository';
import { SubjectsRepository } from 'src/subjects/subjects.repository';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { UserClassRepository } from 'src/users-class/user-class.repository';

@Injectable()
export class AnalyticsService {
  constructor() // @InjectRepository(TeacherRepository)
  // private readonly teacherRepository: TeacherRepository,

  // @InjectRepository(StudentRepository)
  // private readonly studentRepository: StudentRepository,

  // @InjectRepository(CourseRepository)
  // private readonly courseRepository: CourseRepository,

  // @InjectRepository(SubjectsRepository)
  // private readonly subjectsRepository: SubjectsRepository,

  // @InjectRepository(UserClassRepository)
  // private readonly userClassRepository: UserClassRepository
  {}

  // public async totalNumberStudents(id: string): Promise<any> {
  //   try {
  //     return await this.studentRepository.count({ where: { institution: id } });
  //   } catch (error) {
  //     new ResultException(error, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // public async totalNumberCourses(id: string): Promise<any> {
  //   try {
  //     return await this.courseRepository.count({ where: { institution: id } });
  //   } catch (error) {
  //     new ResultException(error, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // public async totalNumberSubjects(id: string): Promise<any> {
  //   try {
  //     return await this.subjectsRepository.count({
  //       where: { institution: id },
  //     });
  //   } catch (error) {
  //     new ResultException(error, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // public async totalNumberTeacher(id: string): Promise<any> {
  //   try {
  //     return await this.teacherRepository.count({ where: { institution: id } });
  //   } catch (error) {
  //     new ResultException(error, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // public async totalNumberClasses(id: string): Promise<any> {
  //   try {
  //     return await this.userClassRepository.count({
  //       where: { institution: id },
  //     });
  //   } catch (error) {
  //     new ResultException(error, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
