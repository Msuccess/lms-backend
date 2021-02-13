import { SharedBaseEntity } from 'src/shared/shared-base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'TblTeacher' })
export class TeacherEntity extends SharedBaseEntity {
  @Column()
  teacherID: string;

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
