import { Request, Response } from "express";
import NewUserRequest from "../Models/Requests/NewUserRequest";
import { SendJsonResponse, Timestamp } from "../Utils";
import HttpStatusCode from "../Models/HttpStatusCode";
import { getType, Type } from "tst-reflect";
import { User } from "../Models/DB/User";

export const CreateUser = async (req: Request, res: Response): Promise<void> => {
	const type: Type = getType<NewUserRequest>();
	const bodyType: Type = getType(req.body);

	console.log(type.isAssignableTo(bodyType));
	console.log(bodyType.isAssignableTo(type));

	if (!type.isAssignableTo(bodyType)) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, { message: "Message body was malformed or invalid." });
		return;
	}

	const body = req.body as NewUserRequest;
	let user = await User.findOne(body.userId);
	if (user) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, { message: "User already exists." });
		return;
	}

	if (body.name.length === 0 || body.userId.length === 0) {
		SendJsonResponse(res, HttpStatusCode.BAD_REQUEST, { message: "Name or id was invalid." });
		return;
	}

	user = new User();
	user.id = body.userId;
	user.name = body.name;
	user.created = Timestamp();

	await user.save();
	SendJsonResponse(res, HttpStatusCode.CREATED, user.toJson());
};

export const GetUser = async (req: Request, res: Response): Promise<void> => {
	if (req.query.name) {
		const user = await User.findOne({ name: `${req.query.name}` });
		if (user) {
			SendJsonResponse(res, HttpStatusCode.FOUND, user.toJson());
		} else {
			SendJsonResponse(res, HttpStatusCode.NOT_FOUND, { message: "Name did not match any known user." });
		}
	} else if (req.query.id) {
		const user = await User.findOne({ id: `${req.query.id}` });
		if (user) {
			SendJsonResponse(res, HttpStatusCode.FOUND, user.toJson());
		} else {
			SendJsonResponse(res, HttpStatusCode.NOT_FOUND, { message: "Id did not match any known user." });
		}
	} else {
		SendJsonResponse(res, HttpStatusCode.NOT_FOUND, { message: "No valid name or id was provided in query." });
	}
};
