
import express from "express";
import { createTask, getTask, updateTask, deleteTask } from "../controllers/task.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: API for managing Tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all Tasks
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: A list of Tasks
 *   post:
 *     summary: Create a new Task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Task"
 *     responses:
 *       201:
 *         description: Task created
 *
 * /tasks/{id}:
 *   get:
 *     summary: Get a single Task by ID
 *     tags: [Task]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found
 *   put:
 *     summary: Update a Task by ID
 *     tags: [Task]
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
 *             $ref: "#/components/schemas/Task"
 *     responses:
 *       200:
 *         description: Task updated
 *   delete:
 *     summary: Delete a Task by ID
 *     tags: [Task]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */

router.get("/", getTask);
router.post("/", createTask);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
