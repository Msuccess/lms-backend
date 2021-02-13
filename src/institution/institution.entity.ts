import { SharedBaseEntity } from 'src/shared/shared-base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'TblInstitution' })
export class InstitutionEntity extends SharedBaseEntity {
  @Column()
  institutionID: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  relatedClass: [];

  @Column({ nullable: false })
  fullname: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;
}
