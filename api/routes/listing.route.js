import express from "express";

import { create } from "../controllers/listing.controller.js";
import { varifyToken } from "../utils/varifyUser.js";

const router = express.Router();

router.post("/create", varifyToken, create);

export default router;