import { resolveOtherValue, splitMultiline } from './helpers.js';

function requireField(errors, key, label, value) {
  if (!String(value || '').trim()) {
    errors[key] = `${label} is required.`;
  }
}

function requireOtherIfNeeded(errors, key, label, selected, otherValue) {
  if (selected === 'Other') {
    requireField(errors, key, label, otherValue);
  }
}

export function validateReport(data) {
  const errors = {};

  requireField(errors, 'subject.mspClientName', 'MSP client name', data.subject.mspClientName);
  requireField(errors, 'subject.endClientName', 'End client name', data.subject.endClientName);
  requireField(errors, 'subject.productName', 'Product name', data.subject.productName);
  requireField(errors, 'subject.severity', 'Severity', data.subject.severity);
  requireField(errors, 'subject.threatType', 'Threat type', data.subject.threatType);
  requireField(errors, 'subject.threatFileName', 'Threat file name', data.subject.threatFileName);
  requireField(errors, 'subject.endpointName', 'Endpoint name', data.subject.endpointName);
  requireField(errors, 'subject.actionOnProcess', 'Action on process', data.subject.actionOnProcess);
  requireField(errors, 'subject.additionalComments', 'Additional comments', data.subject.additionalComments);

  requireOtherIfNeeded(
    errors,
    'subject.productNameOther',
    'Custom product name',
    data.subject.productName,
    data.subject.productNameOther,
  );
  requireOtherIfNeeded(
    errors,
    'subject.severityOther',
    'Custom severity',
    data.subject.severity,
    data.subject.severityOther,
  );
  requireOtherIfNeeded(
    errors,
    'subject.threatTypeOther',
    'Custom threat type',
    data.subject.threatType,
    data.subject.threatTypeOther,
  );
  requireOtherIfNeeded(
    errors,
    'subject.actionOnProcessOther',
    'Custom action on process',
    data.subject.actionOnProcess,
    data.subject.actionOnProcessOther,
  );

  requireField(errors, 'impactedEndpoint.groupName', 'Group name', data.impactedEndpoint.groupName);
  requireOtherIfNeeded(
    errors,
    'impactedEndpoint.groupNameOther',
    'Custom group name',
    data.impactedEndpoint.groupName,
    data.impactedEndpoint.groupNameOther,
  );
  requireField(errors, 'impactedEndpoint.endpoint', 'Endpoint', data.impactedEndpoint.endpoint);
  requireField(errors, 'impactedEndpoint.domain', 'Domain', data.impactedEndpoint.domain);
  requireField(errors, 'impactedEndpoint.osVersion', 'OS version', data.impactedEndpoint.osVersion);
  requireField(errors, 'impactedEndpoint.loggedInUser', 'Logged in user', data.impactedEndpoint.loggedInUser);
  requireField(errors, 'impactedEndpoint.consoleVisibleIp', 'Console visible IP address', data.impactedEndpoint.consoleVisibleIp);

  requireField(errors, 'preferences.reportTitle', 'Report title', data.preferences.reportTitle);
  requireOtherIfNeeded(
    errors,
    'preferences.reportTitleOther',
    'Custom report title',
    data.preferences.reportTitle,
    data.preferences.reportTitleOther,
  );

  requireField(errors, 'threatSummary.analystVerdict', 'Analyst verdict', data.threatSummary.analystVerdict);
  requireField(errors, 'threatSummary.incidentClassification', 'Incident classification', data.threatSummary.incidentClassification);
  requireField(errors, 'threatSummary.threatStatus', 'Threat status', data.threatSummary.threatStatus);
  requireField(errors, 'threatSummary.aiConfidenceLevel', 'AI confidence level', data.threatSummary.aiConfidenceLevel);
  requireField(errors, 'threatSummary.incidentStatus', 'Incident status', data.threatSummary.incidentStatus);
  requireField(errors, 'threatSummary.processUser', 'Process user', data.threatSummary.processUser);
  requireField(errors, 'threatSummary.originatingProcess', 'Originating process', data.threatSummary.originatingProcess);
  requireField(errors, 'threatSummary.detectionTime', 'Threat detected time', data.threatSummary.detectionTime);
  requireField(errors, 'threatSummary.signatureVerification', 'Signature verification', data.threatSummary.signatureVerification);
  requireField(errors, 'threatSummary.s1SignerPublisher', 'SentinelOne signer identity and publisher name', data.threatSummary.s1SignerPublisher);
  requireField(errors, 'threatSummary.researchedSignerPublisher', 'Researched signer identity and publisher name', data.threatSummary.researchedSignerPublisher);
  requireField(errors, 'threatSummary.threatFileName', 'Threat file name', data.threatSummary.threatFileName);

  requireOtherIfNeeded(
    errors,
    'threatSummary.analystVerdictOther',
    'Custom analyst verdict',
    data.threatSummary.analystVerdict,
    data.threatSummary.analystVerdictOther,
  );
  requireOtherIfNeeded(
    errors,
    'threatSummary.threatStatusOther',
    'Custom threat status',
    data.threatSummary.threatStatus,
    data.threatSummary.threatStatusOther,
  );
  requireOtherIfNeeded(
    errors,
    'threatSummary.aiConfidenceLevelOther',
    'Custom AI confidence level',
    data.threatSummary.aiConfidenceLevel,
    data.threatSummary.aiConfidenceLevelOther,
  );
  requireOtherIfNeeded(
    errors,
    'threatSummary.incidentStatusOther',
    'Custom incident status',
    data.threatSummary.incidentStatus,
    data.threatSummary.incidentStatusOther,
  );
  requireOtherIfNeeded(
    errors,
    'threatSummary.signatureVerificationOther',
    'Custom signature verification',
    data.threatSummary.signatureVerification,
    data.threatSummary.signatureVerificationOther,
  );

  const hasMitigation =
    data.threatSummary.mitigationActions.length > 0 ||
    splitMultiline(data.threatSummary.customMitigationActions).length > 0;
  if (!hasMitigation) {
    errors['threatSummary.mitigationActions'] = 'Add at least one mitigation action.';
  }

  const resolvedVerdict = resolveOtherValue(
    data.threatSummary.analystVerdict,
    data.threatSummary.analystVerdictOther,
  );
  if (resolvedVerdict === 'False Positive' || resolvedVerdict === 'Potential False Positive') {
    requireField(
      errors,
      'threatSummary.falsePositiveJustification',
      'False positive justification',
      data.threatSummary.falsePositiveJustification,
    );
  }

  const ransomwareCheck = [
    resolveOtherValue(data.subject.threatType, data.subject.threatTypeOther),
    data.threatSummary.incidentClassification,
  ]
    .join(' ')
    .toLowerCase();
  if (ransomwareCheck.includes('ransomware')) {
    requireField(errors, 'threatSummary.sha1', 'SHA-1', data.threatSummary.sha1);
    requireField(errors, 'threatSummary.sha256', 'SHA-256', data.threatSummary.sha256);
    requireField(errors, 'threatSummary.filePath', 'File path', data.threatSummary.filePath);
  }

  const hasNextSteps =
    data.recommendedNextSteps.length > 0 || splitMultiline(data.customNextSteps).length > 0;
  if (!hasNextSteps) {
    errors.recommendedNextSteps = 'Add at least one recommended next step.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
