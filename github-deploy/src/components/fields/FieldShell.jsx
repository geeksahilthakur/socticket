import { TooltipIcon } from '../TooltipIcon.jsx';
import { cn } from '../../utils/helpers.js';

export function FieldShell({
  label,
  htmlFor,
  tooltip,
  required,
  error,
  hint,
  className,
  trailing,
  children,
}) {
  return (
    <label className={cn('flex flex-col gap-2.5', className)} htmlFor={htmlFor}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text">
            {label}
            {required ? <span className="ml-1 text-danger">*</span> : null}
          </span>
          <TooltipIcon content={tooltip} />
        </div>
        {trailing}
      </div>
      {children}
      {error ? (
        <span className="text-xs font-medium text-danger">{error}</span>
      ) : hint ? (
        <span className="text-xs text-muted">{hint}</span>
      ) : null}
    </label>
  );
}
