import apiInstance from "@/utils/api/instance";

import { User, UsersResponse } from "@/utils/types/dashboardTypes";

// Типы
interface GetUsersOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  select?: string[];
}

interface SearchUsersOptions {
  query: string;
  page?: number;
  limit?: number;
}

interface FilterUsersOptions {
  key: string;
  value: string;
  page?: number;
  limit?: number;
}

// Функции для построения параметров
function buildPaginationParams(page: number, limit: number) {
  return {
    limit,
    skip: (page - 1) * limit,
  };
}

function buildSortParams(sortBy?: string, order?: "asc" | "desc") {
  const params: Record<string, string> = {};

  if (sortBy) params.sortBy = sortBy;
  if (order) params.order = order;

  return params;
}

function buildSelectParams(select?: string[]) {
  return select?.length ? { select: select.join(',') } : {};
}

export async function getUsers(options: GetUsersOptions = {}): Promise<UsersResponse> {
  const { page = 1, limit = 10, sortBy, order, select } = options;

  const { data } = await apiInstance.get<UsersResponse>("/users", {
    params: {
      ...buildPaginationParams(page, limit),
      ...buildSortParams(sortBy, order),
      ...buildSelectParams(select),
    },
  });

  return data;
}

export async function searchUsers(options: SearchUsersOptions): Promise<UsersResponse> {
  const { query, page = 1, limit = 10 } = options;

  const { data } = await apiInstance.get<UsersResponse>("/users/search", {
    params: {
      q: query,
      ...buildPaginationParams(page, limit),
    },
  });

  return data;
}

export async function filterUsers(options: FilterUsersOptions): Promise<UsersResponse> {
  const { key, value, page = 1, limit = 10 } = options;

  const { data } = await apiInstance.get<UsersResponse>("/users/filter", {
    params: {
      key,
      value,
      ...buildPaginationParams(page, limit),
    },
  });

  return data;
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await apiInstance.get<User>(`/users/${id}`);

  return data;
}

export async function getUserPosts(userId: number) {
  const { data } = await apiInstance.get(`/users/${userId}/posts`);
  return data;
}

export async function getUserTodos(userId: number) {
  const { data } = await apiInstance.get(`/users/${userId}/todos`);
  return data;
}

export async function getUserCarts(userId: number) {
  const { data } = await apiInstance.get(`/users/${userId}/carts`);
  return data;
}