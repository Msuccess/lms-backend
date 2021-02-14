import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity } from 'typeorm';

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
}
