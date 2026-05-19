import { SearchBar } from "@/features/SearchBar";
import { FilterPanel } from "@/features/FilterPanel";

interface UsersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
  onClearFilters: () => void;
}

export function UsersFilters({ search, onSearchChange, filters, onFilterChange, onClearFilters }: UsersFiltersProps) {
  return (
    <div className="space-y-4">
      <SearchBar value={search} onChange={onSearchChange} />
      
      <FilterPanel filters={filters} onFilterChange={onFilterChange} onClearFilters={onClearFilters} />
    </div>
  );
}