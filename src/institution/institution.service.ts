import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryModel } from 'src/shared/model/query.model';
import { ResultException } from 'src/shared/result';
import { InstitutionDto } from './dto/institution.dto';
import { InstitutionRepository } from './institution.repository';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(InstitutionRepository)
    private readonly institutionRepository: InstitutionRepository,
  ) {}

  public async getInstitutions(query: QueryModel): Promise<any> {
    try {
      return await this.institutionRepository.find({
        relations: ['institutions'],
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async getInstitution(id: string): Promise<any> {
    try {
      return await this.institutionRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async createInstitution(newInstitution: InstitutionDto): Promise<any> {
    try {
      Logger.log('Before insert into institution table');
      Logger.log(newInstitution);
      return await this.institutionRepository.save(newInstitution);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async updateInstitution(
    id: string,
    newInstitution: InstitutionDto,
  ): Promise<any> {
    try {
      const dbInstitution = this.getInstitution(id);
      if (dbInstitution) {
        return await this.institutionRepository.update(id, newInstitution);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async deleteInstitution(id: string): Promise<any> {
    try {
      return await this.institutionRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
