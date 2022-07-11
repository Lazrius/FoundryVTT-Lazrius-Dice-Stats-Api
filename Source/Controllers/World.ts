import { Request, Response } from "express";
import {
	FromLocal,
	SendJsonResponse,
	Timestamp,
} from "../Utils";
import HttpStatusCode from "../Models/HttpStatusCode";
import source from "../App";
import NewWorldRequest from "../Models/Requests/NewWorldRequest";
import { World } from "../Models/DB/World";

export const CreateWorld = async (req: Request, res: Response): Promise<void> => {
	const body = FromLocal<NewWorldRequest>(res);

	const world = new World();
	world.created = Timestamp();
	world.name = body.name;
	world.system = body.system;
	world.id = body.worldId;

	await source.getRepository(World).save(world);
	SendJsonResponse(res, HttpStatusCode.CREATED, JSON.stringify(world));
};
