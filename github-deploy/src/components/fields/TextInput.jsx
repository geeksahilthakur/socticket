import { FieldShell } from './FieldShell.jsx';
import { cn } from '../../utils/helpers.js';

export function TextInput({
  label,
  tooltip,
  error,
  hint,
  required,
  className,
  id,
  ...props
}) {
  return (
    <FieldShell label={label} tooltip={tooltip} error={error} hint={hint} required={required} htmlFor={id}>
      <input
        id={id}
        className={cn(
          'w-full h-12 rounded-2xl border border-line bg-canvas px-4 text-sm text-text outline-none transition duration-200 placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-accent/10',
          error && 'border-danger/80 focus:border-danger focus:ring-danger/10',
          className,
        )}
        {...props}
      />
    </FieldShell>
  );
}
