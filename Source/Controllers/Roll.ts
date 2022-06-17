import { SendJsonResponse } from "../Utils";
import HttpStatusCode from "../Models/HttpStatusCode";
import { Request, Response } from "express";
import NewRollRequest from "../Models/Requests/NewRollRequest";

export const NewRoll = async (req: Request, res: Response): Promise<void> => {
	SendJsonResponse(res, HttpStatusCode.CREATED, '');
};
