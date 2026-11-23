"use client";

import { useSyncExternalStore } from "react";

const TICK_MS = 15_000;

let current = 0;
let timer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (timer === null) {
    current = Date.now();
    timer = setInterval(() => {
      current = Date.now();
      listeners.forEach((notify) => notify());
    }, TICK_MS);
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0 && timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = () => current;
const getServerSnapshot = () => 0;

/**
 * The browser clock, refreshed every few seconds and shared by everything on
 * the page. It is null on the server and during hydration, so relative times
 * and stale marking never disagree between server and browser.
 */
export function useNow(): number | null {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return value === 0 ? null : value;
}
