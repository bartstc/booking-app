import { MigrationInterface, QueryRunner } from 'typeorm';
import { Table } from 'typeorm/index';

export class AddedDictionaryEntity1609575185956 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dictionary',
        columns: [
          {
            name: 'dictionary_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dictionaries');
  }
}
