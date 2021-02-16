import { UserRole } from 'src/shared/enums/role.enum';
import { InstitutionEntity } from './../institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'class_tbl' })
export class StudentEntity extends UsersBaseEntity {
  @Column()
  className: string;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.student)
  institution: InstitutionEntity;
}
