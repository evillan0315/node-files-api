
import { Task } from "../types/task.types";

export const createTaskService = async (data: Task) => {
  return { message: "Task created", data };
};

export const getTaskService = async (id: string) => {
  return { message: "Returning Task with ID " + id };
};

export const updateTaskService = async (id: string, data: Task) => {
  return { message: "Task updated", data };
};

export const deleteTaskService = async (id: string) => {
  return { message: "Task deleted", id };
};
