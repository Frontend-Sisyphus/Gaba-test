import { User } from "@/utils/types/dashboardTypes";

import "@/styles/features/modals/deleteConfirmModal.css";

interface DeleteConfirmModalProps {
  user: User;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeleteConfirmModal({ user, onConfirm, onCancel, isLoading }: DeleteConfirmModalProps) {
  return (
    <div className="delete-confirm" onClick={onCancel}>
      <div className="delete-confirm__modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-confirm__content">
          <div className="delete-confirm__icon-wrapper">
            <svg className="delete-confirm__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>

          <h3 className="delete-confirm__title">Удалить пользователя</h3>

          <p className="delete-confirm__description">
            Вы точно хотите удалить <strong className="delete-confirm__username">{user.firstName} {user.lastName}</strong>? Это действие нельзя будет отменить.
          </p>
        </div>

        <div className="delete-confirm__actions">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="delete-confirm__button delete-confirm__button--cancel"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="delete-confirm__button delete-confirm__button--delete"
          >
            {isLoading ? "Удаление..." : "Удалить"}
          </button>
        </div>
      </div>
    </div>
  );
}