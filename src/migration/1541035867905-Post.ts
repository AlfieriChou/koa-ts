import {MigrationInterface, QueryRunner, TableColumn} from "typeorm"

export class Post1541035867905 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn('post', new TableColumn({
      name: 'user_id',
      type: 'int'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('post', 'user_id')
  }

}
