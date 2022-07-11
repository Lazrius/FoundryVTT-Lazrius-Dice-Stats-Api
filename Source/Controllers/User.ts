import { Request, Response } from "express";
import NewUserRequest from "../Models/Requests/NewUserRequest";
import {
	FindUserById,
	FindUserByName,
	FromLocal,
	GetWorldFromQuery,
	SendJsonResponse,
	Timestamp,
} from "../Utils";
import HttpStatusCode from "../Models/HttpStatusCode";
import { User } from "../Models/DB/User";
import source from "../App";

export const CreateUser = async (req: Request, res: Response): Promise<void> => {
	const world = await GetWorldFromQuery(req, res);
	if (!world)
		return;

	const body = FromLocal<NewUserRequest>(res);
	let user = await FindUserById(body.userId);
	if (user) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, { message: "User already exists." });
		return;
	}

	user = new User();
	user.id = body.userId;
	user.name = body.name;
	user.created = Timestamp();
	user.isDm = body.isDm;
	user.world = world;

	await source.getRepository(User).save(user);
	SendJsonResponse(res, HttpStatusCode.CREATED, JSON.stringify(user));
};

export const GetUser = async (req: Request, res: Response): Promise<void> => {
	if (req.query.name) {
		const world = await GetWorldFromQuery(req, res);
		if (!world)
			return;

		const user = await FindUserByName(world.id as string, req.query.name as string);
		if (user) {
			SendJsonResponse(res, HttpStatusCode.FOUND, JSON.stringify(user));
		} else {
			SendJsonResponse(res, HttpStatusCode.NOT_FOUND, { message: "Name did not match any known user." });
		}
	} else if (req.query.id) {
		const user = await FindUserById(req.query.id as string);
		if (user) {
			SendJsonResponse(res, HttpStatusCode.FOUND, JSON.stringify(user));
		} else {
			SendJsonResponse(res, HttpStatusCode.NOT_FOUND, { message: "Id did not match any known user." });
		}
	} else {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, { message: "No valid name or id was provided in query." });
	}
};
