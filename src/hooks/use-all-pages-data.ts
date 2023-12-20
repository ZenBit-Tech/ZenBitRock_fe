import { useEffect, useState } from 'react';
import { useFetchDataQuery } from 'store/api/qobrixApi';

const START_PAGE: number = 1;

export const useAllPagesData = <T>(endpoint: string, initialData: T[], id: string) => {
  const [currentPage, setCurrentPage] = useState(START_PAGE);

  const { data, isFetching } = useFetchDataQuery({
    endpoint: endpoint,
    page: currentPage,
    id,
  });

  useEffect(() => {
    if (data?.pagination.has_next_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [data]);

  // Start fetching data for the initial page

  return {
    data,
    isFetching,
  };
};
