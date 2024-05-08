import express from "express";

import { show, create, update, remove, search } from "../controllers/listing.controller.js";
import { varifyToken } from "../utils/varifyUser.js";

const router = express.Router();

router.get("/show/:id", show);
router.post("/create", varifyToken, create);
router.post("/update/:id", varifyToken, update);
router.delete("/delete/:id", varifyToken, remove);

// serch routes
router.get("/search", search);

export default router;