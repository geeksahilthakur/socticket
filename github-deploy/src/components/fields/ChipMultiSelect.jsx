import { FieldShell } from './FieldShell.jsx';
import { cn } from '../../utils/helpers.js';

export function ChipMultiSelect({
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
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = values.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition duration-200',
                isActive
                  ? 'border-accent bg-accent text-white shadow-lg shadow-accent/15'
                  : 'border-line bg-canvas text-text hover:border-accent/50 hover:bg-accent-soft',
              )}
              onClick={() => onToggle(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
}
