import apiInstance from "@/utils/api/instance";

import { User } from "@/utils/types/dashboardTypes";

export async function updateUser(id: number, userData: Partial<User>): Promise<User> {
  const { data } = await apiInstance.put<User>(`/users/${id}`, userData);

  return data;
}