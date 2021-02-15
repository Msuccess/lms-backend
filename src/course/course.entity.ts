import { InstitutionEntity } from './../institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => InstitutionEntity, (institution) => institution.document)
  institution: InstitutionEntity;
}
