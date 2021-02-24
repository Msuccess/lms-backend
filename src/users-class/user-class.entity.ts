import { InstitutionEntity } from './../institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StudentEntity } from 'src/student/student.entity';

@Entity({ name: 'class_tbl' })
export class UserClassEntity extends UsersBaseEntity {
  @Column()
  className: string;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.userclass)
  institution: InstitutionEntity;

  @OneToMany(() => StudentEntity, (student) => student.userClass)
  student: StudentEntity;
}
