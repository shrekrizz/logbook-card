import { beforeEach, expect, test } from 'vitest';
import { localize } from '../src/localize/localize';

beforeEach(() => {
  const values = new Map<string, string>();
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string): string | null => values.get(key) ?? null,
      setItem: (key: string, value: string): void => {
        values.set(key, value);
      },
    },
  });
});

test.each([
  ['en', 'Version'],
  ['fr', 'Version'],
  ['nb', 'Versjon'],
])('should return translation if exist for selected Language', (language, expectedTranslation) => {
  window.localStorage.setItem('selectedLanguage', language);
  expect(localize('common.version')).toBe(expectedTranslation);
});

test('should return translation if exist', () => {
  window.localStorage.setItem('selectedLanguage', 'ch');
  expect(localize('common.version')).toBe('Version');
});

test('should return fallback to en if translation does not exist', () => {
  window.localStorage.setItem('selectedLanguage', 'nb');
  expect(localize('common.default_no_event')).toBe('no event on the period');
});

test('should replace placeholder', () => {
  window.localStorage.setItem('selectedLanguage', 'nb');
  expect(localize('logbook_card.default_title', '{entity}', 'kitchen light')).toBe('kitchen light History');
});
