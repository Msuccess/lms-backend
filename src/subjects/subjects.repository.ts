import { EntityRepository, Repository } from 'typeorm';
import { SubjectsEntity } from './subjects.entity';

@EntityRepository(SubjectsEntity)
export class SubjectsRepository extends Repository<SubjectsEntity> {}
