import { formatDateTime, resolveOtherValue, sanitizeLine, splitMultiline } from './helpers.js';

function valueOrPlaceholder(value, placeholder = 'Not Provided') {
  return sanitizeLine(value) || placeholder;
}

function otherValueOrPlaceholder(value, otherValue, placeholder) {
  return sanitizeLine(resolveOtherValue(value, otherValue)) || placeholder;
}

function buildMitigationActions(threatSummary) {
  return [
    ...threatSummary.mitigationActions,
    ...splitMultiline(threatSummary.customMitigationActions),
  ];
}

function buildAnalysisNotesSections(data) {
  const sections = data.analysisNotes.map((note) => ({
    title: sanitizeLine(note.title) || 'Analyst Note',
    bullets: splitMultiline(note.points),
  }));

  if (data.threatSummary.falsePositiveJustification.trim()) {
    const verdict = otherValueOrPlaceholder(data.threatSummary.analystVerdict, data.threatSummary.analystVerdictOther, 'Verdict');
    const justificationTitle = `${verdict} Justification`;
    
    sections.push({
      title: justificationTitle,
      bullets: [`Analyst Rationale: ${sanitizeLine(data.threatSummary.falsePositiveJustification)}`],
    });
  }

  return sections;
}

function buildRecommendedSteps(data) {
  return [...data.recommendedNextSteps, ...splitMultiline(data.customNextSteps)];
}

function buildReportTitle(preferences) {
  return otherValueOrPlaceholder(
    preferences.reportTitle,
    preferences.reportTitleOther,
    'EDR - Alert Report',
  );
}

export function buildSubjectLineFromSubject(subject) {
  const parts = [
    valueOrPlaceholder(subject.mspClientName, '[MSP Client Name]'),
    valueOrPlaceholder(subject.endClientName, '[End Client Name]'),
    otherValueOrPlaceholder(subject.productName, subject.productNameOther, '[Product Name]'),
    otherValueOrPlaceholder(subject.severity, subject.severityOther, '[Severity]'),
    otherValueOrPlaceholder(subject.threatType, subject.threatTypeOther, '[Threat Type]'),
    valueOrPlaceholder(subject.threatFileName, '[Threat File Name]'),
    valueOrPlaceholder(subject.endpointName, '[Endpoint Name]'),
    otherValueOrPlaceholder(subject.actionOnProcess, subject.actionOnProcessOther, '[Action on Process]'),
    valueOrPlaceholder(subject.additionalComments, '[Additional Comments]'),
  ];

  return `SOC::${parts.join(' | ')}`;
}

export function buildReportStructure(data) {
  const title = buildReportTitle(data.preferences);
  const subjectLine = buildSubjectLineFromSubject(data.subject);
  const mitigationActions = buildMitigationActions(data.threatSummary);
  const analysisNotesSections = buildAnalysisNotesSections(data);
  const recommendedNextSteps = buildRecommendedSteps(data);
  const productName = otherValueOrPlaceholder(data.subject.productName, data.subject.productNameOther, 'SentinelOne');

  const impactedEndpointBullets = [
    `${valueOrPlaceholder(data.subject.mspClientName)} / ${valueOrPlaceholder(data.subject.endClientName)} / ${otherValueOrPlaceholder(
      data.impactedEndpoint.groupName,
      data.impactedEndpoint.groupNameOther,
      'Default Group',
    )} / ${valueOrPlaceholder(data.impactedEndpoint.endpoint)}`,
    `Domain: ${valueOrPlaceholder(data.impactedEndpoint.domain)}`,
    `OS Version: ${valueOrPlaceholder(data.impactedEndpoint.osVersion)}`,
    `Logged In User: ${valueOrPlaceholder(data.impactedEndpoint.loggedInUser)}`,
    `Console Visible IP Address: ${valueOrPlaceholder(data.impactedEndpoint.consoleVisibleIp)}`,
  ];

  const threatSummaryBullets = [
    { label: `${productName} Incident Classification`, value: valueOrPlaceholder(data.threatSummary.incidentClassification) },
    { label: 'Threat Status', value: otherValueOrPlaceholder(data.threatSummary.threatStatus, data.threatSummary.threatStatusOther, 'Not Provided') },
    { label: 'Mitigation Actions Taken', value: mitigationActions.length > 0 ? mitigationActions.join(', ') : 'Not Provided' },
    { label: 'AI Confidence Level', value: otherValueOrPlaceholder(data.threatSummary.aiConfidenceLevel, data.threatSummary.aiConfidenceLevelOther, 'Not Provided') },
    { label: 'Incident Status', value: otherValueOrPlaceholder(data.threatSummary.incidentStatus, data.threatSummary.incidentStatusOther, 'Not Provided') },
    { label: 'Process User', value: valueOrPlaceholder(data.threatSummary.processUser) },
    { label: 'Originating Process', value: valueOrPlaceholder(data.threatSummary.originatingProcess) },
    { label: 'Threat Detected Time', value: formatDateTime(data.threatSummary.detectionTime) || 'Not Provided' },
    { label: 'Signature Verification', value: otherValueOrPlaceholder(data.threatSummary.signatureVerification, data.threatSummary.signatureVerificationOther, 'Not Provided') },
    { label: `${productName} Signer Identity & Publisher Name`, value: valueOrPlaceholder(data.threatSummary.s1SignerPublisher) },
    { label: 'Researched Signer Identity & Publisher Name', value: valueOrPlaceholder(data.threatSummary.researchedSignerPublisher) },
    { label: 'Threat File Name', value: valueOrPlaceholder(data.threatSummary.threatFileName) },
    { label: 'File Hash (SHA-1)', value: valueOrPlaceholder(data.threatSummary.sha1) },
    { label: 'File Hash (SHA-256)', value: valueOrPlaceholder(data.threatSummary.sha256) },
    { label: 'File Path', value: valueOrPlaceholder(data.threatSummary.filePath) },
  ];

  const analystVerdict = otherValueOrPlaceholder(
    data.threatSummary.analystVerdict,
    data.threatSummary.analystVerdictOther,
    'Not Provided',
  );

  const footerLines = (data.preferences.footerText || 'Regards,\nSOC Team\nSafeAeon').split('\n');
  const getDivider = () => data.preferences.includeDividers ? ['------------------------------------------------------------', ''] : [];

  const plainText = [
    title,
    '',
    `Subject: ${subjectLine}`,
    '',
    ...getDivider(),
    'Hi Team,',
    `Please find the details of the ${productName} Security Incident that our SOC detected:`,
    '',
    'Impacted Endpoint:',
    ...impactedEndpointBullets.map((bullet) => `• ${bullet}`),
    '',
    ...getDivider(),
    'Threat Summary:',
    `Analyst Verdict: ${analystVerdict}`,
    ...threatSummaryBullets.map((b) => `• ${b.label}: ${b.value}`),
    '',
    ...getDivider(),
    'SOC Analyst Triage Comments:',
    ...analysisNotesSections.flatMap((section) => [
      `${section.title}:`,
      ...(section.bullets.length > 0 ? section.bullets : ['Not Provided']).map(
        (bullet) => `• ${bullet}`,
      ),
      '',
    ]),
    ...getDivider(),
    'Recommended Next Steps:',
    ...(recommendedNextSteps.length > 0 ? recommendedNextSteps : ['Not Provided']).map(
      (bullet) => `• ${bullet}`,
    ),
    '',
    ...getDivider(),
    ...footerLines.flatMap(line => [line, '']),
  ].join('\n').trimEnd();

  return {
    title,
    subjectLine,
    greeting: 'Hi Team,',
    intro: `Please find the details of the ${productName} Security Incident that our SOC detected:`,
    impactedEndpointBullets,
    analystVerdict,
    threatSummaryBullets,
    analysisNotesSections,
    recommendedNextSteps,
    footer: (data.preferences.footerText || 'Regards,\nSOC Team\nSafeAeon').split('\n'),
    includeDividers: !!data.preferences.includeDividers,
    plainText,
  };
}
