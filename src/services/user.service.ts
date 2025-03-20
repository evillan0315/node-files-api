
import { User } from "../types/user.types";

export const createUserService = async (data: User) => {
  return { message: "User created", data };
};

export const getUserService = async (id: string) => {
  return { message: "Returning User with ID " + id };
};

export const updateUserService = async (id: string, data: User) => {
  return { message: "User updated", data };
};

export const deleteUserService = async (id: string) => {
  return { message: "User deleted", id };
};
