import { ResetPasswordProps } from "../../pages/ResetPassword";
import { SignupProps } from "../../pages/Signup";
import { httpClient } from "./http";

export const signup = async (userData: SignupProps) => {
  const response = await httpClient.post("/users/join", userData);
  return response.data;
};

export const resetRequest = async (data: ResetPasswordProps) => {
  const response = await httpClient.post("/users/reset", data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordProps) => {
  const response = await httpClient.put("/users/reset", data);
  return response.data;
};

interface LoginResponse {
  token: string;
}

export const login = async (data: ResetPasswordProps) => {
  const response = await httpClient.post<LoginResponse>("/users/login", data);

  return response.data;
};
