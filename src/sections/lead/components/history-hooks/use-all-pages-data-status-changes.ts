import { useEffect, useState } from 'react';
import { useGetLeadStatusChangesQuery } from 'store/api/qobrixApi';

const START_PAGE: number = 1;

export const useAllPagesStatusChangesData = (id: string) => {
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);

  const { data } = useGetLeadStatusChangesQuery(
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

  return !data?.pagination.has_next_page ? data : null;
};
