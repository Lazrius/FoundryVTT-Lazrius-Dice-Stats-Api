import { Request, Response } from "express";
import { FindWorldById, FromLocal, GetWorldFromQuery, SendJsonResponse, SendJsonResponseT, Timestamp } from "../Utils";
import source from "../Connection";
import NewWorldRequest from "../Models/Requests/NewWorldRequest";
import { World } from "../Models/DB/World";
import HttpStatusCode from "../Models/HttpStatusCode";
import { WorldResponse } from "../Models/Responses";

export const GetWorld = async (req: Request, res: Response): Promise<void> => {
	const world = await GetWorldFromQuery(req, res);
	if (!world) {
		return;
	}

	SendJsonResponseT<WorldResponse>(res, HttpStatusCode.OK, 'World data found', {
		id: world.id,
		created: world.created,
		name: world.name,
		system: world.system,
	});
};

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
	SendJsonResponseT<WorldResponse>(res, HttpStatusCode.CREATED, 'World Created: ' + world.name, {
		id: world.id,
		created: world.created,
		system: world.system,
		name: world.name,
	});
};

export const UpdateWorld = async (req: Request, res: Response): Promise<void> => {
	const body = FromLocal<NewWorldRequest>(res);

	const existingWorld = await FindWorldById(body.worldId);
	if (!existingWorld) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, 'World does not exist.');
		return;
	}

	await source.createQueryBuilder()
		.update(World)
		.set({ name: body.name, system: body.system })
		.where("id = :id", { id: existingWorld.id })
		.execute();

	SendJsonResponse(res, HttpStatusCode.OK, 'Updated World Data');
};
