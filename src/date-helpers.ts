export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const toDayKey = (date: Date): string => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export const limitEntriesPerDay = <T extends { start: Date }>(items: T[], maxEntriesPerDay?: number): T[] => {
  if (maxEntriesPerDay === undefined || maxEntriesPerDay < 1) {
    return items;
  }

  const countByDay = new Map<string, number>();
  return items.filter(item => {
    const dayKey = toDayKey(item.start);
    const count = countByDay.get(dayKey) ?? 0;
    if (count >= maxEntriesPerDay) {
      return false;
    }

    countByDay.set(dayKey, count + 1);
    return true;
  });
};

export const DEFAULT_HOURS_TO_SHOW: number = 5 * 24;

export const calculateStartDate = (hoursToShow = DEFAULT_HOURS_TO_SHOW): Date => {
  return new Date(new Date().setHours(new Date().getHours() - hoursToShow));
};

export const dayToHours = (nbOfDays: number): number => nbOfDays * 24;
