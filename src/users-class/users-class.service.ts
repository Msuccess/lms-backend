import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryModel } from 'src/shared/model/query.model';
import { ResultException } from 'src/shared/result';
import { UserClassDto } from './dto/user-class.dto';
import { UserClassRepository } from './user-class.repository';

@Injectable()
export class UsersClassService {
  constructor(
    @InjectRepository(UserClassRepository)
    private readonly userClassRepository: UserClassRepository,
  ) {}

  public async createClass(ClassDetails: UserClassDto): Promise<any> {
    try {
      const ClassInfo = await this.userClassRepository.save(ClassDetails);
      return ClassInfo;
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getClasses(query: QueryModel): Promise<any> {
    try {
      return await this.userClassRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getClass(id: string): Promise<any> {
    try {
      return await this.userClassRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateClass(
    id: string,
    ClassDetails: UserClassDto,
  ): Promise<any> {
    try {
      const dbUser = this.getClass(id);
      if (dbUser) {
        return await this.userClassRepository.update(id, ClassDetails);
      }
      return new ResultException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteClass(id: string): Promise<any> {
    try {
      return await this.userClassRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
