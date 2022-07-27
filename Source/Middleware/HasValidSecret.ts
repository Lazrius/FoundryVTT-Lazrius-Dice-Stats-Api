import { NextFunction, Request, Response } from "express";

export const HasValidSecret = (req: Request, res: Response, next: NextFunction): void => {
	const secret = process.env.secret || "";
	if (secret.length === 0) {
		next();
		return;
	}

	const key = req.get('x-api-key');
	if (!key) {
		res.status(400).send('{ "message": "Secret not provided but was requested." }');
		return;
	}

	if (key !== secret) {
		res.status(400).send('{ "message": "Secret was provided but did not match." }');
		return;
	}

	next();
};
