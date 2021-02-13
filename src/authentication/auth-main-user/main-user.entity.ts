import { UserBaseEntity } from 'src/shared/user-base.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'users_tbl' })
export class UsersEntity extends UserBaseEntity {}
