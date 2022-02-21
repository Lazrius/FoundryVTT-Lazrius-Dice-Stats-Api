import { Request, Response } from "express";
import { getType, Type } from "tst-reflect";
import NewUserRequest from "../Models/Requests/NewUserRequest";
import { SendJsonResponse } from "../Utils";
import HttpStatusCode from "../Models/HttpStatusCode";

export const createUser = (req: Request, res: Response): void => {
	const type: Type = getType<NewUserRequest>();
	if (type.isAssignableTo(getType(req.body))) {
		SendJsonResponse(res, HttpStatusCode.CREATED, {});
	} else {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, { message: "Message body was malformed or invalid." });
	}
};
