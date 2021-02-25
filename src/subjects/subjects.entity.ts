import { CoursesEntity } from 'src/course/course.entity';
import { DocumentEntity } from 'src/document/document.entity';
import { InstitutionEntity } from 'src/institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { UserClassEntity } from 'src/users-class/user-class.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'subjects_tbl' })
export class SubjectsEntity extends UsersBaseEntity {
  @Column({ nullable: false })
  subjectName: string;

  @OneToMany(() => CoursesEntity, (course) => course.subject)
  course: CoursesEntity[];

  @OneToMany(() => DocumentEntity, (document) => document.subject)
  document: DocumentEntity[];

  @ManyToOne(() => InstitutionEntity, (institution) => institution.subjects)
  institution: InstitutionEntity;

  @ManyToOne(() => UserClassEntity, (userClass) => userClass.subjects)
  userClass: UserClassEntity;
}
