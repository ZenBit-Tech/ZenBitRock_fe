const DOUBLE_DIGIT_THRESHOLD: number = 10;
const DAYS_IN_WEEK: number = 7;
const MONTH_INDEX_OFFSET: number = 1;
const YEAR_SLICE_START: number = -2;
const SHORT_DAYS_OF_WEEK: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function formatDate(dateTimeString: string): string {
  const targetDate = new Date(dateTimeString);
  const currentDate = new Date();
  const addLeadingZero = (num: number) => (num < DOUBLE_DIGIT_THRESHOLD ? `0${num}` : num);

  if (isSameDay(currentDate, targetDate)) {
    return `${addLeadingZero(targetDate.getHours())}:${addLeadingZero(targetDate.getMinutes())}`;
  }

  if (isWithinLastWeek(currentDate, targetDate)) {
    const dayOfWeek = SHORT_DAYS_OF_WEEK[targetDate.getDay()];

    return `${dayOfWeek} ${addLeadingZero(targetDate.getHours())}:${addLeadingZero(
      targetDate.getMinutes()
    )}`;
  }

  const day = addLeadingZero(targetDate.getDate());
  const month = addLeadingZero(targetDate.getMonth() + MONTH_INDEX_OFFSET);
  const year = targetDate.getFullYear().toString().slice(YEAR_SLICE_START);

  return `${day}/${month}/${year}`;
}

function isSameDay(currentDate: Date, targetDate: Date): boolean {
  return currentDate.toDateString() === targetDate.toDateString();
}

function isWithinLastWeek(currentDate: Date, targetDate: Date): boolean {
  const today = new Date(currentDate);

  today.setDate(today.getDate() - DAYS_IN_WEEK);

  return targetDate >= today;
}
