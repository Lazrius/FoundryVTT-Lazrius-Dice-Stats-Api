import { Response } from "express";
import HttpStatusCode from "./Models/HttpStatusCode";
import source from "./App";
import { World } from "./Models/DB/World";
import { User } from "./Models/DB/User";
export type UnknownObject = Record<string, unknown>;

export const RandomID = (length = 16): string => {
	const rnd = () => Math.random().toString(36).substr(2);
	let id = "";
	while (id.length < length)
		id += rnd();
	return id.substring(0, length);
};

export const SendJsonResponse = (res: Response, status: HttpStatusCode, obj: UnknownObject | string): void => {
	res.setHeader('Content-Type', 'application/json');
	if (typeof(obj) === 'string')
		res.status(status).send(obj);
	else
		res.status(status).send(JSON.stringify(obj));
};

export const Timestamp = (): number => ~~(Date.now() / 1000);

// Db Queries
export const FindWorldById = (id: string): Promise<World> | null => source.getRepository(World).findOneBy({ id });
export const FindUserById = (id: string): Promise<User> | null => source.getRepository(User).findOneBy({ id });
export const FindUserByName = (world: string, name: string): Promise<User> | null => source.getRepository(User)
	.findOne({ relations: { world: true }, where: { name: name, world: { id: world } } });
