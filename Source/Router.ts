import { Router } from "express";
import * as controller from "./controllers";
import TypeValidator from "./Middleware/TypeValidator";
import NewRollRequest from "./Models/Requests/NewRollRequest";

export const router = Router();

router.get("/", controller.index);

// User
router.get("/user", controller.GetUser);
router.post("/user/create", controller.CreateUser);

// Rolls
router.post('/roll/add', TypeValidator(NewRollRequest), controller.NewRoll);

// Session
router.post('/session/begin', controller.BeginSession);
router.post('/session/end', controller.EndSession);
