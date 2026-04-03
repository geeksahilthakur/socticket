import { GUIDED_ANALYSIS_NOTES } from '../data/templates.js';
import { createId } from './helpers.js';

export function createGuidedAnalysisNotes() {
  return GUIDED_ANALYSIS_NOTES.map((note) => ({
    id: createId(),
    key: note.key,
    title: note.title,
    hint: note.hint,
    placeholder: note.placeholder,
    points: '',
  }));
}

export function createCustomAnalysisNote() {
  return {
    id: createId(),
    key: 'custom',
    title: 'Custom Analyst Note',
    hint: 'Use this optional box for any extra customer-ready findings that do not fit the guided flow.',
    placeholder:
      'Add any extra analyst findings here, using one line per bullet point.',
    points: '',
  };
}

export const DEFAULT_THEME = 'light';

export const DEFAULT_FORM_DATA = {
  subject: {
    mspClientName: '',
    endClientName: '',
    productName: 'SentinelOne',
    productNameOther: '',
    severity: '',
    severityOther: '',
    threatType: '',
    threatTypeOther: '',
    threatFileName: '',
    endpointName: '',
    actionOnProcess: '',
    actionOnProcessOther: '',
    additionalComments: 'Response Needed',
  },
  impactedEndpoint: {
    groupName: 'Default Group',
    groupNameOther: '',
    endpoint: '',
    domain: '',
    osVersion: '',
    loggedInUser: '',
    consoleVisibleIp: '',
  },
  threatSummary: {
    analystVerdict: '',
    analystVerdictOther: '',
    incidentClassification: '',
    threatStatus: '',
    threatStatusOther: '',
    mitigationActions: [],
    customMitigationActions: '',
    aiConfidenceLevel: '',
    aiConfidenceLevelOther: '',
    incidentStatus: '',
    incidentStatusOther: '',
    processUser: '',
    originatingProcess: '',
    detectionTime: '',
    signatureVerification: '',
    signatureVerificationOther: '',
    s1SignerPublisher: '',
    researchedSignerPublisher: '',
    threatFileName: '',
    sha1: '',
    sha256: '',
    filePath: '',
    falsePositiveJustification: '',
  },
  analysisNotes: createGuidedAnalysisNotes(),
  recommendedNextSteps: [],
  customNextSteps: '',
  preferences: {
    reportTitle: 'EDR - SentinelOne Alert Report',
    reportTitleOther: '',
    fontFamily: 'calibri',
    footerText: 'Regards,\nSOC Team\nSafeAeon',
    includeDividers: false,
  },
};

export const SAMPLE_FORM_DATA = {
  subject: {
    mspClientName: 'Li-COR',
    endClientName: 'Biotech',
    productName: 'SentinelOne',
    productNameOther: '',
    severity: 'High',
    severityOther: '',
    threatType: 'Ransomware',
    threatTypeOther: '',
    threatFileName: 'dcagentservice.exe',
    endpointName: 'BTC-GVQ8VB4',
    actionOnProcess: 'Killed and Quarantined',
    actionOnProcessOther: '',
    additionalComments: 'Response Needed',
  },
  impactedEndpoint: {
    groupName: 'Default Group',
    groupNameOther: '',
    endpoint: 'BTC-GVQ8VB4',
    domain: 'LICORBIO',
    osVersion: 'Windows 11 Pro 26100',
    loggedInUser: 'dan.leib',
    consoleVisibleIp: '97.88.223.6',
  },
  threatSummary: {
    analystVerdict: 'Potential False Positive',
    analystVerdictOther: '',
    incidentClassification: 'Ransomware',
    threatStatus: 'Mitigated',
    threatStatusOther: '',
    mitigationActions: ['Killed and Quarantined'],
    customMitigationActions: '',
    aiConfidenceLevel: 'Suspicious',
    aiConfidenceLevelOther: '',
    incidentStatus: 'In Progress',
    incidentStatusOther: '',
    processUser: 'NT AUTHORITY\\SYSTEM',
    originatingProcess: 'services.exe',
    detectionTime: '2025-09-15T08:21',
    signatureVerification: 'SignedVerified',
    signatureVerificationOther: '',
    s1SignerPublisher: 'ZOHO CORPORATION PRIVATE LIMITED',
    researchedSignerPublisher: 'ZOHO CORPORATION PRIVATE LIMITED',
    threatFileName: 'dcagentservice.exe',
    sha1: 'ccadf6ff7c90ee91df1bd155701082d6f26ef5a6',
    sha256: '2808e19455f5bf9ecd3d5d38deb618afc2a0ee4b45d2ba78c20dd2166ae64812',
    filePath: '\\Device\\HarddiskVolume3\\Program Files (x86)\\ManageEngine\\UEMS_Agent\\bin\\dcagentservice.exe',
    falsePositiveJustification:
      'The file belongs to a legitimate ManageEngine component, the publisher identity aligns with Zoho Corporation, and OSINT sources do not currently mark the hashes as malicious.',
  },
  analysisNotes: [
    {
      id: createId(),
      key: 'file-context',
      title: 'Detected File Context',
      hint: GUIDED_ANALYSIS_NOTES[0].hint,
      placeholder: GUIDED_ANALYSIS_NOTES[0].placeholder,
      points:
        'The detected file "dcagentservice.exe" is responsible for executing tasks assigned by the central server on client machines.\nThe threat file is part of the ManageEngine Desktop Central software developed by Zoho Corporation Private Limited.',
    },
    {
      id: createId(),
      key: 'publisher-context',
      title: 'Software / Company Context',
      hint: GUIDED_ANALYSIS_NOTES[1].hint,
      placeholder: GUIDED_ANALYSIS_NOTES[1].placeholder,
      points:
        'ManageEngine Desktop Central is a unified endpoint management and security solution that helps manage servers, laptops, desktops, smartphones, and tablets from a central location.\nZoho Corporation is a major multinational technology company that develops cloud-based business software.',
    },
    {
      id: createId(),
      key: 'reputation-context',
      title: 'Reputation / Research Findings',
      hint: GUIDED_ANALYSIS_NOTES[2].hint,
      placeholder: GUIDED_ANALYSIS_NOTES[2].placeholder,
      points:
        'No security vendors have marked the file hash as malicious after reviewing OSINT sources.\nThe signer identity and researched publisher name both align with Zoho Corporation Private Limited.',
    },
    {
      id: createId(),
      key: 'behavior-context',
      title: 'SentinelOne Behavioral Findings',
      hint: GUIDED_ANALYSIS_NOTES[3].hint,
      placeholder: GUIDED_ANALYSIS_NOTES[3].placeholder,
      points:
        'SentinelOne Behavioral AI flagged the file as suspicious based on indicators such as data encoding or obfuscated content, process injection, infostealer or discovery behavior, and direct raw-volume access.\nAs a result, SentinelOne killed the process and quarantined all related file instances.',
    },
  ],
  recommendedNextSteps: [
    'Please verify if the end-user needs the file and is an authorized file for the customer environment.',
    'If it is a False Positive, please let the SOC know to un-quarantine and exclude this file globally from the console.',
    'If it is a True Positive, please let us know to blacklist this file on the S1 console.',
  ],
  customNextSteps: '',
  preferences: {
    reportTitle: 'EDR - SentinelOne Alert Report',
    reportTitleOther: '',
    fontFamily: 'calibri',
    footerText: 'Regards,\nSOC Team\nSafeAeon',
    includeDividers: false,
  },
};

export function normalizeFormData(value) {
  const candidate = value || {};

  return {
    subject: {
      ...DEFAULT_FORM_DATA.subject,
      ...(candidate.subject || {}),
    },
    impactedEndpoint: {
      ...DEFAULT_FORM_DATA.impactedEndpoint,
      ...(candidate.impactedEndpoint || {}),
    },
    threatSummary: {
      ...DEFAULT_FORM_DATA.threatSummary,
      ...(candidate.threatSummary || {}),
      mitigationActions: Array.isArray(candidate.threatSummary?.mitigationActions)
        ? candidate.threatSummary.mitigationActions.filter(Boolean)
        : [],
    },
    analysisNotes:
      Array.isArray(candidate.analysisNotes) && candidate.analysisNotes.length > 0
        ? candidate.analysisNotes.map((note, index) => ({
            id: note.id || createId(),
            key: note.key || `imported-${index}`,
            title: note.title || note.commentTitle || GUIDED_ANALYSIS_NOTES[index]?.title || 'Custom Analyst Note',
            hint: note.hint || GUIDED_ANALYSIS_NOTES[index]?.hint || 'Add customer-ready triage notes here.',
            placeholder:
              note.placeholder ||
              GUIDED_ANALYSIS_NOTES[index]?.placeholder ||
              'Use one line per bullet point.',
            points: note.points || note.commentPoints || '',
          }))
        : createGuidedAnalysisNotes(),
    recommendedNextSteps: Array.isArray(candidate.recommendedNextSteps)
      ? candidate.recommendedNextSteps.filter(Boolean)
      : [],
    customNextSteps: candidate.customNextSteps || '',
    preferences: {
      ...DEFAULT_FORM_DATA.preferences,
      ...(candidate.preferences || {}),
      footerText: candidate.preferences?.footerText ?? (candidate.preferences?.socTeamName ? `Regards,\nSOC Team\n${candidate.preferences.socTeamName}` : DEFAULT_FORM_DATA.preferences.footerText),
    },
  };
}
