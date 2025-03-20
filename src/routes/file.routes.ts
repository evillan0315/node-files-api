import express from "express";
import { createFile, getFile, deleteFile } from "../controllers/file.controller";

const router = express.Router();

router.post("/", createFile);   // ✅ Fixed
router.get("/:filePath", getFile);  // ✅ Fixed
router.delete("/:filePath", deleteFile); // ✅ Fixed

export default router;

