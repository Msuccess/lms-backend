import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryModel } from 'src/shared/model/query.model';
import { ResultException } from 'src/shared/result';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private readonly studentRepository: StudentRepository,
  ) {}

  public async createStudent(studentDetails: CreateStudentDto): Promise<any> {
    try {
      const studentInfo = await this.studentRepository.save(studentDetails);
      delete studentInfo.password;
      return studentInfo;
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getStudents(query: QueryModel): Promise<any> {
    try {
      return await this.studentRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getStudent(id: string): Promise<any> {
    try {
      return await this.studentRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateStudent(
    id: string,
    studentDetails: CreateStudentDto,
  ): Promise<any> {
    try {
      const dbUser = this.getStudent(id);
      if (dbUser) {
        return await this.studentRepository.update(id, studentDetails);
      }
      return new ResultException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteStudent(id: string): Promise<any> {
    try {
      return await this.studentRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
