import { EntityRepository, Repository } from 'typeorm';
import { TeacherEntity } from './teacher.entity';

@EntityRepository(TeacherEntity)
export class TeacherRepository extends Repository<TeacherEntity> {}
