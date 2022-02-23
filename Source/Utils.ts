import { Response } from "express";
import HttpStatusCode from "./Models/HttpStatusCode";
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
