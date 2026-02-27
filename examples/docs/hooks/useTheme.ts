'use client';

import { useSyncExternalStore } from 'react';

export type ColorScheme = 'light' | 'dark';

function getSnapshot(): ColorScheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function subscribe(callback: () => void) {
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

export function useTheme(): { userColorScheme: ColorScheme } {
  const userColorScheme = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return { userColorScheme };
}
