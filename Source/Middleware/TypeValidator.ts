/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../Models/HttpStatusCode";
import { transformAndValidate } from "class-transformer-validator";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TypeValidator = (type: any) => (req: Request, res: Response, next: NextFunction) => {
	transformAndValidate(type, req.body, {
		validator: {
			whitelist: true,
			forbidNonWhitelisted: true,
		},
	})
		.then((obj: unknown) => {
			res.locals.obj = obj;
			next();
		})
		.catch(err => {
			let errorTexts: Array<{[p: string]: string}> = err.constraints || [];
			const iter = (arr: Array<any>) => {
				for (const errorItem of arr) {
					if (errorItem.constraints)
						errorTexts = errorTexts.concat(errorItem.constraints);
					if (errorItem.children) {
						iter(errorItem.children);
					}
				}
			};

			iter(err);

			res.status(HttpStatusCode.BAD_REQUEST).send(errorTexts);
			return;
		});
	/*validate(output, {
		forbidUnknownValues: true,
	}).then(errors => {
		// errors is an array of validation errors
		if (errors.length > 0) {
			console.log(errors);
			let errorTexts: Array<{[p: string]: string}> = [];
			for (const errorItem of errors) {
				errorTexts = errorTexts.concat(errorItem.constraints);
			}
			res.status(HttpStatusCode.BAD_REQUEST).send(errorTexts);
			return;
		} else {
			res.locals.input = output;
			next();
		}
	});*/
};

export default TypeValidator;
