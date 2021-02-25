import { InstitutionEntity } from './../institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserClassEntity } from 'src/users-class/user-class.entity';
import { SubjectsEntity } from 'src/subjects/subjects.entity';

@Entity({ name: 'courses_tbl' })
export class CoursesEntity extends UsersBaseEntity {
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  courseUrl: string;

  @ManyToOne(() => SubjectsEntity, (subjects) => subjects.document)
  subject: SubjectsEntity;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.document)
  institution: InstitutionEntity;

  @ManyToOne(() => UserClassEntity, (userClass) => userClass.courses)
  userClass: UserClassEntity;
}
