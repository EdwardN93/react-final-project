export function getDate() {
  return new Date();
}

export function intlDate(date: string | Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("ro-RO", options);
}

export function compareDates(date: string | Date) {
  const today = new Date();
  const newDate = new Date(date);
  today.setHours(0, 0, 0, 0);
  newDate.setHours(0, 0, 0, 0);
  const diff = newDate.getTime() - today.getTime();
  const readableDate = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return readableDate;
}
