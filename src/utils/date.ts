const MIN_IN_SEC = 60;
const HOUR_IN_SEC = MIN_IN_SEC * 60;
const DAY_IN_SEC = HOUR_IN_SEC * 24;
const WEEK_IN_SEC = DAY_IN_SEC * 7;
const MONTH_IN_SEC = DAY_IN_SEC * 30;
const YEAR_IN_SEC = DAY_IN_SEC * 365;

export function getTimeAgo(date: Date): string {
  const now = Date.now();
  const diff = Math.floor((now - date.getTime()) / 1000);

  if (diff < HOUR_IN_SEC) {
    return `${Math.floor(diff / MIN_IN_SEC)}m`;
  } else if (diff < DAY_IN_SEC) {
    return `${Math.floor(diff / HOUR_IN_SEC)}h`;
  } else if (diff < WEEK_IN_SEC) {
    return `${Math.floor(diff / DAY_IN_SEC)}d`;
  } else if (diff < MONTH_IN_SEC) {
    return `${Math.floor(diff / WEEK_IN_SEC)}w`;
  } else if (diff < YEAR_IN_SEC) {
    return `${Math.floor(diff / MONTH_IN_SEC)}M`;
  } else {
    return `${Math.floor(diff / YEAR_IN_SEC)}y`;
  }
}
