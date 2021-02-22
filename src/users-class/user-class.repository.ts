import { EntityRepository, Repository } from 'typeorm';
import { UserClassEntity } from './user-class.entity';

@EntityRepository(UserClassEntity)
export class UserClassRepository extends Repository<UserClassEntity> {}
