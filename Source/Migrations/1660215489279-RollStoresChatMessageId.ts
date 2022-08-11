import { MigrationInterface, QueryRunner } from "typeorm";

export class RollStoresChatMessageId1660215489279 implements MigrationInterface {
    name = 'RollStoresChatMessageId1660215489279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roll\` ADD \`chatMessageId\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roll\` DROP COLUMN \`chatMessageId\``);
    }

}
