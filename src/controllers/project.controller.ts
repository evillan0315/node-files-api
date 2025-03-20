
import { Request, Response } from "express";
import { createProjectService, getProjectService, updateProjectService, deleteProjectService } from "../services/project.service";
import { handleError } from "../utils/errorHandler";

export const createProject = async (req: Request, res: Response) => {
  try {
    const result = await createProjectService(req.body);
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const result = await getProjectService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const result = await updateProjectService(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const result = await deleteProjectService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};
