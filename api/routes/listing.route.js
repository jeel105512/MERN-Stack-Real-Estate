import express from "express";

import { show, create, update, remove } from "../controllers/listing.controller.js";
import { varifyToken } from "../utils/varifyUser.js";

const router = express.Router();

router.get("/show/:id", show);
router.post("/create", varifyToken, create);
router.post("/update/:id", varifyToken, update);
router.delete("/delete/:id", varifyToken, remove);

export default router;