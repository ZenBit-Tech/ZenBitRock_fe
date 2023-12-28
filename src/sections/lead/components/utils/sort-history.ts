import { IHistory, QobrixLead } from 'types';
import { toTitleCase } from 'utils';

type TFunction = (key: string) => string;

export const sortHistory = (
  id: string,
  created: string,
  contact_name_contact: QobrixLead['contact_name_contact'],
  history: IHistory,
  t: TFunction
): string[][] => {
  const entries: string[][] = [];

  entries.push([contact_name_contact?.id, contact_name_contact?.created, t('contact')]);
  entries.push([id, created, t('register')]);

  Object.entries(history).forEach(([type, data]) => {
    switch (type) {
      case 'calls': {
        if (data)
          data.forEach((call) => {
            entries.push([
              call.id ?? '',
              call.startDate ?? '',
              call.direction
                ? `${t(call.status ?? '')} ${t(call.direction)} ${t('call')} "${call.subject}"`
                : `${t(call.status ?? '')} ${t('call')} "${call.subject}"`,
            ]);
          });
        break;
      }

      case 'emails': {
        if (data)
          data.forEach((email) => {
            entries.push([
              email.id ?? '',
              email.dateSent ?? '',
              email.toAddress
                ? `${t(email.direction ?? '')} ${t('email_from')} ${email.fromAddress} ${t('to')} ${
                    email.toAddress
                  }`
                : `${t(email.direction ?? '')} ${t('email_from')} ${email.fromAddress}`,
            ]);
          });
        break;
      }

      case 'meetings': {
        if (data)
          data.forEach((meeting) => {
            entries.push([
              meeting.id ?? '',
              meeting.startDate ?? '',
              `${t('Viewing')} "${toTitleCase(meeting.subject ?? '')}" ${t(meeting.status ?? '')}`,
            ]);
          });
        break;
      }

      case 'smses': {
        if (data)
          data.forEach((sms) => {
            entries.push([
              sms.id ?? '',
              sms.created ?? '',
              `${t(sms.status ?? '')} ${t(sms.direction ?? '')} ${t('SMS from')} ${toTitleCase(
                sms.sender ?? ''
              )} ${t('to')} ${toTitleCase(sms.recipient ?? '')}`,
            ]);
          });
        break;
      }

      case 'statusChanges': {
        if (data)
          data.forEach((statusChange) => {
            entries.push([
              statusChange.id ?? '',
              statusChange.timestamp ?? '',
              `${t('status_changed')} "${t(statusChange.originalStatus ?? '')}" ${t('to')} "${t(
                statusChange.changedStatus ?? ''
              )}"`,
            ]);
          });
        break;
      }

      case 'taskChanges': {
        if (data)
          data.forEach((taskChange) => {
            if (taskChange.status === 'new') {
              entries.push([
                taskChange.taskId ?? '',
                taskChange.created ?? '',
                `${t('New_task')} "${toTitleCase(taskChange.subject ?? '')}" ${t('added')}`,
              ]);
            } else if (taskChange.data?.data?.length === 0) {
              entries.push([
                taskChange.taskId ?? '',
                taskChange.created ?? '',
                `${t(taskChange.status ?? '')} ${t('task')} "${toTitleCase(
                  taskChange.subject ?? ''
                )}" ${t('added')}`,
              ]);
            } else {
              taskChange.data?.data?.forEach((change) => {
                entries.push([
                  change.id ?? '',
                  change.timestamp ?? '',
                  `${toTitleCase(t('task'))} "${toTitleCase(taskChange.subject ?? '')}" ${t(
                    'status_from'
                  )} "${t(change.originalStatus ?? '')}" ${t('to')} "${t(
                    change.changedStatus ?? ''
                  )}"`,
                ]);
              });
            }
          });
        break;
      }

      default:
    }
  });

  const sortedEntries = entries.sort((a, b) => Date.parse(a[1]) - Date.parse(b[1]));

  return sortedEntries;
};
