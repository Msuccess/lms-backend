import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryModel } from 'src/shared/model/query.model';
import { ResultException } from 'src/shared/result';
import { SubjectsDto } from './dto/subjects.dto';
import { SubjectsRepository } from './subjects.repository';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectsRepository)
    private readonly subjectsRepository: SubjectsRepository,
  ) {}

  public async getSubjects(query: QueryModel): Promise<any> {
    try {
      return await this.subjectsRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async getSubject(id: string): Promise<any> {
    try {
      return await this.subjectsRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async createSubject(newSubject: SubjectsDto): Promise<any> {
    try {
      const subjectInfo = await this.subjectsRepository.save(newSubject);
      return subjectInfo;
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async updateSubject(
    id: string,
    newSubjects: SubjectsDto,
  ): Promise<any> {
    try {
      const dbSubjects = this.getSubject(id);
      if (dbSubjects) {
        return await this.subjectsRepository.update(id, newSubjects);
      } else {
        return new ResultException('Subject not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async deleteSubject(id: string): Promise<any> {
    try {
      return await this.subjectsRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
