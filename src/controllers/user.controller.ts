
import { Request, Response } from "express";
import { createUserService, getUserService, updateUserService, deleteUserService } from "../services/user.service";
import { handleError } from "../utils/errorHandler";

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await createUserService(req.body);
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const result = await getUserService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await updateUserService(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await deleteUserService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};
