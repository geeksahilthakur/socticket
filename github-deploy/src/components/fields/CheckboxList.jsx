import { FieldShell } from './FieldShell.jsx';
import { cn } from '../../utils/helpers.js';

export function CheckboxList({
  label,
  tooltip,
  options,
  values,
  onToggle,
  error,
  hint,
  required,
}) {
  return (
    <FieldShell label={label} tooltip={tooltip} error={error} hint={hint} required={required}>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const checked = values.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              className={cn(
                'flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition duration-200',
                checked
                  ? 'border-accent bg-accent-soft text-text'
                  : 'border-line bg-canvas text-text hover:border-accent/50',
              )}
              onClick={() => onToggle(option.value)}
            >
              <span
                className={cn(
                  'inline-flex h-5 w-5 items-center justify-center rounded-md border text-[11px] font-semibold',
                  checked
                    ? 'border-accent bg-accent text-white'
                    : 'border-line bg-panel text-transparent',
                )}
              >
                ✓
              </span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
}
