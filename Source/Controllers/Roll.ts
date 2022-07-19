import { FindPartyMemberById, FindUserById, FromLocal, GetActiveSession, SendJsonResponse, Timestamp } from "../Utils";
import HttpStatusCode from "../Models/HttpStatusCode";
import { Request, Response } from "express";
import NewRollRequest from "../Models/Requests/NewRollRequest";
import { Roll } from "../Models/DB/Roll";
import source from "../App";
import { Dice } from "../Models/DB/Dice";

export const NewRoll = async (req: Request, res: Response): Promise<void> => {
	const body = FromLocal<NewRollRequest>(res);
	const user = await FindUserById(req.query.id as string);

	if (!user) {
		SendJsonResponse(res, HttpStatusCode.NOT_FOUND, 'Cannot find user');
		return;
	}

	const session = await GetActiveSession();
	if (!session) {
		SendJsonResponse(res, HttpStatusCode.NOT_FOUND, 'There is currently no active session.');
		return;
	}

	const partyMember = await FindPartyMemberById(body.partyMember);
	if (!partyMember) {
		SendJsonResponse(res, HttpStatusCode.NOT_FOUND, 'Cannot find party member');
		return;
	}

	const roll = new Roll();
	roll.flavour = body.flavour;
	roll.created = Timestamp();
	roll.id = body.id;
	roll.result = body.total;
	roll.formula = body.formula;
	roll.user = user;
	roll.session = Promise.resolve(session);
	roll.partyMember = partyMember;

	// dnd5e appends the player name to the flavour text, which makes it a bad index.
	if (user.world.system == "dnd5e") {
		roll.flavour = roll.flavour.substring(0, roll.flavour.indexOf(':'));
	}

	const arr: Dice[] = [];
	for (const dice of body.dice) {
		const entity = new Dice();
		entity.diceNumber = dice.diceNumber;
		entity.diceOutcome = dice.diceOutcome;
		arr.push(entity);
	}

	roll.dice = Promise.resolve(arr);

	await source.getRepository(Roll).save(roll);
	SendJsonResponse(res, HttpStatusCode.CREATED, 'Roll Saved!');
};
