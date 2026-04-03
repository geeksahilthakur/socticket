import { SectionHeader } from '../SectionHeader.jsx';
import { TextArea } from '../fields/TextArea.jsx';

export function AdditionalCommentsSection({ value, onChange }) {
  return (
    <div className="space-y-6">
      <SectionHeader
        step="Section 05"
        title="Additional Comments"
        description="Capture final internal notes and customer-facing messaging outside the main analysis comment blocks."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <TextArea
          id="additional-internal-comments"
          label="Internal Comments"
          tooltip="Add internal SOC comments or operational notes."
          value={value.internalComments}
          onChange={(event) => onChange('internalComments', event.target.value)}
          placeholder="Add internal context, escalation notes, or handling caveats."
        />
        <TextArea
          id="additional-customer-comments"
          label="Customer-Facing Comments"
          tooltip="Add a customer-ready summary paragraph or closing comment."
          value={value.customerFacingComments}
          onChange={(event) => onChange('customerFacingComments', event.target.value)}
          placeholder="Add a polished customer-facing comment for the final report."
        />
      </div>
    </div>
  );
}
