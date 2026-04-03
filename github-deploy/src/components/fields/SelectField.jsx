import { FieldShell } from './FieldShell.jsx';
import { cn } from '../../utils/helpers.js';

export function SelectField({
  label,
  tooltip,
  options,
  error,
  hint,
  required,
  className,
  id,
  ...props
}) {
  return (
    <FieldShell label={label} tooltip={tooltip} error={error} hint={hint} required={required} htmlFor={id}>
      <select
        id={id}
        className={cn(
          'w-full h-12 rounded-2xl border border-line bg-canvas px-4 text-sm text-text outline-none transition duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10',
          error && 'border-danger/80 focus:border-danger focus:ring-danger/10',
          className,
        )}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
