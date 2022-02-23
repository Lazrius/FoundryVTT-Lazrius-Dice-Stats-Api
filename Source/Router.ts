import { Router } from "express";
import * as controller from "./controllers";

export const router = Router();

router.get("/", controller.index);

// User
router.get("/user", controller.GetUser);
router.post("/user/create", controller.CreateUser);
