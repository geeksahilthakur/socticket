import { cn } from '../utils/helpers.js';

export function Card({ title, eyebrow, actions, className, children }) {
  return (
    <section
      className={cn(
        'rounded-[20px] sm:rounded-[24px] border border-line/80 bg-panel px-4 sm:px-6 py-5 sm:py-6 shadow-panel transition-all duration-200 xl:px-7',
        className,
      )}
    >
      {(title || eyebrow || actions) && (
        <div className="mb-6 flex flex-col gap-4 border-b border-line/70 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {eyebrow}
              </p>
            ) : null}
            {title ? <h2 className="font-display text-2xl font-semibold text-text">{title}</h2> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}
