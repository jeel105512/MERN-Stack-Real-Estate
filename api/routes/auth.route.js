import express from "express";

import { signup, signin, google, signout } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/sign-out", signout);
router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/google", google);

export default router;
