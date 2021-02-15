import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'courses_tbl' })
export class CoursesEntity extends UsersBaseEntity {
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
