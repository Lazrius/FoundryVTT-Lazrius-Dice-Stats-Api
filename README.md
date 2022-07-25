## FoundryVTT Dice Stats Api
This is the backend API component for the FoundryVTT Dice Stats Module. The frontend module will require this API in order to store the stats into the database. 

## Requirements
- [NodeJS](https://nodejs.org/en/) (min v.16 recommended)
- A Database (MySQL / MariaDB / MsSQL supported)

OR
- [Docker](https://docs.docker.com/get-docker/)
	- [MariaDB](https://mariadb.com/kb/en/installing-and-using-mariadb-via-docker/) / [MySQL](https://hub.docker.com/_/mysql) /  [MsSQL](https://hub.docker.com/_/microsoft-mssql-server)

## Installation & Running

### Locally
```
git clone https://github.com/Lazrius/FoundryVTT-Lazrius-Dice-Stats-Api.git
cd FoundryVTT-Lazrius-Dice-Stats-Api
npm install
npm run build
node dist/Server.js --dbType=mariadb --host=localhost --username=admin --password=123 --database=dice_stats
```

### Docker 
```
docker pull lazdisco/lazrius-dice-stats-api
docker run --name dice-stats-api -d -e --DB_TYPE=mariadb --DB_HOST=localhost --USERNAME=admin --PASSWORD=123 lazdisco/lazrius-dice-stats-api
```
OR from local
```
git clone https://github.com/Lazrius/FoundryVTT-Lazrius-Dice-Stats-Api.git
cd FoundryVTT-Lazrius-Dice-Stats-Api
docker build . -t lazrius-dice-stats-api:latest
docker run --name dice-stats-api -d lazrius-dice-stats-api
```

## Updating
When updating from a previous version of the API, there may be changes to the database schema. Migrations have been setup for this, and you can automatically make the needed changes using the NPM run commands.
`npm run migration:up` will execute the change to the database, using the standard configuration from `Source/Connection.ts`. This can be reverted if need be by passing in `migration:down` instead. 

If using Docker, you can add `-e COMMAND=update` or `-e COMMAND=revert` to the docker run command in order to execute it via your container setup.

## Faker
For debugging and development purposes, there exists a file called `Faker.ts` used for generating debug data. Running `npm run faker` will use the default settings (or any args passed) to connect to the DB, delete any data found there, and then populate it with dummy data

## Database Structure
The Database structure files can be seen in `Source/Models/DB`.

The current diagram is as follows:
![data diagram](https://media.discordapp.net/attachments/480531503097577472/1001244527773888582/unknown.png)
