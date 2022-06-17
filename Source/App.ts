import express from "express";
import yargs from "yargs";
import * as path from "path";
import { DataSource } from "typeorm";

import { errorHandler, errorNotFoundHandler } from "./Middleware/ErrorHandler";
import { router } from "./Router";
import { HasValidSecret } from "./Middleware/HasValidSecret";
import { Dice } from "./Models/DB/Dice";
import { PartyMember } from "./Models/DB/PartyMember";
import { Roll } from "./Models/DB/Roll";
import { Session } from "./Models/DB/Session";
import { User } from "./Models/DB/User";
import { World } from "./Models/DB/World";

// Database


export const app = express();

const argv = yargs(process.argv.slice(2)).options({
	isMaria: { type: 'boolean', default: true },
	port: { type: 'number', default: 3000 },
	host: { type: 'string', default: "localhost" },
	dbPort: { type: 'number', default: 3306 },
	username: { type: 'string', default: "root" },
	password: { type: 'string', default: "" },
	database: { type: 'string', default: "dice-stats" },
}).parseSync();

// Create our DB if it doesn't exist
const source = new DataSource({
	type: argv.isMaria ? "mariadb" : "mysql",
	host: argv.host,
	port: argv.dbPort,
	username: argv.username,
	password: argv.password,
	database: argv.database,
	synchronize: true,
	entities: [
		Dice, PartyMember, Roll, Session, User, World,
	],
});
source.initialize()
	.then(() => console.log("Data source has been initialized."))
	.catch(err => {
		console.error(err);
		process.exit(-1);
	});

export default source;

// Express configuration
app.set("port", argv.port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check for secret before access
app.use(HasValidSecret);

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);

app.use(errorNotFoundHandler);
app.use(errorHandler);
