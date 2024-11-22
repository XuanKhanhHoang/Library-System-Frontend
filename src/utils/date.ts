export function customFormatDate(date: Date, getHours = true) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${getHours ? `${hours}:${minutes}` : ""} ${day}/${month}/${year}`;
}
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
export function increaseDayFromNow(increaseDay: number): Date {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + increaseDay);
  return currentDate;
}
export function getFutureDate(months: 3 | 6 | 9 | 12 | 24): Date {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + months);
  return currentDate;
}
