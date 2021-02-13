import { Column, Entity } from 'typeorm';
import { SharedBaseEntity } from '../shared/shared-base.entity';

@Entity({ name: 'courses_tbl' })
export class CoursesEntity extends SharedBaseEntity {
  @Column()
  courseID: string;

  @Column({ nullable: false })
  subject: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  relatedClass: string;

  @Column({ nullable: false })
  courseUrl: string;
}
