import express from "express";
import {
  createResource,
//   getTestMessage,
  getResources,
  deleteResource,
  updateResource,
} from "../controllers/resourceController.js";

const router = express.Router();

// router.get("/test", getTestMessage);
router.post("/", createResource);
router.get("/", getResources);
router.delete("/:id", deleteResource);
router.put("/:id", updateResource);

export default router;
