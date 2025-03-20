import { Request, Response, NextFunction } from "express";
import { createOrUpdateFile, readFile, deleteFileOrFolder } from "../services/file.service";
import { FileOperationRequest } from "../types/file.types";
import { AppError } from "../utils/AppError";

/**
 * @swagger
 * /files:
 *   post:
 *     summary: Create or update a file
 *     description: Creates a file and any missing directories. If the file exists, it updates the content.
 *     tags: [File Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 example: "src/utils/test.txt"
 *               content:
 *                 type: string
 *                 example: "Hello, world!"
 *     responses:
 *       201:
 *         description: File created or updated successfully.
 *       400:
 *         description: Bad request - missing file path.
 *       500:
 *         description: Internal server error.
 */
export const createFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const fileData: FileOperationRequest = req.body;
    if (!fileData.path) {
      throw new AppError("File path is required", 400);
    }
    const response = await createOrUpdateFile(fileData);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /files/{filePath}:
 *   get:
 *     summary: Read a file
 *     description: Retrieves the contents of a file.
 *     tags: [File Management]
 *     parameters:
 *       - in: path
 *         name: filePath
 *         required: true
 *         schema:
 *           type: string
 *         example: "src/utils/test.txt"
 *     responses:
 *       200:
 *         description: File retrieved successfully.
 *       404:
 *         description: File not found.
 *       500:
 *         description: Internal server error.
 */
export const getFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { filePath } = req.params;
    const response = await readFile(filePath);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /files/{filePath}:
 *   delete:
 *     summary: Delete a file or directory
 *     description: Deletes a file or folder from the system.
 *     tags: [File Management]
 *     parameters:
 *       - in: path
 *         name: filePath
 *         required: true
 *         schema:
 *           type: string
 *         example: "src/utils/test.txt"
 *     responses:
 *       200:
 *         description: File or folder deleted successfully.
 *       404:
 *         description: File or folder not found.
 *       500:
 *         description: Internal server error.
 */
export const deleteFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { filePath } = req.params;
    const response = await deleteFileOrFolder(filePath);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

