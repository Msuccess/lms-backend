import { InstitutionEntity } from './../institution/institution.entity';
import { UsersBaseEntity } from 'src/shared/user-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'documents_tbl' })
export class DocumentEntity extends UsersBaseEntity {
  @Column()
  documentID: string;

  @Column({ nullable: false })
  subject: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  relatedClass: string;

  @Column({ nullable: false })
  documentUrl: string;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.document)
  institution: InstitutionEntity;
}
