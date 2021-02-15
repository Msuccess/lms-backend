import { InstitutionEntity } from './../institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'students_tbl' })
export class StudentEntity extends UsersBaseEntity {
  @Column()
  userId?: string;

  @Column()
  userClass: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.student)
  institution: InstitutionEntity;
}
