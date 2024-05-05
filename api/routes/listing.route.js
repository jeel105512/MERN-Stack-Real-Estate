import express from "express";

import { create, update, remove } from "../controllers/listing.controller.js";
import { varifyToken } from "../utils/varifyUser.js";

const router = express.Router();

router.post("/create", varifyToken, create);
router.post("/update/:id", varifyToken, update);
router.delete("/delete/:id", varifyToken, remove);

export default router;