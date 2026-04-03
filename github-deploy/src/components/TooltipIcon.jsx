export function TooltipIcon({ content }) {
  return (
    <span className="group relative inline-flex">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-line bg-canvas text-[11px] font-semibold text-muted">
        i
      </span>
      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-60 -translate-x-1/2 rounded-2xl border border-line bg-panel px-3 py-2 text-xs leading-relaxed text-text shadow-panel group-hover:block">
        {content}
      </span>
    </span>
  );
}
