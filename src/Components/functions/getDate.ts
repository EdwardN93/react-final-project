export function getDate(): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Date().toLocaleDateString("ro-RO", options);
}
