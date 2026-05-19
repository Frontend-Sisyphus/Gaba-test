
import { CreateUserFormData, FormErrors } from "@/utils/types/formTypes";

import "@/styles/features/createUserForm.css";

interface CreateUserFormProps {
  formData: CreateUserFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  onFieldChange: <K extends keyof CreateUserFormData>(field: K, value: CreateUserFormData[K]) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

function FormField({ 
  label, 
  error, 
  isFullWidth, 
  children 
}: { 
  label: string; 
  error?: string; 
  isFullWidth?: boolean; 
  children: React.ReactNode; 
}) {
  return (
    <div className={`create-user-form__field ${isFullWidth ? "create-user-form__field--full" : ""}`}>
      <label className="create-user-form__label">{label}</label>

      {children}

      {error && <p className="create-user-form__error">{error}</p>}
    </div>
  );
}

export function CreateUserForm({
  formData,
  errors,
  isSubmitting,
  onFieldChange,
  onSubmit,
  onCancel,
}: CreateUserFormProps) {
  return (
    <div className="create-user-form">
      <div className="create-user-form__section">
        <h3 className="create-user-form__section-title">
          Личная информация
        </h3>

        <div className="create-user-form__grid">
          <FormField label="Имя" error={errors.firstName}>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => onFieldChange("firstName", e.target.value)}
              className={`create-user-form__input ${errors.firstName ? "create-user-form__input--error" : ""}`}
              placeholder="Джон"
            />
          </FormField>

          <FormField label="Фамилия" error={errors.lastName}>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => onFieldChange("lastName", e.target.value)}
              className={`create-user-form__input ${errors.lastName ? "create-user-form__input--error" : ""}`}
              placeholder="Доу"
            />
          </FormField>

          <FormField label="Отчество">
            <input
              type="text"
              value={formData.maidenName}
              onChange={(e) => onFieldChange("maidenName", e.target.value)}
              className="create-user-form__input"
              placeholder="Опционально"
            />
          </FormField>

          <FormField label="Возраст" error={errors.age}>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => onFieldChange("age", Number(e.target.value))}
              className={`create-user-form__input ${errors.age ? "create-user-form__input--error" : ""}`}
              min="18"
              max="100"
            />
          </FormField>

          <FormField label="Пол">
            <select
              value={formData.gender}
              onChange={(e) => onFieldChange("gender", e.target.value as "male" | "female")}
              className="create-user-form__select"
            >
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </FormField>

          <FormField label="Дата рождения" error={errors.birthDate}>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => onFieldChange("birthDate", e.target.value)}
              className={`create-user-form__input ${errors.birthDate ? "create-user-form__input--error" : ""}`}
            />
          </FormField>

          <FormField label="Группа крови">
            <select
              value={formData.bloodGroup}
              onChange={(e) => onFieldChange("bloodGroup", e.target.value)}
              className="create-user-form__select"
            >
              <option value="">Выбрать</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Цвет глаз">
            <input
              type="text"
              value={formData.eyeColor}
              onChange={(e) => onFieldChange("eyeColor", e.target.value)}
              className="create-user-form__input"
              placeholder="Карие"
            />
          </FormField>

          <FormField label="Рост (см)">
            <input
              type="number"
              value={formData.height || ""}
              onChange={(e) => onFieldChange("height", Number(e.target.value))}
              className="create-user-form__input"
              placeholder="170"
            />
          </FormField>

          <FormField label="Вес (кг)">
            <input
              type="number"
              value={formData.weight || ""}
              onChange={(e) => onFieldChange("weight", Number(e.target.value))}
              className="create-user-form__input"
              placeholder="70"
            />
          </FormField>

          <FormField label="Роль">
            <select
              value={formData.role}
              onChange={(e) => onFieldChange("role", e.target.value as "admin" | "moderator" | "user")}
              className="create-user-form__select"
            >
              <option value="user">Пользователь</option>
              <option value="moderator">Модератор</option>
              <option value="admin">Админ</option>
            </select>
          </FormField>
        </div>
      </div>

      <div className="create-user-form__section">
        <h3 className="create-user-form__section-title">
          Контактная информация
        </h3>

        <div className="create-user-form__grid">
          <FormField label="Email" error={errors.email}>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onFieldChange("email", e.target.value)}
              className={`create-user-form__input ${errors.email ? "create-user-form__input--error" : ""}`}
              placeholder="john@example.com"
            />
          </FormField>

          <FormField label="Телефон" error={errors.phone}>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onFieldChange("phone", e.target.value)}
              className={`create-user-form__input ${errors.phone ? "create-user-form__input--error" : ""}`}
              placeholder="+1 234-567-8900"
            />
          </FormField>

          <FormField label="Никнейм" error={errors.username}>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => onFieldChange("username", e.target.value)}
              className={`create-user-form__input ${errors.username ? "create-user-form__input--error" : ""}`}
              placeholder="johndoe"
            />
          </FormField>

          <FormField label="Пароль" error={errors.password}>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => onFieldChange("password", e.target.value)}
              className={`create-user-form__input ${errors.password ? "create-user-form__input--error" : ""}`}
              placeholder="Минимум 6 символов"
            />
          </FormField>
        </div>
      </div>

      <div className="create-user-form__section">
        <h3 className="create-user-form__section-title">
          Адрес
        </h3>

        <div className="create-user-form__grid">
          <FormField label="Улица" isFullWidth>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => onFieldChange("address", e.target.value)}
              className="create-user-form__input"
              placeholder="Улица Пушкина 8"
            />
          </FormField>

          <FormField label="Город">
            <input
              type="text"
              value={formData.city}
              onChange={(e) => onFieldChange("city", e.target.value)}
              className="create-user-form__input"
              placeholder="Москва"
            />
          </FormField>

          <FormField label="Государство">
            <input
              type="text"
              value={formData.state}
              onChange={(e) => onFieldChange("state", e.target.value)}
              className="create-user-form__input"
              placeholder="Россия"
            />
          </FormField>

          <FormField label="Почтовый индекс">
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => onFieldChange("postalCode", e.target.value)}
              className="create-user-form__input"
              placeholder="10001"
            />
          </FormField>
        </div>
      </div>

      <div className="create-user-form__section">
        <h3 className="create-user-form__section-title">
          Компания
        </h3>

        <div className="create-user-form__grid">
          <FormField label="Название компании">
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => onFieldChange("companyName", e.target.value)}
              className="create-user-form__input"
              placeholder="Яндекс"
            />
          </FormField>

          <FormField label="Департамент">
            <input
              type="text"
              value={formData.department}
              onChange={(e) => onFieldChange("department", e.target.value)}
              className="create-user-form__input"
              placeholder="Инженерный"
            />
          </FormField>

          <FormField label="Должность">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => onFieldChange("title", e.target.value)}
              className="create-user-form__input"
              placeholder="Разработчик"
            />
          </FormField>
        </div>
      </div>

      <div className="create-user-form__actions">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="create-user-form__cancel-button"
        >
          Отменить
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="create-user-form__submit-button"
        >
          {isSubmitting ? "Создается..." : "Создать пользователя"}
        </button>
      </div>
    </div>
  );
}