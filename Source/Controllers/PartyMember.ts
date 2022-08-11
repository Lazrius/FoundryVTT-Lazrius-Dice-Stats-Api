import {
	FindPartyMemberById,
	FindUserById,
	FromLocal,
	GetAllPartyMembersInWorld,
	GetPartyMemberById,
	GetWorldFromQuery,
	SendJsonResponse, SendJsonResponseT,
	Timestamp,
} from "../Utils";
import { Request, Response } from "express";
import { NewPartyMemberRequest } from "../Models/Requests/NewPartyMemberRequest";
import { PartyMember } from "../Models/DB/PartyMember";
import source from "../Connection";
import HttpStatusCode from "../Models/HttpStatusCode";
import { AllPartyMembersResponse, PartyMemberResponse, SimplePartyMember } from "../Models/Responses";

export const NewPartyMember = async (req: Request, res: Response): Promise<void> => {
	const body = FromLocal<NewPartyMemberRequest>(res);
	const user = await FindUserById(body.userId);

	if (!user) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, 'Cannot find user');
		return;
	}

	const member = await FindPartyMemberById(body.partyMemberId);

	// If member already exists, we reassign the user
	if (member) {
		member.owner = user;
		member.name = body.name;
		await source.getRepository(PartyMember).save(member);
		SendJsonResponseT<SimplePartyMember>(res, HttpStatusCode.CREATED,
			'Party Member Reassigned: ' + body.name, GetResponse(member));
		return;
	}

	const partyMember = new PartyMember();
	partyMember.owner = user;
	partyMember.created = Timestamp();
	partyMember.id = body.partyMemberId;
	partyMember.name = body.name;
	partyMember.alive = body.alive;

	await source.getRepository(PartyMember).save(partyMember);
	SendJsonResponseT<SimplePartyMember>(res, HttpStatusCode.CREATED,
		'Party Member Created: ' + body.name, GetResponse(partyMember));
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

	SendJsonResponseT<PartyMemberResponse>(res, HttpStatusCode.OK, 'Member found', {
		created: member.created,
		owner: {
			partyMembers: [],
			id: member.owner.id,
			isDm: member.owner.isDm,
			name: member.owner.name,
			created: member.owner.created,
			world: {
				id: world.id,
				name: world.name,
				system: world.system,
				created: world.created,
			},
		},
		id: member.id,
		alive: member.alive,
		name: member.name,
	});
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

	SendJsonResponseT<AllPartyMembersResponse>(res, HttpStatusCode.OK, `Got all (${partyMembers.length}) party members.`,
		{
			members: partyMembers.map(x => GetResponse(x)),
		});
};

const GetResponse = (member: PartyMember): SimplePartyMember => ({
	id: member.id,
	userId: member.owner.id,
	name: member.name,
	alive: member.alive,
	created: member.created,
});
