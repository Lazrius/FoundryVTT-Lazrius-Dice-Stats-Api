import { Request, Response } from "express";
import { GetActiveSession, SendJsonResponse, SendJsonResponseT, Timestamp } from "../Utils";
import source from "../Connection";
import { Session } from "../Models/DB/Session";
import HttpStatusCode from "../Models/HttpStatusCode";
import { SessionEnded, SessionStarted } from "../Models/Responses";

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

	SendJsonResponseT<SessionEnded>(res, HttpStatusCode.OK, 'Session ended.', {
		id: session.id,
		started: session.started,
		finished: session.finished,
	});
};

export const GetCurrentSession = async (req: Request, res: Response): Promise<void> => {
	const session = await GetActiveSession();
	if (!session) {
		SendJsonResponse(res, HttpStatusCode.OK, 'No session is active');
	} else {
		SendJsonResponseT<SessionEnded>(res, HttpStatusCode.OK, 'Active Session', {
			id: session.id,
			started: session.started,
		});
	}
};
