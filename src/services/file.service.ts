import fs from "fs-extra";
import path from "path";
import { FileOperationRequest, FileResponse } from "../types/file.types";
import { AppError } from "../utils/AppError";

/**
 * Creates or updates a file recursively.
 * @param fileData - Object containing file path and optional content.
 * @returns FileResponse object with path and message.
 * @throws {AppError} If an error occurs during file creation/updating.
 */
export const createOrUpdateFile = async (fileData: FileOperationRequest): Promise<FileResponse> => {
  try {
    const filePath = path.resolve(fileData.path);
    await fs.ensureFile(filePath);
    if (fileData.content) {
      await fs.writeFile(filePath, fileData.content);
    }
    return { path: filePath, message: "File created/updated successfully" };
  } catch (error: unknown) {
    const err = error as Error; // Ensure error has a message
    throw new AppError(`Error creating/updating file: ${err.message}`, 500);
  }
};

/**
 * Reads a file's contents.
 * @param filePath - Path to the file.
 * @returns FileResponse object with file content.
 * @throws {AppError} If the file does not exist or cannot be read.
 */
export const readFile = async (filePath: string): Promise<FileResponse> => {
  try {
    const resolvedPath = path.resolve(filePath);
    if (!(await fs.pathExists(resolvedPath))) {
      throw new AppError("File not found", 404);
    }
    const content = await fs.readFile(resolvedPath, "utf8");
    return { path: resolvedPath, content };
  } catch (error: unknown) {
    const err = error as Error;
    throw new AppError(`Error reading file: ${err.message}`, 500);
  }
};

/**
 * Deletes a file or directory.
 * @param filePath - Path to the file or folder.
 * @returns FileResponse object with success message.
 * @throws {AppError} If the file/folder does not exist or cannot be deleted.
 */
export const deleteFileOrFolder = async (filePath: string): Promise<FileResponse> => {
  try {
    const resolvedPath = path.resolve(filePath);
    if (!(await fs.pathExists(resolvedPath))) {
      throw new AppError("File/Folder not found", 404);
    }
    await fs.remove(resolvedPath);
    return { path: resolvedPath, message: "File/Folder deleted successfully" };
  } catch (error: unknown) {
    const err = error as Error;
    throw new AppError(`Error deleting file/folder: ${err.message}`, 500);
  }
};

