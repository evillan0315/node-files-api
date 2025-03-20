
import express from "express";
import { createProject, getProject, updateProject, deleteProject } from "../controllers/project.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: API for managing Projects
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all Projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: A list of Projects
 *   post:
 *     summary: Create a new Project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *     responses:
 *       201:
 *         description: Project created
 *
 * /projects/{id}:
 *   get:
 *     summary: Get a single Project by ID
 *     tags: [Project]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project found
 *   put:
 *     summary: Update a Project by ID
 *     tags: [Project]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *     responses:
 *       200:
 *         description: Project updated
 *   delete:
 *     summary: Delete a Project by ID
 *     tags: [Project]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted
 */

router.get("/", getProject);
router.post("/", createProject);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
