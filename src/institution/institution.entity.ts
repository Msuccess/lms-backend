import { UserRole } from 'src/shared/enums/role.enum';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity } from 'typeorm';

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
}
