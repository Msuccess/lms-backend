import { InstitutionEntity } from './../institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { DocumentEntity } from 'src/document/document.entity';
import { CoursesEntity } from 'src/course/course.entity';
import { SubjectsEntity } from 'src/subjects/subjects.entity';

@Entity({ name: 'class_tbl' })
export class UserClassEntity extends UsersBaseEntity {
  @Column()
  className: string;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.userClass)
  institution: InstitutionEntity;

  @OneToMany(() => StudentEntity, (student) => student.userClass)
  student: StudentEntity[];

  @OneToMany(() => DocumentEntity, (document) => document.userClass)
  document: DocumentEntity[];

  @OneToMany(() => CoursesEntity, (course) => course.userClass)
  courses: CoursesEntity[];

  @OneToMany(() => SubjectsEntity, (subjects) => subjects.userClass)
  subjects: SubjectsEntity[];
}
