import express from "express";
import yargs from "yargs";
import * as path from "path";
import { Connection, ConnectionOptions, createConnection } from "typeorm";

import { errorHandler, errorNotFoundHandler } from "./Middleware/ErrorHandler";
import { router } from "./Router";
import { HasValidSecret } from "./Middleware/HasValidSecret";

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

// Database
const opt: ConnectionOptions = {
	type: argv.isMaria ? "mariadb" : "mysql",
	host: argv.host,
	port: argv.dbPort,
	username: argv.username,
	password: argv.password,
	database: "mysql",
	synchronize: true,
	entities: [
		__dirname + "/Models/DB/*.js",
	],
};

let connection: Connection | null = null;
createConnection(opt)
	.then(async con => {
		await con.query(`CREATE DATABASE IF NOT EXISTS \`${argv.database}\``);
		await con.close();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		connection = await createConnection({ ...opt, database: argv.database } as ConnectionOptions);
	})
	.catch(err => {
		console.error(err);
		process.exit(-1);
	});

// Express configuration
app.set("port", argv.port);

// Check for secret before access
app.use(HasValidSecret);

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);

app.use(errorNotFoundHandler);
app.use(errorHandler);
