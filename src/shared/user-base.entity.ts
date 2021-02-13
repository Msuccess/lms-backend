import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { UserRole } from './enums/role.enum';

export class UserBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  userId: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: '100',
  })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: '500' })
  fullName: string;

  @Column({ type: 'varchar', nullable: false, length: '500' })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: '15',
    unique: true,
  })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: false, length: '100' })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: '20' })
  role: UserRole;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
