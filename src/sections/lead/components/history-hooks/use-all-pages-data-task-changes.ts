import { useEffect, useState } from 'react';
import { useLazyGetLeadTaskChangesQuery } from 'store/api/qobrixApi';
import { ILeadTaskChange, ILeadTaskChangesResponse } from 'types';

const START_PAGE: number = 1;

interface ITaskChange {
  taskId?: string;
  data?: ILeadTaskChangesResponse;
  status?: string;
  subject?: string;
  created?: string;
}

export const useAllPagesTaskChangesData = (tasks: ILeadTaskChange[] | undefined) => {
  const [trigger] = useLazyGetLeadTaskChangesQuery();

  const [currentPage, setCurrentPage] = useState(START_PAGE);
  const [taskChanges, setTaskChanges] = useState<ITaskChange[]>([]);

  useEffect(() => {
    const fetchData = async (
      taskId: string,
      page: number,
      status?: string,
      subject?: string,
      created?: string
    ) => {
      try {
        const { data } = await trigger({
          page,
          id: taskId,
        });

        if (data?.pagination.has_next_page) {
          setCurrentPage((prev) => prev + 1);
        }

        setTaskChanges((prev) => [...prev, { taskId, data, status, subject, created }]);

        return { taskId, data, status, subject, created };
      } catch (error) {
        return error;
      }
    };

    async function fetchTaskData() {
      if (tasks && tasks.length > 0) {
        for (let i = 0; i < tasks.length; i += 1) {
          const task = tasks[i];

          try {
            if (task.id) {
              await fetchData(task.id, currentPage, task.status, task.subject, task.created);
            }
          } catch (error) {
            console.error(error);
            // Handle the error appropriately if needed
          }
        }
      }
    }

    fetchTaskData();
  }, [tasks, currentPage, trigger]);

  return taskChanges;
};
