import { InstitutionEntity } from './../institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserClassEntity } from 'src/users-class/user-class.entity';
import { SubjectsEntity } from 'src/subjects/subjects.entity';

@Entity({ name: 'documents_tbl' })
export class DocumentEntity extends UsersBaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  documentUrl: string;

  @ManyToOne(() => SubjectsEntity, (subjects) => subjects.document)
  subject: SubjectsEntity;

  @ManyToOne(() => UserClassEntity, (userClass) => userClass.document)
  userClass: UserClassEntity;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.document)
  institution: InstitutionEntity;
}
