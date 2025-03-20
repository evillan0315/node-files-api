
import { Project } from "../types/project.types";

export const createProjectService = async (data: Project) => {
  return { message: "Project created", data };
};

export const getProjectService = async (id: string) => {
  return { message: "Returning Project with ID " + id };
};

export const updateProjectService = async (id: string, data: Project) => {
  return { message: "Project updated", data };
};

export const deleteProjectService = async (id: string) => {
  return { message: "Project deleted", id };
};
