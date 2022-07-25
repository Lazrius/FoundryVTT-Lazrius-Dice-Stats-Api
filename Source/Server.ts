import express from 'express';
import 'reflect-metadata';
import { HasValidSecret } from "./Middleware/HasValidSecret";
import path from "path";
import { router } from "./Router";
import { errorHandler, errorNotFoundHandler } from "./Middleware/ErrorHandler";
import { argv } from "./Connection";

const app = express();

const port = app.get("port");

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

const server = app.listen(port, onListening);
server.on("error", onError);

function onError(error: NodeJS.ErrnoException) {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	const addr = server.address();
	const bind =
        typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	console.log(`Listening on ${bind}`);
}

export default server;
