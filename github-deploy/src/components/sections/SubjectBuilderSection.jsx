import {
  ACTION_ON_PROCESS_OPTIONS,
  END_CLIENT_SUGGESTIONS,
  MSP_CLIENT_SUGGESTIONS,
  PRODUCT_OPTIONS,
  SEVERITY_OPTIONS,
  THREAT_TYPE_OPTIONS,
} from '../../data/options.js';
import { buildSubjectLineFromSubject } from '../../utils/report.js';
import { SectionHeader } from '../SectionHeader.jsx';
import { SelectWithOtherField } from '../fields/SelectWithOtherField.jsx';
import { TextInput } from '../fields/TextInput.jsx';

export function SubjectBuilderSection({ value, errors, onChange }) {
  const subjectPreview = buildSubjectLineFromSubject(value);

  return (
    <div className="space-y-6">
      <SectionHeader
        step="Section 01"
        title="Subject"
        description="This follows the same subject order as the SentinelOne sample report on page 23."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <TextInput
          id="subject-msp-client"
          label="MSP Client Name"
          tooltip="Use the MSP or parent customer name that appears first in the subject line."
          value={value.mspClientName}
          onChange={(event) => onChange('mspClientName', event.target.value)}
          list="msp-client-suggestions"
          placeholder="Li-COR"
          error={errors['subject.mspClientName']}
          required
        />
        <datalist id="msp-client-suggestions">
          {MSP_CLIENT_SUGGESTIONS.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>

        <TextInput
          id="subject-end-client"
          label="End Client Name"
          tooltip="Use the end client or tenant name that appears second in the subject line."
          value={value.endClientName}
          onChange={(event) => onChange('endClientName', event.target.value)}
          list="end-client-suggestions"
          placeholder="Biotech"
          error={errors['subject.endClientName']}
          required
        />
        <datalist id="end-client-suggestions">
          {END_CLIENT_SUGGESTIONS.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>

        <SelectWithOtherField
          id="subject-product-name"
          label="Product Name"
          tooltip="Usually SentinelOne for this report type."
          otherLabel="Custom Product Name"
          otherTooltip="Enter a custom product name when Other is selected."
          value={value.productName}
          otherValue={value.productNameOther}
          options={PRODUCT_OPTIONS}
          error={errors['subject.productName']}
          otherError={errors['subject.productNameOther']}
          required
          onChange={(nextValue) => onChange('productName', nextValue)}
          onOtherChange={(nextValue) => onChange('productNameOther', nextValue)}
        />

        <SelectWithOtherField
          id="subject-severity"
          label="Severity"
          tooltip="This becomes the fourth value in the subject line, such as High or Medium."
          otherLabel="Custom Severity"
          otherTooltip="Enter a custom severity when Other is selected."
          value={value.severity}
          otherValue={value.severityOther}
          options={SEVERITY_OPTIONS}
          error={errors['subject.severity']}
          otherError={errors['subject.severityOther']}
          required
          onChange={(nextValue) => onChange('severity', nextValue)}
          onOtherChange={(nextValue) => onChange('severityOther', nextValue)}
        />

        <SelectWithOtherField
          id="subject-threat-type"
          label="Threat Type"
          tooltip="This usually matches the SentinelOne incident classification in the sample report."
          otherLabel="Custom Threat Type"
          otherTooltip="Enter a custom threat type when Other is selected."
          value={value.threatType}
          otherValue={value.threatTypeOther}
          options={THREAT_TYPE_OPTIONS}
          error={errors['subject.threatType']}
          otherError={errors['subject.threatTypeOther']}
          required
          onChange={(nextValue) => onChange('threatType', nextValue)}
          onOtherChange={(nextValue) => onChange('threatTypeOther', nextValue)}
        />

        <TextInput
          id="subject-threat-file"
          label="Threat File Name"
          tooltip="Use the threat file name that appears in the subject line and threat summary."
          value={value.threatFileName}
          onChange={(event) => onChange('threatFileName', event.target.value)}
          placeholder="dcagentservice.exe"
          error={errors['subject.threatFileName']}
          required
        />

        <TextInput
          id="subject-endpoint-name"
          label="Endpoint Name"
          tooltip="Use the endpoint shown in the subject line."
          value={value.endpointName}
          onChange={(event) => onChange('endpointName', event.target.value)}
          placeholder="BTC-GVQ8VB4"
          error={errors['subject.endpointName']}
          required
        />

        <SelectWithOtherField
          id="subject-action"
          label="Action on Process"
          tooltip="Use the action taken by SentinelOne, such as Killed and Quarantined."
          otherLabel="Custom Action on Process"
          otherTooltip="Enter a custom process action when Other is selected."
          value={value.actionOnProcess}
          otherValue={value.actionOnProcessOther}
          options={ACTION_ON_PROCESS_OPTIONS}
          error={errors['subject.actionOnProcess']}
          otherError={errors['subject.actionOnProcessOther']}
          required
          onChange={(nextValue) => onChange('actionOnProcess', nextValue)}
          onOtherChange={(nextValue) => onChange('actionOnProcessOther', nextValue)}
        />
      </div>

      <TextInput
        id="subject-additional-comments"
        label="Additional Comments"
        tooltip="Usually Response Needed in the sample format."
        value={value.additionalComments}
        onChange={(event) => onChange('additionalComments', event.target.value)}
        placeholder="Response Needed"
        error={errors['subject.additionalComments']}
        required
      />

      <div className="rounded-[20px] border border-accent/15 bg-accent-soft px-5 py-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Live Subject Preview</p>
        <p className="overflow-x-auto rounded-2xl bg-panel px-4 py-4 text-[13px] sm:text-sm font-semibold leading-6 sm:leading-7 text-text break-words break-all sm:break-normal">
          {subjectPreview}
        </p>
      </div>
    </div>
  );
}
