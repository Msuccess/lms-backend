import { UserRole } from 'src/shared/enums/role.enum';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users_tbl' })
export class IdentityUserEntity extends UsersBaseEntity {
  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;
}
