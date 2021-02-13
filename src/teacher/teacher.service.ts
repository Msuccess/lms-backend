import { Observable, of } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  createTeacher(teacher: CreateTeacherDto): Observable<any> {
    return of(teacher);
  }
}
