/**
 * Returns true when an item's addedDate is within the last 30 days.
 *
 * Used by the cookbook UI to surface a "new" badge on recently added recipes.
 * The badge disappears automatically once the date passes the 30-day window,
 * so there is no manual cleanup or cron required. Missing or malformed dates
 * return false (no badge).
 */
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function isNew(addedDate: string | undefined | null, now: number = Date.now()): boolean {
  if (!addedDate) return false;
  const parsed = Date.parse(addedDate);
  if (Number.isNaN(parsed)) return false;
  const age = now - parsed;
  return age >= 0 && age <= THIRTY_DAYS_MS;
}
