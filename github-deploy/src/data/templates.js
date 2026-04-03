export const GUIDED_ANALYSIS_NOTES = [
  {
    key: 'file-context',
    title: 'Detected File Context',
    hint:
      'First explain what the detected file or process is, what it does, and whether it belongs to a legitimate application.',
    placeholder:
      'The detected file "dcagentservice.exe" is responsible for executing tasks assigned by the central server on client machines.\nThe file is part of the ManageEngine Desktop Central software suite.',
  },
  {
    key: 'publisher-context',
    title: 'Software / Company Context',
    hint:
      'Then describe the related software, product role, or company background so a new analyst can explain why the file exists.',
    placeholder:
      'ManageEngine Desktop Central is a unified endpoint management and security solution.\nZoho Corporation develops business and IT management software used in enterprise environments.',
  },
  {
    key: 'reputation-context',
    title: 'Reputation / Research Findings',
    hint:
      'Next write about OSINT, signer validation, or publisher research findings so the analyst can justify the verdict clearly.',
    placeholder:
      'No security vendors have marked the file hash as malicious after reviewing OSINT sources.\nThe signer and researched publisher names align with the software vendor.',
  },
  {
    key: 'behavior-context',
    title: 'SentinelOne Behavioral Findings',
    hint:
      'Finally describe why SentinelOne flagged the file, including behavior indicators, mitigations taken, and why it may be suspicious or benign.',
    placeholder:
      'SentinelOne Behavioral AI flagged the file due to indicators such as data encoding, obfuscated content, process injection, or raw-volume access.\nSentinelOne killed the process and quarantined related instances after detection.',
  },
];
