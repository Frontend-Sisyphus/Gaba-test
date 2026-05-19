import apiInstance from "@/utils/api/instance";

import { User } from "@/utils/types/dashboardTypes";

export async function deleteUser(id: number): Promise<User & { isDeleted: boolean; deletedOn: string }> {
  const { data } = await apiInstance.delete(`/users/${id}`);

  return data;
}