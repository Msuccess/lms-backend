import { UserRole } from 'src/shared/enums/role.enum';
import { InstitutionEntity } from './../institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'students_tbl' })
export class StudentEntity extends UsersBaseEntity {
  @Column({ nullable: false })
  userId?: string;

  @Column({ nullable: false })
  userClass: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  dateOfBirth: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.student)
  institution: InstitutionEntity;
}
