import { EntityRepository, Repository } from 'typeorm';
import { CoursesEntity } from './course.entity';

@EntityRepository(CoursesEntity)
export class CourseRepository extends Repository<CoursesEntity> {}
