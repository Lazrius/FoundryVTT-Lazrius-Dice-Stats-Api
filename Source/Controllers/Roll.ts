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
		SendJsonResponse(res, HttpStatusCode.NOT_FOUND, { message: 'Cannot find user' });
		return;
	}

	const session = await GetActiveSession();
	if (!session) {
		SendJsonResponse(res, HttpStatusCode.NOT_FOUND, { message: 'There is currently no active session.' });
		return;
	}

	const partyMember = await FindPartyMemberById(body.partyMember);
	if (!partyMember) {
		SendJsonResponse(res, HttpStatusCode.NOT_FOUND, { message: 'Cannot find party member' });
		return;
	}

	const roll = new Roll();
	roll.ability = body.ability;
	roll.created = Timestamp();
	roll.id = body.id;
	roll.result = body.total;
	roll.skill = body.skill;
	roll.formula = body.formula;
	roll.user = user;
	roll.session = Promise.resolve(session);
	roll.partyMember = partyMember;

	const arr: Dice[] = [];
	for (const dice of body.dice) {
		const entity = new Dice();
		entity.diceNumber = dice.diceNumber;
		entity.diceOutcome = dice.diceOutcome;
		arr.push(entity);
	}

	roll.dice = Promise.resolve(arr);

	await source.getRepository(Roll).save(roll);
	SendJsonResponse(res, HttpStatusCode.CREATED, JSON.stringify(roll));
};
