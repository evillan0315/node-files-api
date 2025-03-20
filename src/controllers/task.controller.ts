
import { Request, Response } from "express";
import { createTaskService, getTaskService, updateTaskService, deleteTaskService } from "../services/task.service";
import { handleError } from "../utils/errorHandler";

export const createTask = async (req: Request, res: Response) => {
  try {
    const result = await createTaskService(req.body);
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const result = await getTaskService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const result = await updateTaskService(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const result = await deleteTaskService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};
