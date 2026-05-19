"use client";
import { useCreateUser } from "@/hooks/useCreateUser";

import { CreateUserForm } from "@/features/CreateUserForm";

import "@/styles/features/modals/createUserModal.css";

interface CreateUserModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateUserModal({ onClose, onSuccess }: CreateUserModalProps) {
  const {
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
  } = useCreateUser(onSuccess);

  return (
    <div className="create-user-modal" onClick={onClose}>
      <div 
        className="create-user-modal__modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="create-user-modal__header">
          <h2 className="create-user-modal__title">
            Создать нового пользователя
          </h2>

          <button 
            onClick={onClose} 
            className="create-user-modal__close-button"
            aria-label="Закрыть модальное окно"
          >
            <svg 
              className="create-user-modal__close-icon"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        <div className="create-user-modal__body">
          <CreateUserForm
            formData={formData}
            errors={errors}
            isSubmitting={isSubmitting}
            onFieldChange={updateField}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}