import { UserRole } from 'src/shared/enums/role.enum';
import { InstitutionEntity } from './../institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'teachers_tbl' })
export class TeacherEntity extends UsersBaseEntity {
  @Column({ nullable: true })
  userId?: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  dateOfBirth: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TEACHER,
  })
  role: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.teacher)
  institution: InstitutionEntity;
}
