import { useEffect, useState } from 'react';
import { useGetLeadEmailsQuery } from 'store/api/qobrixApi';

const START_PAGE: number = 1;

export const useAllPagesEmailsData = (id: string) => {
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);

  const { data, isFetching, isLoading } = useGetLeadEmailsQuery(
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
