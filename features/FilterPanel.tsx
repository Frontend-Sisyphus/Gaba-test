import { USER_ROLES, GENDER_OPTIONS } from "@/data/constants";

import { Badge } from "@/shared/Badge";

import "@/styles/features/filterPanel.css";

interface FilterPanelProps {
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
  onClearFilters: () => void;
}

export function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  const activeFilterCount = Object.keys(filters).length;

  return (
    <div className="filter-panel">
      <div className="filter-panel__header">
        <div className="filter-panel__header-left">
          <h3 className="filter-panel__title">
            Фильтр
          </h3>

          {activeFilterCount > 0 && (
            <Badge variant="info">{activeFilterCount}</Badge>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button onClick={onClearFilters} className="filter-panel__clear-button">
            Очистить
          </button>
        )}
      </div>
      
      <div className="filter-panel__filters">
        <div className="filter-select">
          <label className="filter-select__label">Роль</label>
          
          <select
            value={filters.role || ''}
            onChange={(e) => {
              if (e.target.value) {
                onFilterChange({ ...filters, role: e.target.value });
              } else {
                const { role, ...rest } = filters;
                onFilterChange(rest);
              }
            }}
            className="filter-select__select"
          >
            <option value="">Все роли</option>

            {USER_ROLES.map(role => (
              <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="filter-select">
          <label className="filter-select__label">Пол</label>
          
          <select
            value={filters.gender || ''}
            onChange={(e) => {
              if (e.target.value) {
                onFilterChange({ ...filters, gender: e.target.value });
              } else {
                const { gender, ...rest } = filters;
                onFilterChange(rest);
              }
            }}
            className="filter-select__select"
          >
            <option value="">Любой пол</option>

            {GENDER_OPTIONS.map(gender => (
              <option key={gender} value={gender}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}