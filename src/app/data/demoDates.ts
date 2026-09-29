const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

function dateAtOffset(dayOffset: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date;
}

export function demoDate(dayOffset: number): string {
  return dateFormatter.format(dateAtOffset(dayOffset));
}

export function demoMonth(dayOffset: number): string {
  return monthFormatter.format(dateAtOffset(dayOffset));
}

export function nextSampleWeekdayDate(day: string): string | undefined {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const targetDay = weekdays.indexOf(day);
  if (targetDay < 0) return undefined;

  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const daysUntilTarget = (targetDay - date.getDay() + 7) % 7 || 7;
  date.setDate(date.getDate() + daysUntilTarget);
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}
