import { UserRole } from 'src/shared/enums/role.enum';
import { TeacherEntity } from './../teacher/teacher.entity';
import { CoursesEntity } from './../course/course.entity';
import { StudentEntity } from './../student/student.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { DocumentEntity } from 'src/document/document.entity';
import { UserClassEntity } from 'src/users-class/user-class.entity';
import { SubjectsEntity } from 'src/subjects/subjects.entity';

@Entity({ name: 'institution_tbl' })
export class InstitutionEntity extends UsersBaseEntity {
  @Column()
  userId: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.INSTITUTION,
  })
  role: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @OneToMany(() => StudentEntity, (student) => student.institution)
  student: StudentEntity[];

  @OneToMany(() => DocumentEntity, (document) => document.institution)
  document: DocumentEntity[];

  @OneToMany(() => CoursesEntity, (courses) => courses.institution)
  courses: CoursesEntity[];

  @OneToMany(() => TeacherEntity, (teacher) => teacher.institution)
  teacher: TeacherEntity[];

  @OneToMany(() => UserClassEntity, (userClass) => userClass.institution)
  userClass: UserClassEntity[];

  @OneToMany(() => SubjectsEntity, (subjects) => subjects.institution)
  subjects: SubjectsEntity[];
}
