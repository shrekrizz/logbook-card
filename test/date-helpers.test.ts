import { describe, expect, test } from 'vitest';
import { limitEntriesPerDay } from '../src/date-helpers';

const entries = [
  { start: new Date('2024-05-02T10:00:00Z'), id: 'day-2-a' },
  { start: new Date('2024-05-02T09:00:00Z'), id: 'day-2-b' },
  { start: new Date('2024-05-02T08:00:00Z'), id: 'day-2-c' },
  { start: new Date('2024-05-01T10:00:00Z'), id: 'day-1-a' },
  { start: new Date('2024-05-01T09:00:00Z'), id: 'day-1-b' },
];

describe('limitEntriesPerDay', () => {
  test('should keep all entries if max entries per day is not set', () => {
    expect(limitEntriesPerDay(entries)).toStrictEqual(entries);
  });

  test('should keep all entries if max entries per day is lower than one', () => {
    expect(limitEntriesPerDay(entries, -1)).toStrictEqual(entries);
    expect(limitEntriesPerDay(entries, 0)).toStrictEqual(entries);
  });

  test('should keep only the first entries for each day while preserving order', () => {
    expect(limitEntriesPerDay(entries, 2)).toStrictEqual([
      entries[0],
      entries[1],
      entries[3],
      entries[4],
    ]);
  });
});
