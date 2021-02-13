import { EntityRepository, Repository } from 'typeorm';
import { InstitutionEntity } from './institution.entity';

@EntityRepository(InstitutionEntity)
export class InstitutionRepository extends Repository<InstitutionEntity> {}
