import {
	FindPartyMemberById,
	FindUserById,
	FromLocal,
	GetAllPartyMembersInWorld,
	GetPartyMemberById,
	GetWorldFromQuery,
	SendJsonResponse,
	Timestamp,
} from "../Utils";
import HttpStatusCode from "../Models/HttpStatusCode";
import { Request, Response } from "express";
import { NewPartyMemberRequest } from "../Models/Requests/NewPartyMemberRequest";
import { PartyMember } from "../Models/DB/PartyMember";
import source from "../App";

export const NewPartyMember = async (req: Request, res: Response): Promise<void> => {
	const body = FromLocal<NewPartyMemberRequest>(res);
	const user = await FindUserById(req.query.id as string);

	if (!user) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, 'Cannot find user');
		return;
	}

	if (await FindPartyMemberById(body.partyMemberId)) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, 'Party Member already exists');
		return;
	}

	const partyMember = new PartyMember();
	partyMember.owner = user;
	partyMember.created = Timestamp();
	partyMember.id = body.partyMemberId;
	partyMember.name = body.name;

	await source.getRepository(PartyMember).save(partyMember);
	SendJsonResponse(res, HttpStatusCode.CREATED, 'Party Member Created: ' + body.name);
};

export const GetPartyMember = async (req: Request, res: Response): Promise<void> => {
	const id = req.query.id as string | undefined;
	if (!id) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, 'Missing query string, partyMemberId');
		return;
	}

	const world = await GetWorldFromQuery(req, res);
	if (!world)
		return;

	const member = await GetPartyMemberById(id);
	if (!member) {
		SendJsonResponse(res, HttpStatusCode.NOT_FOUND, 'Member not found.');
		return;
	}

	SendJsonResponse(res, HttpStatusCode.OK, 'Member found', member);
};

export const GetAllPartyMembers = async (req: Request, res: Response): Promise<void> => {
	const world = await GetWorldFromQuery(req, res);
	if (!world)
		return;

	const partyMembers = await GetAllPartyMembersInWorld(world.id);

	if (partyMembers.length === 0)
	{
		SendJsonResponse(res, HttpStatusCode.NOT_FOUND, 'No party members are present within this world.');
		return;
	}

	SendJsonResponse(res, HttpStatusCode.OK, `Got all (${partyMembers.length}) party members.`, { members: partyMembers });
};
