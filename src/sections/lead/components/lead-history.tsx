import { useEffect, useState } from 'hooks';
import { QobrixLead } from 'types';
import {
  useAllPagesCallsData,
  useAllPagesEmailsData,
  useAllPagesMeetingsData,
  useAllPagesSmsesData,
  useAllPagesStatusChangesData,
  useAllPagesTaskChangesData,
  useAllPagesTasksData,
} from './history-hooks';

type Props = { lead: QobrixLead };

const LeadHistorySection = ({ lead }: Props) => {
  const [history, setHistory] = useState({});

  const id = 'e52f7f35-b3fd-488f-a13f-aa00c4c15177';

  const tasks = useAllPagesTasksData(id);

  const smses = useAllPagesSmsesData(id);

  const emails = useAllPagesEmailsData(id);

  const calls = useAllPagesCallsData(id);

  const meetings = useAllPagesMeetingsData(id);

  const statusChanges = useAllPagesStatusChangesData(id);

  const taskChanges = useAllPagesTaskChangesData(tasks?.data);

  useEffect(() => {
    // if (tasks) setHistory((prev) => ({ ...prev, tasks: tasks.data }));
    if (calls) setHistory((prev) => ({ ...prev, calls: calls.data }));
    if (emails) setHistory((prev) => ({ ...prev, emails: emails.data }));
    if (smses) setHistory((prev) => ({ ...prev, smses: smses.data }));
    if (meetings) setHistory((prev) => ({ ...prev, meetings: meetings.data }));
    if (statusChanges) setHistory((prev) => ({ ...prev, statusChanges: statusChanges.data }));
    if (taskChanges) setHistory((prev) => ({ ...prev, taskChanges }));
  }, [calls, emails, meetings, smses, statusChanges, taskChanges]);
  console.log(history);

  return;
  <p>History</p>;
};

export { LeadHistorySection };
