"use client";
import React, { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTanstackQuery } from "@/hooks/useTanstackQuery";

import { deleteUser } from "@/utils/api/delete/user";
import { createUser } from "@/utils/api/create/user";
import { User } from "@/utils/types/dashboardTypes";

import { UsersTable } from "@/widgets/UsersTable";

import { SearchBar } from "@/features/SearchBar";
import { FilterPanel } from "@/features/FilterPanel";
import { Pagination } from "@/features/Pagination";
import { UserDetailsModal } from "@/features/modals/UserDetailsModal";
import { DeleteConfirmModal } from "@/features/modals/DeleteConfirmModal";
import { CreateUserModal } from "@/features/modals/CreateUserModal";

import { EmptyState } from "@/shared/EmptyState";
import { ErrorState } from "@/shared/ErrorState";
import { Spinner } from "@/shared/Spinner";

import "@/styles/pages/dashboardPage.css";

export function DashboardPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState<Record<string, string>>({});

  const [sortBy, setSortBy] = useState("");

  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 

  const limit = 10;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useTanstackQuery({
    page,
    limit,
    search: search || undefined,
    filter: Object.keys(filters).length > 0 ? filters : undefined,
    sortBy: sortBy || undefined,
    order,
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      setUserToDelete(null);
      setSelectedUser(null);
    },
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    setPage(1); 
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); 
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    
    console.debug("Пользователь создан");
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id);
    }
  };

  const users = data?.users || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__container">
        <div className="dashboard-header">
          <div className="dashboard-header__info">
            <h1 className="dashboard-header__title">
              Дашборд пользователей
            </h1>

            <p className="dashboard-header__subtitle">
              {total} пользователей в системе
            </p>
          </div>

          <div className="dashboard-header__actions">
            <button
              onClick={handleOpenCreateModal}
              className="dashboard-header__add-button"
            >
              + Добавить пользователя
            </button>
          </div>
        </div>

        <div className="dashboard-page__filters-section">
          <SearchBar value={search} onChange={handleSearch} />

          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={() => setFilters({})}
          />
        </div>

        {isLoading && <Spinner />}
        
        {isError && (
          <ErrorState 
            message={error instanceof Error ? error.message : "Не получилось загрузить пользователей"}
            onRetry={() => queryClient.invalidateQueries({ queryKey: ["users"] })}
          />
        )}
        
        {!isLoading && !isError && users.length === 0 && (
          <EmptyState
            title="Пользователи не найдены"
            description={search ? `Нет результато по запросу "${search}"` : "Попробуйте поменять фильтры"}
          />
        )}
        
        {!isLoading && !isError && users.length > 0 && (
          <>
            <UsersTable
              users={users}
              onUserClick={setSelectedUser}
              onSort={handleSort}
              sortBy={sortBy}
              order={order}
            />
            
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}

        {isCreateModalOpen && (
          <CreateUserModal
            onClose={handleCloseCreateModal}
            onSuccess={handleCreateSuccess}
          />
        )}

        {selectedUser && !userToDelete && (
          <UserDetailsModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onDelete={handleDelete}
          />
        )}

        {userToDelete && (
          <DeleteConfirmModal
            user={userToDelete}
            onConfirm={confirmDelete}
            onCancel={() => setUserToDelete(null)}
            isLoading={deleteMutation.isPending}
          />
        )}
      </div>
    </div>
  );
}