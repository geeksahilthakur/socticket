import { NEXT_STEP_OPTIONS } from '../../data/options.js';
import { SectionHeader } from '../SectionHeader.jsx';
import { CheckboxList } from '../fields/CheckboxList.jsx';
import { TextArea } from '../fields/TextArea.jsx';

export function RecommendedNextStepsSection({
  values,
  customValue,
  error,
  onToggle,
  onCustomChange,
}) {
  return (
    <div className="space-y-6">
      <SectionHeader
        step="Section 05"
        title="Recommended Next Steps"
        description="Use the same recommendation style as the sample report, then add any extra custom action bullets below."
      />

      <CheckboxList
        label="Structured Actions"
        tooltip="Select recommended next steps for the customer or internal team."
        options={NEXT_STEP_OPTIONS}
        values={values}
        onToggle={onToggle}
        error={error}
        required
      />

      <TextArea
        id="custom-next-steps"
        label="Custom Next Steps"
        tooltip="Add any extra next steps. Use one line per bullet."
        value={customValue}
        onChange={(event) => onCustomChange(event.target.value)}
        placeholder={'Collect browser artifacts from the endpoint\nConfirm the original delivery vector'}
        hint="Each non-empty line becomes its own bullet."
      />
    </div>
  );
}
