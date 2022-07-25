import yargs from "yargs";
import { DataSource } from "typeorm";

import { Dice } from "./Models/DB/Dice";
import { PartyMember } from "./Models/DB/PartyMember";
import { Roll } from "./Models/DB/Roll";
import { Session } from "./Models/DB/Session";
import { User } from "./Models/DB/User";
import { World } from "./Models/DB/World";

export const argv = yargs(process.argv.slice(2)).options({
	dbType: { type: 'string', default: 'mariadb',
		choices: [ 'mariadb', 'mysql', 'postgres', 'mssql' ],
	},
	port: { type: 'number', default: 3000 },
	host: { type: 'string', default: "localhost" },
	dbPort: { type: 'number', default: 3306 },
	username: { type: 'string', default: "root" },
	password: { type: 'string', default: "" },
	database: { type: 'string', default: "dice-stats" },
}).parseSync();

// Create our DB if it doesn't exist
const source = new DataSource({
	type: argv.dbType as 'mysql' | 'mariadb' | 'postgres' | 'mssql',
	host: argv.host,
	port: argv.dbPort,
	username: argv.username,
	password: argv.password,
	database: argv.database,
	synchronize: false,
	entities: [
		Dice, PartyMember, Roll, Session, User, World,
	],
	migrations: [ 'Source/Migrations/**/*.ts' ],
	migrationsTableName: 'migrations_dice-stats',
});
source.initialize()
	.then(() => console.log("Data source has been initialized."))
	.catch(err => {
		console.error(err);
		process.exit(-1);
	});

export default source;
