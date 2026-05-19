import { useQuery } from "@tanstack/react-query";

import { getUsers, searchUsers, filterUsers } from "@/utils/api/read/user";

interface UseUsersProps {
  page?: number;
  limit?: number;
  search?: string;
  filter?: Record<string, string>;
  sortBy?: string;
  order?: "asc" | "desc";
}

export function useTanstackQuery({ 
  page = 1, 
  limit = 10, 
  search, 
  filter, 
  sortBy, 
  order 
}: UseUsersProps = {}) {
  const hasSearch = !!search;
  const hasFilter = !!(filter && Object.keys(filter).length > 0);
  
  const [filterKey, filterValue] = hasFilter 
    ? Object.entries(filter!)[0] 
    : ['', ''];

  return useQuery({
    queryKey: hasSearch 
      ? ["users", "search", search, { page, limit }]
      : hasFilter
        ? ["users", "filter", filterKey, filterValue, { page, limit }]
        : ["users", "list", { page, limit, sortBy, order }],
    
    queryFn: () => {
      if (hasSearch) {
        return searchUsers({ query: search!, page, limit });
      }
      
      if (hasFilter) {
        return filterUsers({ 
          key: filterKey, 
          value: filterValue, 
          page, 
          limit 
        });
      }
      
      return getUsers({ page, limit, sortBy, order });
    },
    
    placeholderData: (previousData) => previousData,
  });
}