import { useEffect, useState } from 'react';
import { useLazyGetLeadTaskChangesQuery } from 'store/api/qobrixApi';
import { ILeadCommonList } from 'types';

const START_PAGE: number = 1;

export const useAllPagesTaskChangesData = (tasks: ILeadCommonList[] | undefined) => {
  const [trigger] = useLazyGetLeadTaskChangesQuery();

  const [currentPage, setCurrentPage] = useState(START_PAGE);
  const [taskChanges, setTaskChanges] = useState([]);

  useEffect(() => {
    const fetchData = async (taskId, page) => {
      const { data } = await trigger({
        page,
        id: taskId,
      });

      if (data?.pagination.has_next_page) {
        setCurrentPage((prev) => prev + 1);
      }

      setTaskChanges((prev) => [...prev, { taskId, data }]);
    };

    const fetchTaskData = async () => {
      if (tasks && tasks.length > 0) {
        for (let i = 0; i < tasks.length; i++) {
          const task = tasks[i];
          await fetchData(task.id, currentPage);
        }
      }
    };

    fetchTaskData();
  }, [tasks, currentPage, trigger]);

  useEffect(() => {
    console.log('Updated taskChanges:', taskChanges);
  }, [taskChanges]);

  return taskChanges;
};
