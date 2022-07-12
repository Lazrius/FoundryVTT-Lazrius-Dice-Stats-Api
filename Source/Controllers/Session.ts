import { Request, Response } from "express";
import { GetActiveSession, SendJsonResponse, Timestamp } from "../Utils";
import HttpStatusCode from "../Models/HttpStatusCode";
import source from "../App";
import { Session } from "../Models/DB/Session";

export const BeginSession = async (req: Request, res: Response): Promise<void> => {
	let session = await GetActiveSession();
	if (session) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, 'A session is already active');
		return;
	}

	session = new Session();
	session.started = Timestamp();
	session.rolls = Promise.resolve([]);

	await source.getRepository(Session).save(session);

	SendJsonResponse(res, HttpStatusCode.CREATED, JSON.stringify(session));
};

export const EndSession = async (req: Request, res: Response): Promise<void> => {
	const session = await GetActiveSession();
	if (!session) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, 'No session is active');
		return;
	}

	session.finished = Timestamp();

	await source.getRepository(Session).save(session);

	SendJsonResponse(res, HttpStatusCode.CREATED, JSON.stringify(session));
};
