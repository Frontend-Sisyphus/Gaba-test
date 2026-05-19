import apiInstance from "@/utils/api/instance";

import { User } from "@/utils/types/dashboardTypes";

export async function createUser(userData: Partial<User>): Promise<User> {
  const { data } = await apiInstance.post<User>("/users/add", userData);

  return data;
}