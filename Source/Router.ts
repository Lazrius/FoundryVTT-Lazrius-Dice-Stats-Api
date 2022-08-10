import { Request, Response, Router } from "express";
import TypeValidator from "./Middleware/TypeValidator";
import NewRollRequest from "./Models/Requests/NewRollRequest";
import NewUserRequest from "./Models/Requests/NewUserRequest";
import NewWorldRequest from "./Models/Requests/NewWorldRequest";
import RenameWorldRequest from "./Models/Requests/RenameWorldRequest";
import { SendJsonResponse } from "./Utils";
import HttpStatusCode from "./Models/HttpStatusCode";
import { CreateUser, GetAllUsersInWorld, GetUser } from "./Controllers/User";
import { NewRoll } from "./Controllers/Roll";
import { BeginSession, EndSession, GetCurrentSession } from "./Controllers/Session";
import { CreateWorld, RenameWorld } from "./Controllers/World";
import { GetAllPartyMembers, GetPartyMember, NewPartyMember } from "./Controllers/PartyMember";

export const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
	SendJsonResponse(res, HttpStatusCode.OK, 'If you got it here, it works');
});

// User
router.get("/user", GetUser);
router.get("/user/all", GetAllUsersInWorld);
router.post("/user/create", TypeValidator(NewUserRequest), CreateUser);

// Rolls
router.post('/roll/add', TypeValidator(NewRollRequest), NewRoll);

// Session
router.get('/session', GetCurrentSession);
router.post('/session/begin', BeginSession);
router.post('/session/end', EndSession);

// World
router.post('/world/create', TypeValidator(NewWorldRequest), CreateWorld);
router.post('/world/rename', TypeValidator(RenameWorldRequest), RenameWorld);

// Party Member
router.get('/member/', GetPartyMember);
router.get('/member/all', GetAllPartyMembers);
router.post('/member/create', NewPartyMember);
