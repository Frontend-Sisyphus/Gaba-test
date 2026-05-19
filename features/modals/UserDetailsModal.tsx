import { User } from "@/utils/types/dashboardTypes";

import { ROLE_VARIANTS } from "@/data/constants";

import { Badge } from "@/shared/Badge";

import "@/styles/features/modals/userDetailsModal.css";

interface UserDetailsModalProps {
  user: User;
  onClose: () => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="info-section">
      <h3 className="info-section__title">{title}</h3>
      <div className="info-section__content">{children}</div>
    </div>
  );
}

function InfoRow({ label, value, isMono, isCode }: { label: string; value: string | number; isMono?: boolean; isCode?: boolean }) {
  return (
    <div className="info-row">
      <span className="info-row__label">{label}</span>
      <span className={`info-row__value ${isMono ? "info-row__value--mono" : ""} ${isCode ? "info-row__value--code" : ""}`}>
        {value}
      </span>
    </div>
  );
}

export function UserDetailsModal({ user, onClose, onEdit, onDelete }: UserDetailsModalProps) {
  return (
    <div className="user-details" onClick={onClose}>
      <div
        className="user-details__modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="user-details__header">
          <div className="user-details__header-info">
            <img src={user.image} alt={user.firstName} className="user-details__avatar" />
            
            <div className="user-details__name-wrapper">
              <h2 className="user-details__name">
                {user.firstName} {user.lastName}

                {user.maidenName && (
                  <span className="user-details__maiden-name"> ({user.maidenName})</span>
                )}
              </h2>

              <div className="user-details__meta">
                <Badge variant={ROLE_VARIANTS[user.role]}>{user.role}</Badge>

                <span className="user-details__meta-separator">•</span>

                <span className="user-details__meta-text">{user.company.title}</span>
                
                <span className="user-details__meta-separator">•</span>

                <span className="user-details__meta-text">{user.company.department}</span>
              </div>
            </div>
          </div>

          <div className="user-details__actions">
            {onEdit && (
              <button 
                onClick={() => onEdit(user)} 
                className="user-details__action-button user-details__action-button--edit"
              >
                Редактировать
              </button>
            )}

            {onDelete && (
              <button 
                onClick={() => onDelete(user)} 
                className="user-details__action-button user-details__action-button--delete"
              >
                Удалить
              </button>
            )}

            <button onClick={onClose} className="user-details__close-button">
              <svg className="user-details__close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="user-details__body">
          <InfoSection title="Персональная информация">
            <InfoRow label="Возраст" value={user.age} />
            <InfoRow label="Пол" value={user.gender} />
            <InfoRow label="Дата рождения" value={user.birthDate} />
            <InfoRow label="Группа крови" value={user.bloodGroup} />
            <InfoRow label="Рост" value={`${user.height} см`} />
            <InfoRow label="Вес" value={`${user.weight} кг`} />
            <InfoRow label="Цвет глаз" value={user.eyeColor} />
            <InfoRow label="Прическа" value={`${user.hair.color}, ${user.hair.type}`} />
          </InfoSection>

          <InfoSection title="Контактная информация">
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Телефон" value={user.phone} />
            <InfoRow label="Никнейм" value={user.username} />
            <InfoRow label="IP адрес" value={user.ip} />
            <InfoRow label="Mac адрес" value={user.macAddress} />
          </InfoSection>

          <InfoSection title="Адрес">
            <InfoRow label="Улица" value={user.address.address} />
            <InfoRow label="Город" value={user.address.city} />
            <InfoRow label="Государство" value={`${user.address.state} (${user.address.stateCode})`} />
            <InfoRow label="Страна" value={user.address.country} />
            <InfoRow label="Почтовый код" value={user.address.postalCode} />
          </InfoSection>

          <InfoSection title="Компания">
            <InfoRow label="Имя" value={user.company.name} />
            <InfoRow label="Название" value={user.company.title} />
            <InfoRow label="Департамент" value={user.company.department} />
            <InfoRow label="Адрес" value={`${user.company.address.city}, ${user.company.address.state}`} />
          </InfoSection>

          <InfoSection title="Банковская информация">
            <InfoRow label="Карточка" value={`${user.bank.cardType} •••• ${user.bank.cardNumber.slice(-4)}`} />
            <InfoRow label="Валюта" value={user.bank.currency} />
            <InfoRow label="IBAN" value={user.bank.iban} />
            <InfoRow label="Истекает" value={user.bank.cardExpire} />
          </InfoSection>

          <InfoSection title="Криптоинформация">
            <InfoRow label="Монета" value={user.crypto.coin} />
            <InfoRow label="Сеть" value={user.crypto.network} />
            <InfoRow label="Кошелёк" value={user.crypto.wallet} isMono />
          </InfoSection>

          <InfoSection title="Дополнительно">
            <InfoRow label="Университет" value={user.university} />
            <InfoRow label="EIN" value={user.ein} />
            <InfoRow label="SSN" value={user.ssn} />
            <InfoRow label="User Agent" value={user.userAgent} isCode />
          </InfoSection>
        </div>
      </div>
    </div>
  );
}