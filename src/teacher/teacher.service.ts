import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherRepository } from './teacher.repository';
import { ResultException } from 'src/shared/result';
import { QueryModel } from 'src/shared/model/query.model';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherRepository)
    private readonly teacherRepository: TeacherRepository,
  ) {}

  public async createTeacher(teacherDetails: CreateTeacherDto): Promise<any> {
    try {
      const teacherInfo = await this.teacherRepository.save(teacherDetails);
      delete teacherInfo.password;
      return teacherInfo;
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getTeachers(query: QueryModel): Promise<any> {
    try {
      return await this.teacherRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getTeacher(id: string): Promise<any> {
    try {
      return await this.teacherRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateTeacher(
    id: string,
    teacherDetails: CreateTeacherDto,
  ): Promise<any> {
    try {
      const dbUser = this.getTeacher(id);
      if (dbUser) {
        return await this.teacherRepository.update(id, teacherDetails);
      }
      return new ResultException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteTeacher(id: string): Promise<any> {
    try {
      return await this.teacherRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
