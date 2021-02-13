import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  createStudent(student: CreateStudentDto) {
    throw new Error('Method not implemented.');
  }
}
