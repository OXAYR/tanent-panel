/**
 * Normalizes Laravel-style paginated API responses:
 * { data: [...], current_page, last_page, per_page, total, from, to, ... }
 */
export function extractListItems(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.data)) return response.data.data;
  return [];
}

export function parsePaginatedList(response) {
  const items = extractListItems(response);

  if (!response || Array.isArray(response) || !Array.isArray(response.data)) {
    return { items, pagination: null };
  }

  return {
    items,
    pagination: {
      currentPage: response.current_page ?? 1,
      lastPage: response.last_page ?? 1,
      perPage: response.per_page ?? items.length,
      total: response.total ?? items.length,
      from: response.from ?? null,
      to: response.to ?? null,
    },
  };
}
