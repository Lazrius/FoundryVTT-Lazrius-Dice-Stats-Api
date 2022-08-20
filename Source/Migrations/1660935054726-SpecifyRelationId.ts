import { MigrationInterface, QueryRunner } from "typeorm";

export class SpecifyRelationId1660935054726 implements MigrationInterface {
    name = 'SpecifyRelationId1660935054726'

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query(`CREATE UNIQUE INDEX IDX_5d985d45d985d4 ON \`roll\`(chatMessageId)`);
        await queryRunner.query(`ALTER TABLE \`dice\` DROP FOREIGN KEY \`FK_5d985d429de7f2f0b3728dfa4ef\``);
        await queryRunner.query(`ALTER TABLE \`dice\` MODIFY \`rollId\` varchar(255)`);
        await queryRunner.query(`ALTER TABLE \`dice\` ADD CONSTRAINT \`FK_5d985d429de7f2f0b3728dfa4ef\` FOREIGN KEY (\`rollId\`) REFERENCES \`roll\`(\`chatMessageId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dice\` DROP FOREIGN KEY \`FK_5d985d429de7f2f0b3728dfa4ef\``);
	    await queryRunner.query(`ALTER TABLE \`dice\` MODIFY \`rollId\` int`);
        await queryRunner.query(`ALTER TABLE \`dice\` ADD CONSTRAINT \`FK_5d985d429de7f2f0b3728dfa4ef\` FOREIGN KEY (\`rollId\`) REFERENCES \`roll\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
	    await queryRunner.query(`DROP INDEX IDX_5d985d45d985d4 ON \`roll\``);
    }

}
