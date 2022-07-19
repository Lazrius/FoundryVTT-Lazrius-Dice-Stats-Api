import { Request, Response } from "express";
import { SendJsonResponse } from "../Utils";
import HttpStatusCode from "../Models/HttpStatusCode";

// Re-export all our other files
export { CreateUser, GetUser } from "./User";
export { NewRoll } from "./Roll";
export { BeginSession, EndSession } from "./Session";
export { CreateWorld, RenameWorld } from "./World";
export { GetAllPartyMembers, GetPartyMember, NewPartyMember } from './PartyMember';

export const index = async (req: Request, res: Response): Promise<void> => {
	SendJsonResponse(res, HttpStatusCode.OK, 'If you got it here, it works');
};
