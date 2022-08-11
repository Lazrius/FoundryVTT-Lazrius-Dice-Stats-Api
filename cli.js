const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
const { execSync } = require("child_process");

const argv = yargs(hideBin(process.argv)).argv;
try {
	switch (argv.cmd) {
		case "run":
			execSync('node dist/Server.js ' + process.argv.slice(3).join(' '), { stdio: 'inherit', cwd: __dirname });
			break;
		case "update":
			execSync('npm run migration:up -- ' + process.argv.slice(3).join(' '), { stdio: 'inherit', cwd: __dirname });
			break;
		case "revert":
			execSync('npm run migration:down -- ' + process.argv.slice(3).join(' '), { stdio: 'inherit', cwd: __dirname });
			break;
		default:
			console.error('No valid command was specified. Valid commands are: run, update, revert');
			process.exit(-1);
	}
} catch {
	// Reason should be unnecessary
	console.error('Process exited unexpectedly');
}
