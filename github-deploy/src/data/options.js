function withOther(options) {
  return [...options, { label: 'Other', value: 'Other' }];
}

export const REPORT_TITLE_OPTIONS = withOther([
  { label: 'EDR - SentinelOne Alert Report', value: 'EDR - SentinelOne Alert Report' },
  { label: 'EDR - CrowdStrike Alert Report', value: 'EDR - CrowdStrike Alert Report' },
  { label: 'EDR - Microsoft Defender Alert Report', value: 'EDR - Microsoft Defender Alert Report' },
]);

export const PRODUCT_OPTIONS = withOther([
  { label: 'SentinelOne', value: 'SentinelOne' },
  { label: 'CrowdStrike', value: 'CrowdStrike' },
  { label: 'Microsoft Defender', value: 'Microsoft Defender' },
]);

export const SEVERITY_OPTIONS = withOther([
  { label: 'Critical', value: 'Critical' },
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
]);

export const THREAT_TYPE_OPTIONS = withOther([
  { label: 'Ransomware', value: 'Ransomware' },
  { label: 'Malware', value: 'Malware' },
  { label: 'Trojan', value: 'Trojan' },
  { label: 'Suspicious Activity', value: 'Suspicious Activity' },
  { label: 'Infostealer', value: 'Infostealer' },
]);

export const ACTION_ON_PROCESS_OPTIONS = withOther([
  { label: 'Killed and Quarantined', value: 'Killed and Quarantined' },
  { label: 'Killed', value: 'Killed' },
  { label: 'Quarantined', value: 'Quarantined' },
  { label: 'Blocked', value: 'Blocked' },
  { label: 'Allowed', value: 'Allowed' },
]);

export const GROUP_OPTIONS = withOther([
  { label: 'Default Group', value: 'Default Group' },
  { label: 'Servers', value: 'Servers' },
  { label: 'Workstations', value: 'Workstations' },
  { label: 'Biotech', value: 'Biotech' },
]);

export const ANALYST_VERDICT_OPTIONS = withOther([
  { label: 'True Positive', value: 'True Positive' },
  { label: 'Potential True Positive', value: 'Potential True Positive' },
  { label: 'False Positive', value: 'False Positive' },
  { label: 'Potential False Positive', value: 'Potential False Positive' },
]);

export const THREAT_STATUS_OPTIONS = withOther([
  { label: 'Mitigated', value: 'Mitigated' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Active', value: 'Active' },
  { label: 'Blocked', value: 'Blocked' },
]);

export const MITIGATION_ACTION_OPTIONS = [
  { label: 'Killed and Quarantined', value: 'Killed and Quarantined' },
  { label: 'Killed', value: 'Killed' },
  { label: 'Quarantined', value: 'Quarantined' },
  { label: 'Rollback', value: 'Rollback' },
  { label: 'Network Isolation', value: 'Network Isolation' },
  { label: 'Other', value: 'Other' },
];

export const AI_CONFIDENCE_OPTIONS = withOther([
  { label: 'Suspicious', value: 'Suspicious' },
  { label: 'Malicious', value: 'Malicious' },
  { label: 'Benign', value: 'Benign' },
  { label: 'Unknown', value: 'Unknown' },
]);

export const INCIDENT_STATUS_OPTIONS = withOther([
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Open', value: 'Open' },
  { label: 'Resolved', value: 'Resolved' },
  { label: 'Closed', value: 'Closed' },
]);

export const SIGNATURE_VERIFICATION_OPTIONS = withOther([
  { label: 'SignedVerified', value: 'SignedVerified' },
  { label: 'Unsigned', value: 'Unsigned' },
  { label: 'Signature Revoked', value: 'Signature Revoked' },
  { label: 'Unknown', value: 'Unknown' },
]);

export const NEXT_STEP_OPTIONS = [
  {
    label: 'Verify authorized file',
    value: 'Please verify if the end-user needs the file and is an authorized file for the customer environment.',
  },
  {
    label: 'Un-quarantine if FP',
    value: 'If it is a False Positive, please let the SOC know to un-quarantine and exclude this file globally from the console.',
  },
  {
    label: 'Blacklist if TP',
    value: 'If it is a True Positive, please let us know to blacklist this file on the S1 console.',
  },
  {
    label: 'Run full disk scan',
    value: 'Initiate a Full Disk Scan on the affected endpoint if additional validation confirms suspicious activity.',
  },
  {
    label: 'Isolate network',
    value: 'Isolate the affected endpoint from the network to prevent potential lateral movement.',
  },
  {
    label: 'Perform password reset',
    value: 'Initiate a password reset for the compromised or potentially compromised user account.',
  },
  {
    label: 'Monitor endpoint',
    value: 'Monitor the endpoint closely for the next 24-48 hours for any recurring anomalous behavior.',
  },
];

export const REPORT_FONT_OPTIONS = [
  { label: 'Calibri', value: 'calibri' },
  { label: 'Corporate Sans', value: 'corporate' },
  { label: 'Arial', value: 'arial' },
  { label: 'Times New Roman', value: 'times' },
];

export const MSP_CLIENT_SUGGESTIONS = ['Li-COR', 'Octagon', 'Managed SOC Client'];
export const END_CLIENT_SUGGESTIONS = ['Biotech', 'Northwind', 'SafeAeon'];
export const OS_SUGGESTIONS = [
  'Windows 11 Pro 26100',
  'Windows 11 Enterprise 23H2',
  'Windows 10 Enterprise 22H2',
  'Windows Server 2022',
];
