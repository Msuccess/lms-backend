import { EntityRepository, Repository } from 'typeorm';
import { UsersEntity } from './main-user.entity';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {}
