import { datesFormats } from 'constants/dates-formats';
import { format, getTime, formatDistanceToNow, addHours } from 'date-fns';
import { utcToZonedTime, format as tzFormat } from 'date-fns-tz';

type InputValue = Date | string | number | null | undefined;

export function convertDateToHelsinkiTime(isoDateString: string): string {
  const date = new Date(isoDateString);
  const helsinkiDate = utcToZonedTime(date, 'Europe/Helsinki');
  const helsinkiDatePlusTwoHours = addHours(helsinkiDate, 2);
  return tzFormat(helsinkiDatePlusTwoHours, datesFormats.timeFormat, {
    timeZone: datesFormats.timeZone,
  });
}

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
