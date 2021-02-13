import { EntityRepository, Repository } from 'typeorm';
import { CoursesEntity } from './course.entity';

@EntityRepository(CoursesEntity)
export class DepartmentRepository extends Repository<CoursesEntity> {}
