import { Request, Response } from "express";
import { GetActiveSession, SendJsonResponse, SendJsonResponseT, Timestamp } from "../Utils";
import HttpStatusCode from "../Models/HttpStatusCode";
import source from "../App";
import { Session } from "../Models/DB/Session";
import { SessionEnded } from "../Models/Responses/SessionEnded";
import { SessionStarted } from "../Models/Responses/SessionStarted";

export const BeginSession = async (req: Request, res: Response): Promise<void> => {
	let session = await GetActiveSession();
	if (session) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, 'A session is already active');
		return;
	}

	session = new Session();
	session.started = Timestamp();
	session.rolls = Promise.resolve([]);

	session = await source.getRepository(Session).save(session);

	SendJsonResponseT<SessionStarted>(res, HttpStatusCode.CREATED, 'Session started.', {
		id: session.id,
		started: session.started,
	});
};

export const EndSession = async (req: Request, res: Response): Promise<void> => {
	let session = await GetActiveSession();
	if (!session) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, 'No session is active');
		return;
	}

	session.finished = Timestamp();

	session = await source.getRepository(Session).save(session);

	SendJsonResponseT<SessionEnded>(res, HttpStatusCode.CREATED, 'Session ended.', {
		id: session.id,
		started: session.started,
		finished: session.finished,
	});
};
