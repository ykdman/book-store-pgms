import { Category } from "../models";
import { httpClient } from "./http";

export const fetchCategory = async () => {
  const response = await httpClient.get<Category[]>("/category");
  return response.data;
};
