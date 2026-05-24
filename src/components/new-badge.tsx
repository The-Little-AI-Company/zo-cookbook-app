/**
 * "new" badge for cookbook items added in the last 30 days.
 *
 * Pair with isNew(item.addedDate) in the parent so the badge only renders
 * when the item is actually within the freshness window.
 */
export function NewBadge() {
  return (
    <span
      className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 border"
      style={{
        background: "color-mix(in srgb, var(--green) 14%, transparent)",
        borderColor: "color-mix(in srgb, var(--green) 35%, transparent)",
        color: "var(--green)",
      }}
      title="Added in the last 30 days"
    >
      new
    </span>
  );
}
