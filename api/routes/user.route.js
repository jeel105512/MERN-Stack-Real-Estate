import express from "express";

import { test, update } from "../controllers/user.controller.js";
import { varifyToken } from "../utils/varifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", varifyToken, update);

export default router;