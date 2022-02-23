import { Request, Response } from "express";

// Re-export all our other files
export { CreateUser, GetUser } from "./User";

export const index = async (req: Request, res: Response): Promise<void> => {
	res.status(200).send(`{ "message": "if you got here it's working" }`);
};
