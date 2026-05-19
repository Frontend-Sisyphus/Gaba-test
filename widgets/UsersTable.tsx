import { User } from "@/utils/types/dashboardTypes";

import { ROLE_VARIANTS } from "@/data/constants";

import { Badge } from "@/shared/Badge";

import "@/styles/widgets/usersTable.css";

interface UsersTableProps {
  users: User[];
  onUserClick: (user: User) => void;
  onSort: (column: string) => void;
  sortBy?: string;
  order?: "asc" | "desc";
}

export function UsersTable({ users, onUserClick, onSort, sortBy, order }: UsersTableProps) {
  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) {
      return (
        <svg className="sort-icon sort-icon--inactive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return (
      <svg className={`sort-icon sort-icon--active ${order === "desc" ? "sort-icon--desc" : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  };

  const columns = [
    { key: "firstName", label: "Имя", sortable: true },
    { key: "age", label: "Возраст", sortable: true },
    { key: "email", label: "Email", sortable: false },
    { key: "address.city", label: "Город", sortable: false },
    { key: "role", label: "Роль", sortable: false },
    { key: "company.name", label: "Компания", sortable: false },
  ];

  return (
    <div className="users-table">
      <div className="users-table__scroll">
        <table className="users-table__table">
          <thead>
            <tr className="users-table__head">
              <th className="users-table__head-cell">
                Пользователь
              </th>

              {columns.map(col => (
                <th
                  key={col.key}
                  className={`users-table__head-cell ${col.sortable ? "users-table__head-cell--sortable" : ""}`}
                  onClick={() => col.sortable && onSort(col.key)}
                >
                  {col.label} {col.sortable && <SortIcon column={col.key} />}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="users-table__body">
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => onUserClick(user)}
                className="users-table__row"
              >
                <td className="users-table__cell">
                  <div className="users-table__avatar-wrapper">
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="users-table__avatar"
                    />
                  </div>
                </td>

                <td className="users-table__user-info users-table__cell">
                  <div className="users-table__user-name">
                    {user.firstName} {user.lastName}
                  </div>

                  <div className="users-table__user-username">
                    @{user.username}
                  </div>
                </td>

                <td className="users-table__cell">
                  <span className="users-table__age-badge">
                    {user.age}
                  </span>
                </td>

                <td className="users-table__cell users-table__email">
                  {user.email}
                </td>

                <td className="users-table__cell users-table__city">
                  {user.address.city}
                </td>

                <td className="users-table__cell">
                  <Badge variant={ROLE_VARIANTS[user.role] || "default"}>
                    {user.role}
                  </Badge>
                </td>

                <td className="users-table__company">
                  {user.company.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}