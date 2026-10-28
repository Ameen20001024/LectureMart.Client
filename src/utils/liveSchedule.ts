const scheduleLabels = ["None", "Weekdays", "Weekends", "Daily", "Sundays"];

export function formatLiveSchedule(value: number | string | null | undefined): string {
  if (typeof value === "number") return scheduleLabels[value] ?? "Not set";
  if (!value) return "Not set";
  const parsed = Number(value);
  return Number.isFinite(parsed) ? scheduleLabels[parsed] ?? "Not set" : value;
}
