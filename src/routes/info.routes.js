import express from "express";
import {
  createWebsiteInfo,
  getAllWebsites,
  updateWebsiteInfo,
  deleteWebsiteInfo,
} from "../controllers/info.controller.js";

const router = express.Router();

// CREATE - POST /api/info
router.post("/post", createWebsiteInfo);

// READ - GET /api/info
router.get("/getall", getAllWebsites);

// UPDATE - PUT /api/info/:id
router.put("/:id/update", updateWebsiteInfo);

// DELETE - DELETE /api/info/:id
router.delete("/:id/delete", deleteWebsiteInfo);

export default router;
