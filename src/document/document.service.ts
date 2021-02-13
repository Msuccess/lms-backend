import { ResultException } from './../shared/result';
import { QueryModel } from './../shared/model/query.model';
import { DocumentRepository } from './document.repository';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentDto } from './dto/document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentRepository)
    private readonly documentRepository: DocumentRepository,
  ) {}

  public async getDocuments(query: QueryModel): Promise<any> {
    try {
      return await this.documentRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDocument(id: string): Promise<any> {
    try {
      return await this.documentRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addDocument(newDocument: DocumentDto): Promise<any> {
    try {
      return await this.documentRepository.save(newDocument);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateDocument(
    id: string,
    newDocument: DocumentDto,
  ): Promise<any> {
    try {
      const dbDocument = this.getDocument(id);
      if (dbDocument) {
        return await this.documentRepository.update(id, newDocument);
      }
      return new ResultException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteDocument(id: string): Promise<any> {
    try {
      return await this.documentRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
