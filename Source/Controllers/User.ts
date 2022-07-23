import { Request, Response } from "express";
import NewUserRequest from "../Models/Requests/NewUserRequest";
import {
	FindUserById,
	FindUserByName,
	FromLocal,
	GetWorldFromQuery,
	SendJsonResponse, SendJsonResponseT,
	Timestamp,
} from "../Utils";
import { User } from "../Models/DB/User";
import source from "../App";
import { World } from "../Models/DB/World";
import HttpStatusCode from "../Models/HttpStatusCode";
import { PartyMemberResponse, UserResponse } from "../Models/Responses";

export const CreateUser = async (req: Request, res: Response): Promise<void> => {
	const world = await GetWorldFromQuery(req, res);
	if (!world)
		return;

	const body = FromLocal<NewUserRequest>(res);
	let user = await FindUserById(body.userId);
	if (user) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, "User already exists.");
		return;
	}

	user = new User();
	user.id = body.userId;
	user.name = body.name;
	user.created = Timestamp();
	user.isDm = body.isDm;
	user.world = world;

	await source.getRepository(User).save(user);
	SendJsonResponseT<UserResponse>(res, HttpStatusCode.CREATED, 'Created User: ' + user.name, GetResponse(world, user));
};

export const GetUser = async (req: Request, res: Response): Promise<void> => {
	const world = await GetWorldFromQuery(req, res);
	if (!world)
		return;

	if (req.query.name) {
		const user = await FindUserByName(world.id as string, req.query.name as string);
		if (user) {
			SendJsonResponseT<UserResponse>(res, HttpStatusCode.FOUND, 'Found User: ' + user.name, GetResponse(world, user));
		} else {
			SendJsonResponse(res, HttpStatusCode.NOT_FOUND, "Name did not match any known user.");
		}
	} else if (req.query.id) {
		const user = await FindUserById(req.query.id as string);
		if (user) {
			SendJsonResponseT<UserResponse>(res, HttpStatusCode.FOUND, 'Found User: ' + user.name, GetResponse(world, user));
		} else {
			SendJsonResponse(res, HttpStatusCode.NOT_FOUND, "Id did not match any known user.");
		}
	} else {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, "No valid name or id was provided in query.");
	}
};

const GetResponse = (world: World, user: User): UserResponse => ({
	id: user.id,
	name: user.name,
	created: user.created,
	isDm: user.isDm,
	world: {
		id: world.id,
		created: world.created,
		name: world.name,
		system: world.system,
	},
	partyMembers: [] as PartyMemberResponse[],
});
