import {
  AI_CONFIDENCE_OPTIONS,
  ANALYST_VERDICT_OPTIONS,
  INCIDENT_STATUS_OPTIONS,
  MITIGATION_ACTION_OPTIONS,
  SIGNATURE_VERIFICATION_OPTIONS,
  THREAT_STATUS_OPTIONS,
} from '../../data/options.js';
import { SectionHeader } from '../SectionHeader.jsx';
import { ChipMultiSelect } from '../fields/ChipMultiSelect.jsx';
import { SelectWithOtherField } from '../fields/SelectWithOtherField.jsx';
import { TextArea } from '../fields/TextArea.jsx';
import { TextInput } from '../fields/TextInput.jsx';

export function ThreatSummarySection({
  value,
  productName,
  errors,
  onChange,
  onToggleMitigationAction,
  onAutofillClassification,
}) {
  const displayProduct = productName || 'SentinelOne';
  return (
    <div className="space-y-6">
      <SectionHeader
        step="Section 03"
        title="Threat Summary"
        description={`These labels match the ${displayProduct} sample report wording so the exported document stays close to the official structure.`}
        aside={
          <button
            type="button"
            className="rounded-full border border-line bg-canvas px-4 py-2 text-sm font-medium text-text transition hover:border-accent/50 hover:bg-accent-soft"
            onClick={onAutofillClassification}
          >
            Use Threat Type
          </button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <SelectWithOtherField
          id="analyst-verdict"
          label="Analyst Verdict"
          tooltip="Use the exact analyst verdict line that appears below Threat Summary."
          otherLabel="Custom Analyst Verdict"
          otherTooltip="Enter a custom analyst verdict when Other is selected."
          value={value.analystVerdict}
          otherValue={value.analystVerdictOther}
          options={ANALYST_VERDICT_OPTIONS}
          error={errors['threatSummary.analystVerdict']}
          otherError={errors['threatSummary.analystVerdictOther']}
          required
          onChange={(nextValue) => onChange('analystVerdict', nextValue)}
          onOtherChange={(nextValue) => onChange('analystVerdictOther', nextValue)}
        />

        <TextInput
          id="incident-classification"
          label={`${displayProduct} Incident Classification`}
          tooltip="This should match the incident classification line in the report, such as Ransomware."
          value={value.incidentClassification}
          onChange={(event) => onChange('incidentClassification', event.target.value)}
          placeholder="Ransomware"
          error={errors['threatSummary.incidentClassification']}
          required
        />

        <SelectWithOtherField
          id="threat-status"
          label="Threat Status"
          tooltip={`Use the threat status shown in the ${displayProduct} incident details.`}
          otherLabel="Custom Threat Status"
          otherTooltip="Enter a custom threat status when Other is selected."
          value={value.threatStatus}
          otherValue={value.threatStatusOther}
          options={THREAT_STATUS_OPTIONS}
          error={errors['threatSummary.threatStatus']}
          otherError={errors['threatSummary.threatStatusOther']}
          required
          onChange={(nextValue) => onChange('threatStatus', nextValue)}
          onOtherChange={(nextValue) => onChange('threatStatusOther', nextValue)}
        />

        <SelectWithOtherField
          id="ai-confidence"
          label="AI Confidence Level"
          tooltip={`Use the AI confidence wording shown by ${displayProduct}, such as Suspicious.`}
          otherLabel="Custom AI Confidence Level"
          otherTooltip="Enter a custom AI confidence level when Other is selected."
          value={value.aiConfidenceLevel}
          otherValue={value.aiConfidenceLevelOther}
          options={AI_CONFIDENCE_OPTIONS}
          error={errors['threatSummary.aiConfidenceLevel']}
          otherError={errors['threatSummary.aiConfidenceLevelOther']}
          required
          onChange={(nextValue) => onChange('aiConfidenceLevel', nextValue)}
          onOtherChange={(nextValue) => onChange('aiConfidenceLevelOther', nextValue)}
        />

        <SelectWithOtherField
          id="incident-status"
          label="Incident Status"
          tooltip="Use the current incident status from the console or triage workflow."
          otherLabel="Custom Incident Status"
          otherTooltip="Enter a custom incident status when Other is selected."
          value={value.incidentStatus}
          otherValue={value.incidentStatusOther}
          options={INCIDENT_STATUS_OPTIONS}
          error={errors['threatSummary.incidentStatus']}
          otherError={errors['threatSummary.incidentStatusOther']}
          required
          onChange={(nextValue) => onChange('incidentStatus', nextValue)}
          onOtherChange={(nextValue) => onChange('incidentStatusOther', nextValue)}
        />

        <TextInput
          id="process-user"
          label="Process User"
          tooltip="Use the process user shown in the threat details."
          value={value.processUser}
          onChange={(event) => onChange('processUser', event.target.value)}
          placeholder="NT AUTHORITY\\SYSTEM"
          error={errors['threatSummary.processUser']}
          required
        />

        <TextInput
          id="originating-process"
          label="Originating Process"
          tooltip={`Use the parent or originating process shown in ${displayProduct}.`}
          value={value.originatingProcess}
          onChange={(event) => onChange('originatingProcess', event.target.value)}
          placeholder="services.exe"
          error={errors['threatSummary.originatingProcess']}
          required
        />

        <TextInput
          id="detection-time"
          type="datetime-local"
          label="Threat Detected Time"
          tooltip="Use the exact detection timestamp from the incident."
          value={value.detectionTime}
          onChange={(event) => onChange('detectionTime', event.target.value)}
          error={errors['threatSummary.detectionTime']}
          required
        />

        <SelectWithOtherField
          id="signature-verification"
          label="Signature Verification"
          tooltip="Use the signature verification wording shown in the report."
          otherLabel="Custom Signature Verification"
          otherTooltip="Enter a custom signature verification result when Other is selected."
          value={value.signatureVerification}
          otherValue={value.signatureVerificationOther}
          options={SIGNATURE_VERIFICATION_OPTIONS}
          error={errors['threatSummary.signatureVerification']}
          otherError={errors['threatSummary.signatureVerificationOther']}
          required
          onChange={(nextValue) => onChange('signatureVerification', nextValue)}
          onOtherChange={(nextValue) => onChange('signatureVerificationOther', nextValue)}
        />

        <TextInput
          id="s1-signer-publisher"
          label={`${displayProduct} Signer Identity & Publisher Name`}
          tooltip={`Use the signer and publisher identity shown directly in ${displayProduct}.`}
          value={value.s1SignerPublisher}
          onChange={(event) => onChange('s1SignerPublisher', event.target.value)}
          placeholder="ZOHO CORPORATION PRIVATE LIMITED"
          error={errors['threatSummary.s1SignerPublisher']}
          required
        />

        <TextInput
          id="researched-signer-publisher"
          label="Researched Signer Identity & Publisher Name"
          tooltip="Use the researched signer or publisher name confirmed through your validation."
          value={value.researchedSignerPublisher}
          onChange={(event) => onChange('researchedSignerPublisher', event.target.value)}
          placeholder="ZOHO CORPORATION PRIVATE LIMITED"
          error={errors['threatSummary.researchedSignerPublisher']}
          required
        />

        <TextInput
          id="threat-file-name-summary"
          label="Threat File Name"
          tooltip="Use the exact threat file name shown in the report."
          value={value.threatFileName}
          onChange={(event) => onChange('threatFileName', event.target.value)}
          placeholder="dcagentservice.exe"
          error={errors['threatSummary.threatFileName']}
          required
        />

        <TextInput
          id="sha1"
          label="File Hash (SHA-1)"
          tooltip="Use the SHA-1 hash value when present."
          value={value.sha1}
          onChange={(event) => onChange('sha1', event.target.value)}
          placeholder="ccadf6ff7c90ee91df1bd155701082d6f26ef5a6"
          error={errors['threatSummary.sha1']}
        />

        <TextInput
          id="sha256"
          label="File Hash (SHA-256)"
          tooltip="Use the SHA-256 hash value when present."
          value={value.sha256}
          onChange={(event) => onChange('sha256', event.target.value)}
          placeholder="2808e19455f5bf9ecd3d5d38deb618afc2a0ee4b45d2ba78c20dd2166ae64812"
          error={errors['threatSummary.sha256']}
        />

        <TextInput
          id="file-path"
          label="File Path"
          tooltip="Use the full file path exactly as shown in the console."
          value={value.filePath}
          onChange={(event) => onChange('filePath', event.target.value)}
          placeholder="\\Device\\HarddiskVolume3\\Program Files (x86)\\ManageEngine\\UEMS_Agent\\bin\\dcagentservice.exe"
          error={errors['threatSummary.filePath']}
        />
      </div>

      <ChipMultiSelect
        label="Mitigation Actions Taken"
        tooltip={`Select the exact mitigation actions taken by ${displayProduct}.`}
        options={MITIGATION_ACTION_OPTIONS}
        values={value.mitigationActions}
        onToggle={onToggleMitigationAction}
        error={errors['threatSummary.mitigationActions']}
        required
      />

      <TextArea
        id="custom-mitigation-actions"
        label="Custom Mitigation Actions"
        tooltip="Add any additional mitigation actions. Use one line per action."
        value={value.customMitigationActions}
        onChange={(event) => onChange('customMitigationActions', event.target.value)}
        placeholder={'Rollback completed\nNetwork isolation enabled'}
        hint="Each non-empty line becomes part of the mitigation actions line."
      />

    </div>
  );
}
