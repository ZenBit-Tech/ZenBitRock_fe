import { useEffect, useState } from 'react';
import { useGetLeadCallsQuery } from 'store/api/qobrixApi';

const START_PAGE: number = 1;

export const useAllPagesCallsData = (id: string) => {
  const [currentPage, setCurrentPage] = useState(START_PAGE);

  const { data } = useGetLeadCallsQuery({
    page: currentPage,
    id,
  });

  useEffect(() => {
    if (data?.pagination.has_next_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [data]);

  return !data?.pagination.has_next_page ? data : null;
};
