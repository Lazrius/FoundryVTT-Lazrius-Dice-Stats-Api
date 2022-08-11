import { MigrationInterface, QueryRunner } from "typeorm";

export class RollAutoIncrement1660213229206 implements MigrationInterface {
    name = 'RollAutoIncrement1660213229206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dice\` DROP FOREIGN KEY \`FK_5d985d429de7f2f0b3728dfa4ef\``);
        await queryRunner.query(`ALTER TABLE \`roll\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roll\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`roll\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`dice\` DROP COLUMN \`rollId\``);
        await queryRunner.query(`ALTER TABLE \`dice\` ADD \`rollId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`dice\` ADD CONSTRAINT \`FK_5d985d429de7f2f0b3728dfa4ef\` FOREIGN KEY (\`rollId\`) REFERENCES \`roll\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dice\` DROP FOREIGN KEY \`FK_5d985d429de7f2f0b3728dfa4ef\``);
        await queryRunner.query(`ALTER TABLE \`dice\` DROP COLUMN \`rollId\``);
        await queryRunner.query(`ALTER TABLE \`dice\` ADD \`rollId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`roll\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`roll\` ADD \`id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roll\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`dice\` ADD CONSTRAINT \`FK_5d985d429de7f2f0b3728dfa4ef\` FOREIGN KEY (\`rollId\`) REFERENCES \`roll\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
