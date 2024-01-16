import { useEffect, useState } from 'react';
import { useGetLeadCallsQuery } from 'store/api/qobrixApi';

const START_PAGE: number = 1;

export const useAllPagesCallsData = (id: string) => {
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);

  const { data, isFetching, isLoading } = useGetLeadCallsQuery(
    {
      page: currentPage,
      id,
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (data?.pagination.has_next_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [data]);

  return { data: !data?.pagination.has_next_page ? data : null, isFetching, isLoading };
};
