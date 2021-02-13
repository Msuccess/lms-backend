import { EntityRepository, Repository } from 'typeorm';
import { DocumentEntity } from './document.entity';

@EntityRepository(DocumentEntity)
export class DepartmentRepository extends Repository<DocumentEntity> {}
