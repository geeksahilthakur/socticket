export function SectionHeader({ step, title, description, aside }) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-line/70 pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{step}</p>
        <div className="space-y-1">
          <h3 className="font-display text-xl font-semibold text-text">{title}</h3>
          <p className="max-w-3xl text-sm leading-6 text-muted">{description}</p>
        </div>
      </div>
      {aside ? <div>{aside}</div> : null}
    </div>
  );
}
