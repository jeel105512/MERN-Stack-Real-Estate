import express from "express";

import { test, update, remove, listings } from "../controllers/user.controller.js";
import { varifyToken } from "../utils/varifyUser.js";

const router = express.Router();

router.get("/test", test);
router.get("/listings/:id", varifyToken, listings);
router.post("/update/:id", varifyToken, update);
router.delete("/delete/:id", varifyToken, remove);

export default router;