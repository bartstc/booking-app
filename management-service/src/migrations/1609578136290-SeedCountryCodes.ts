import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { v4 } from 'uuid';

import { DictionaryEntity } from '../modules/dictionaries/infra';
import { countryCodes } from '../resources/countryCodes';
import { DictionaryType } from '../modules/dictionaries/domain';

export class SeedCountryCodes1609578136290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dictionaries = getRepository(DictionaryEntity).create(
      countryCodes.map((countryCode) => ({
        dictionary_id: v4(),
        name: countryCode.name,
        value: countryCode.code,
        type: DictionaryType.Country_code,
      })),
    );

    await getRepository(DictionaryEntity).save(dictionaries);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
