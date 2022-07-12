import { Request, Response } from "express";
import { FindWorldById, FromLocal, SendJsonResponse, Timestamp } from "../Utils";
import HttpStatusCode from "../Models/HttpStatusCode";
import source from "../App";
import NewWorldRequest from "../Models/Requests/NewWorldRequest";
import { World } from "../Models/DB/World";
import RenameWorldRequest from "../Models/Requests/RenameWorldRequest";

export const CreateWorld = async (req: Request, res: Response): Promise<void> => {
	const body = FromLocal<NewWorldRequest>(res);

	const existingWorld = await FindWorldById(body.worldId);
	if (existingWorld) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, 'World already created.');
		return;
	}


	const world = new World();
	world.created = Timestamp();
	world.name = body.name;
	world.system = body.system;
	world.id = body.worldId;

	await source.getRepository(World).save(world);
	SendJsonResponse(res, HttpStatusCode.CREATED, 'World Created: ' + world.name, world);
};

export const RenameWorld = async (req: Request, res: Response): Promise<void> => {
	const body = FromLocal<RenameWorldRequest>(res);

	const existingWorld = await FindWorldById(body.worldId);
	if (!existingWorld) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, 'World does not exist.');
		return;
	}

	await source.createQueryBuilder()
		.update(World)
		.set({ name: body.newWorldName })
		.where("id = :id", { id: existingWorld.id })
		.execute();

	SendJsonResponse(res, HttpStatusCode.OK, 'Updated Name To ' + body.newWorldName);
};
