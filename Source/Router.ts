import { Router } from "express";
import * as controller from "./controllers";
import TypeValidator from "./Middleware/TypeValidator";
import NewRollRequest from "./Models/Requests/NewRollRequest";
import NewUserRequest from "./Models/Requests/NewUserRequest";
import NewWorldRequest from "./Models/Requests/NewWorldRequest";
import RenameWorldRequest from "./Models/Requests/RenameWorldRequest";

export const router = Router();

router.get("/", controller.index);

// User
router.get("/user", controller.GetUser);
router.post("/user/create", TypeValidator(NewUserRequest), controller.CreateUser);

// Rolls
router.post('/roll/add', TypeValidator(NewRollRequest), controller.NewRoll);

// Session
router.post('/session/begin', controller.BeginSession);
router.post('/session/end', controller.EndSession);

// World
router.post('/world/create', TypeValidator(NewWorldRequest), controller.CreateWorld);
router.post('/world/rename', TypeValidator(RenameWorldRequest), controller.RenameWorld);

// Party Member
router.get('/member/', controller.GetPartyMember);
router.get('/member/all', controller.GetAllPartyMembers);
router.post('/member/create', controller.NewPartyMember);
