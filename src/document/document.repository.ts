import { EntityRepository, Repository } from 'typeorm';
import { DocumentEntity } from './document.entity';

@EntityRepository(DocumentEntity)
export class DocumentRepository extends Repository<DocumentEntity> {}
