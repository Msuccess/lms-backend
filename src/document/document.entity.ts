import { Column, Entity } from 'typeorm';
import { SharedBaseEntity } from '../shared/shared-base.entity';

@Entity({ name: 'documents_tbl' })
export class DocumentEntity extends SharedBaseEntity {
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
}
