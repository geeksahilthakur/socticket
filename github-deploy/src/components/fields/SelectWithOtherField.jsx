import { SelectField } from './SelectField.jsx';
import { TextInput } from './TextInput.jsx';

export function SelectWithOtherField({
  id,
  value,
  otherValue,
  label,
  tooltip,
  otherLabel,
  otherTooltip,
  options,
  error,
  otherError,
  required,
  onChange,
  onOtherChange,
}) {
  return (
    <div className="space-y-3">
      <SelectField
        id={id}
        label={label}
        tooltip={tooltip}
        options={options}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        error={error}
        required={required}
      />
      {value === 'Other' ? (
        <TextInput
          id={`${id}-other`}
          label={otherLabel}
          tooltip={otherTooltip}
          value={otherValue}
          onChange={(event) => onOtherChange(event.target.value)}
          placeholder="Enter custom value"
          error={otherError}
          required
        />
      ) : null}
    </div>
  );
}
