import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm/index';

import { EntityName } from '../../adapter';
import { DictionaryType } from '../../domain';

@Entity({ name: EntityName.Dictionary, schema: 'management' })
export class DictionaryEntity extends BaseEntity {
  @PrimaryColumn()
  dictionary_id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  type: DictionaryType;
}
