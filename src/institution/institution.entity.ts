import { SharedBaseEntity } from 'src/shared/shared-base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'institution_tbl' })
export class InstitutionEntity extends SharedBaseEntity {
  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  fullname: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;
}
