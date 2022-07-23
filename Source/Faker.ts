// File for generating debug development data
import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import source from './App';
import { GetActiveSession, RandomID, Timestamp } from "./Utils";
import moment from "moment";
import { World } from "./Models/DB/World";
import { User } from "./Models/DB/User";
import { PartyMember } from "./Models/DB/PartyMember";
import { Session } from "./Models/DB/Session";
import { Roll } from "./Models/DB/Roll";
import { Dice } from "./Models/DB/Dice";
import { AllowedDice } from "./Models/Validator";
import chalk from "chalk";

const log = console.log;

// Number between 0 and total
const Rand = (total: number) => Math.floor(Math.random() * total);

const Generate = async () => {
	let currentStartDate = moment.utc().second();
	let currentEndDate = 0;

	const NewUser = async (world: World, isDm = false) => {
		const user = new User();
		user.world = world;
		user.id = RandomID();
		user.name = faker.name.firstName();
		user.isDm = isDm;
		user.created = Timestamp();
		log(chalk.green(`Generating new user: ${user.name} (${user.id})`));
		await source.getRepository(User).save(user);
		return user;
	};

	const NewPartyMember = async (user: User) => {
		const member = new PartyMember();
		member.id = RandomID();
		member.name = faker.name.firstName();
		member.alive = !!(Rand(2));
		member.created = Timestamp();
		member.owner = user;
		await source.getRepository(PartyMember).save(member);
		log(chalk.magenta(`Generating new member: ${member.name} (${member.id})`));
		return member;
	};

	// Every 100 rolls, we begin a new session.
	let rollCount = 0;
	const attributes = [
		"N/A",
		"Strength",
		"Dexterity",
		"Constitution",
		"Intelligence",
		"Wisdom",
		"Charisma",
	];

	const skills = [
		"N/A",
		"Acrobatics",
		"Animal Handling",
		"Arcana",
		"Athletics",
		"Deception",
		"History",
		"Insight",
		"Intimidation",
		"Investigation",
		"Medicine",
		"Nature",
		"Perception",
		"Performance",
		"Persuasion",
		"Religion",
		"Sleight Of Hand",
		"Stealth",
		"Survival",
	];

	const checks = [attributes, skills];

	const NewRoll = async (member: PartyMember) => {
		let session = await GetActiveSession();
		if (rollCount === 0) {
			// Begin Session
			log(chalk.redBright('New Session'));
			currentStartDate = moment.unix(currentStartDate).add(7, 'days').seconds();
			currentEndDate = moment.unix(currentStartDate).add(6, 'hour').seconds();

			session = new Session();
			session.started = currentStartDate;
			await source.getRepository(Session).save(session);
		}

		const roll = new Roll();

		const abilityCheck = Rand(checks.length) === 0;
		if (abilityCheck) {
			const check = checks[Rand(checks.length)];
			roll.flavour = check[Rand(check.length)];
			roll.formula = "1d20 + " + Rand(4) + 1;
			const dice = new Dice();
			dice.diceOutcome = Rand(20) + 1;
			dice.diceNumber = 20;
			dice.roll = roll;
			roll.dice = Promise.resolve([dice]);
			log(chalk.white('Single Dice Roll'));
		} else {
			roll.flavour = "N/A";
			const diceCount = (Rand(4) + 1);
			const diceNumber = AllowedDice[Rand(AllowedDice.length)];
			roll.formula = `${diceCount}d${diceNumber}`;
			roll.dice = Promise.resolve(Array.from(Array(diceCount)).map(() => {
				const dice = new Dice();
				dice.diceNumber = diceNumber;
				dice.diceOutcome = Rand(diceNumber) + 1;
				dice.roll = roll;
				return dice;
			}));
			log(chalk.white('Multi-Dice Roll'));
		}

		roll.partyMember = member;
		roll.id = RandomID();
		roll.session = Promise.resolve(session);
		roll.user = roll.partyMember.owner;
		roll.created = Timestamp();
		roll.result = 0;
		(await roll.dice).forEach(x => {
			roll.result += x.diceOutcome;
		});
		await source.getRepository(Roll).save(roll);

		rollCount++;
		if (rollCount === 100) {
			log(chalk.redBright('End Session'));
			session.finished = currentEndDate;
			await source.getRepository(Session).save(session);
			rollCount = 0;
		}
	};

	const GenerateData = async () => {
		const world = new World();
		world.id = RandomID();
		world.created = Timestamp();
		world.name = faker.random.words();
		world.system = ["dnd5e", "pf2e"][Rand(2)];

		log(chalk.blue(`Generating new world: ${world.name} (${world.id})`));

		await source.getRepository(World).save(world);
		const users = [await NewUser(world, true), await NewUser(world), await NewUser(world), await NewUser(world),
			await NewUser(world), await NewUser(world), await NewUser(world)];
		const members: PartyMember[] = [];

		for (const user of users) {
			// Every user gets between 1 & 2 PartyMembers
			const total = Rand(2) + 1;
			for (let i = 0; i < total; i++) {
				members.push(await NewPartyMember(user));
			}
		}

		// 100 sessions
		for (let i = 0; i < 100; i++) {
			// 100 rolls per session
			for (let j = 0; j < 100; j++) {
				await NewRoll(members[Rand(members.length)]);
			}
		}

	};

	// Generate 5 worlds
	for (let i = 0; i < 5; i++) {
		await GenerateData();
	}
};

(async() => {
	await source.initialize();

	// Clear Database
	log(chalk.grey('Clearing Database'));
	await source.dropDatabase();
	await source.synchronize();

	// Generate new data
	await Generate();
})();
