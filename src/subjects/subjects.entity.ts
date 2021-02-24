import { InstitutionEntity } from 'src/institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { UserClassEntity } from 'src/users-class/user-class.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'subjects_tbl' })
export class SubjectsEntity extends UsersBaseEntity {
  @Column({ nullable: false })
  subjectName: string;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.subjects)
  institution: InstitutionEntity;

  @ManyToOne(() => UserClassEntity, (userClass) => userClass.subjects)
  userClass: UserClassEntity;
}
