import express from "express";

import { create, remove } from "../controllers/listing.controller.js";
import { varifyToken } from "../utils/varifyUser.js";

const router = express.Router();

router.post("/create", varifyToken, create);
router.delete("/delete/:id", varifyToken, remove);

export default router;