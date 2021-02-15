import { InstitutionEntity } from './../institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'teachers_tbl' })
export class TeacherEntity extends UsersBaseEntity {
  @Column({ nullable: false })
  userId?: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.teacher)
  institution: InstitutionEntity;
}
