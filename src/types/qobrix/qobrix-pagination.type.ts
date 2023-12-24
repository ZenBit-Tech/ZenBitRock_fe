type QobrixPagination = {
  pageCount: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage?: boolean;
  has_prev_page?: boolean;
  count: number;
  limit: number;
  has_next_page: boolean;
};

export { type QobrixPagination };
