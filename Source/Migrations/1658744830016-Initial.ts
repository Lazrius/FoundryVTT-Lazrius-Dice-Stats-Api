import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1658744830016 implements MigrationInterface {
    name = 'Initial1658744830016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`world\` (\`id\` varchar(255) NOT NULL, \`created\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`system\` varchar(255) NOT NULL, INDEX \`IDX_9a0e469d5311d0d95ce1202c99\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`isDm\` tinyint NOT NULL, \`created\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`worldId\` varchar(255) NULL, INDEX \`IDX_cace4a159ff9f2512dd4237376\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`party_member\` (\`id\` varchar(255) NOT NULL, \`created\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`alive\` tinyint NOT NULL, \`ownerId\` varchar(255) NULL, INDEX \`IDX_f2f75ff1c8358327891c602ff2\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`started\` int NOT NULL, \`finished\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roll\` (\`id\` varchar(255) NOT NULL, \`created\` int NOT NULL, \`flavour\` varchar(255) NOT NULL, \`formula\` varchar(255) NOT NULL, \`result\` int NOT NULL, \`sessionId\` int NULL, \`partyMemberId\` varchar(255) NULL, \`userId\` varchar(255) NULL, INDEX \`IDX_135b09703d6381024c974bb7d4\` (\`flavour\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`diceNumber\` int NOT NULL, \`diceOutcome\` int NOT NULL, \`rollId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_1d4c5119857c251cc67c6837e34\` FOREIGN KEY (\`worldId\`) REFERENCES \`world\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`party_member\` ADD CONSTRAINT \`FK_8eec7b58970c3bc3fbf2da25a52\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roll\` ADD CONSTRAINT \`FK_5ee3eb51250af37fec19c599af2\` FOREIGN KEY (\`sessionId\`) REFERENCES \`session\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roll\` ADD CONSTRAINT \`FK_3b64d0acaba49cd542a569d8d62\` FOREIGN KEY (\`partyMemberId\`) REFERENCES \`party_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roll\` ADD CONSTRAINT \`FK_070cea5d3d74c77d89c10d3afd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dice\` ADD CONSTRAINT \`FK_5d985d429de7f2f0b3728dfa4ef\` FOREIGN KEY (\`rollId\`) REFERENCES \`roll\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dice\` DROP FOREIGN KEY \`FK_5d985d429de7f2f0b3728dfa4ef\``);
        await queryRunner.query(`ALTER TABLE \`roll\` DROP FOREIGN KEY \`FK_070cea5d3d74c77d89c10d3afd9\``);
        await queryRunner.query(`ALTER TABLE \`roll\` DROP FOREIGN KEY \`FK_3b64d0acaba49cd542a569d8d62\``);
        await queryRunner.query(`ALTER TABLE \`roll\` DROP FOREIGN KEY \`FK_5ee3eb51250af37fec19c599af2\``);
        await queryRunner.query(`ALTER TABLE \`party_member\` DROP FOREIGN KEY \`FK_8eec7b58970c3bc3fbf2da25a52\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_1d4c5119857c251cc67c6837e34\``);
        await queryRunner.query(`DROP TABLE \`dice\``);
        await queryRunner.query(`DROP INDEX \`IDX_135b09703d6381024c974bb7d4\` ON \`roll\``);
        await queryRunner.query(`DROP TABLE \`roll\``);
        await queryRunner.query(`DROP TABLE \`session\``);
        await queryRunner.query(`DROP INDEX \`IDX_f2f75ff1c8358327891c602ff2\` ON \`party_member\``);
        await queryRunner.query(`DROP TABLE \`party_member\``);
        await queryRunner.query(`DROP INDEX \`IDX_cace4a159ff9f2512dd4237376\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_9a0e469d5311d0d95ce1202c99\` ON \`world\``);
        await queryRunner.query(`DROP TABLE \`world\``);
    }

}
