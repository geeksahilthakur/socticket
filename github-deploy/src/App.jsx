import { startTransition, useEffect, useRef, useState } from 'react';
import { Card } from './components/Card.jsx';
import { PreviewPanel } from './components/PreviewPanel.jsx';
import { AnalysisNotesSection } from './components/sections/AnalysisNotesSection.jsx';
import { FinalOutputSection } from './components/sections/FinalOutputSection.jsx';
import { ImpactedEndpointSection } from './components/sections/ImpactedEndpointSection.jsx';
import { RecommendedNextStepsSection } from './components/sections/RecommendedNextStepsSection.jsx';
import { SubjectBuilderSection } from './components/sections/SubjectBuilderSection.jsx';
import { ThreatSummarySection } from './components/sections/ThreatSummarySection.jsx';
import { copyToClipboard, downloadDocx, downloadJson, downloadPdf } from './utils/export.js';
import {
  DEFAULT_FORM_DATA,
  SAMPLE_FORM_DATA,
  createCustomAnalysisNote,
  normalizeFormData,
} from './utils/defaults.js';
import { resolveOtherValue } from './utils/helpers.js';
import { buildReportStructure } from './utils/report.js';
import { loadDraft, loadTheme, saveDraft, saveTheme } from './utils/storage.js';
import { validateReport } from './utils/validation.js';
import { SelectWithOtherField } from './components/fields/SelectWithOtherField.jsx';
import { REPORT_TITLE_OPTIONS } from './data/options.js';

const TOOLBAR_BUTTON_CLASS =
  'rounded-full border border-line bg-canvas px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/50 hover:bg-accent-soft';

export default function App() {
  const [formData, setFormData] = useState(() => loadDraft() ?? normalizeFormData(DEFAULT_FORM_DATA));
  const [theme, setTheme] = useState(() => loadTheme());
  const [statusMessage, setStatusMessage] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const importRef = useRef(null);

  const validation = validateReport(formData);
  const missingCount = Object.keys(validation.errors).length;
  const visibleErrors = submitAttempted ? validation.errors : {};
  const report = buildReportStructure(formData);

  useEffect(() => {
    saveDraft(formData);
  }, [formData]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!statusMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setStatusMessage(null);
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [statusMessage]);

  useEffect(() => {
    if (!formData.threatSummary.incidentClassification.trim()) {
      const resolvedThreatType = resolveOtherValue(
        formData.subject.threatType,
        formData.subject.threatTypeOther,
      );

      if (resolvedThreatType) {
        setFormData((previous) => ({
          ...previous,
          threatSummary: {
            ...previous.threatSummary,
            incidentClassification: resolvedThreatType,
          },
        }));
      }
    }
  }, [
    formData.subject.threatType,
    formData.subject.threatTypeOther,
    formData.threatSummary.incidentClassification,
  ]);

  useEffect(() => {
    if (formData.subject.endpointName && formData.impactedEndpoint.endpoint !== formData.subject.endpointName) {
      setFormData((previous) => ({
        ...previous,
        impactedEndpoint: {
          ...previous.impactedEndpoint,
          endpoint: previous.subject.endpointName,
        },
      }));
    }
  }, [formData.subject.endpointName, formData.impactedEndpoint.endpoint]);

  useEffect(() => {
    if (formData.subject.threatFileName && formData.threatSummary.threatFileName !== formData.subject.threatFileName) {
      setFormData((previous) => ({
        ...previous,
        threatSummary: {
          ...previous.threatSummary,
          threatFileName: previous.subject.threatFileName,
        },
      }));
    }
  }, [formData.subject.threatFileName, formData.threatSummary.threatFileName]);

  function announce(message) {
    setStatusMessage(message);
  }

  function updateSubject(field, nextValue) {
    setFormData((previous) => ({
      ...previous,
      subject: {
        ...previous.subject,
        [field]: nextValue,
      },
    }));
  }

  function updateImpactedEndpoint(field, nextValue) {
    setFormData((previous) => ({
      ...previous,
      impactedEndpoint: {
        ...previous.impactedEndpoint,
        [field]: nextValue,
      },
    }));
  }

  function updateThreatSummary(field, nextValue) {
    setFormData((previous) => ({
      ...previous,
      threatSummary: {
        ...previous.threatSummary,
        [field]: nextValue,
      },
    }));
  }

  function updatePreferences(field, nextValue) {
    setFormData((previous) => ({
      ...previous,
      preferences: {
        ...previous.preferences,
        [field]: nextValue,
      },
    }));
  }

  function toggleListValue(values, value) {
    return values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value];
  }

  function toggleMitigationAction(action) {
    setFormData((previous) => ({
      ...previous,
      threatSummary: {
        ...previous.threatSummary,
        mitigationActions: toggleListValue(previous.threatSummary.mitigationActions, action),
      },
    }));
  }

  function toggleRecommendedStep(step) {
    setFormData((previous) => ({
      ...previous,
      recommendedNextSteps: toggleListValue(previous.recommendedNextSteps, step),
    }));
  }

  function addAnalysisNote() {
    setFormData((previous) => ({
      ...previous,
      analysisNotes: [...previous.analysisNotes, createCustomAnalysisNote()],
    }));
  }

  function removeAnalysisNote(id) {
    setFormData((previous) => ({
      ...previous,
      analysisNotes: previous.analysisNotes.filter((note) => note.id !== id),
    }));
  }

  function updateAnalysisNote(id, field, nextValue) {
    setFormData((previous) => ({
      ...previous,
      analysisNotes: previous.analysisNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              [field]: nextValue,
            }
          : note,
      ),
    }));
  }

  function handleUseThreatTypeAsClassification() {
    const resolvedThreatType = resolveOtherValue(
      formData.subject.threatType,
      formData.subject.threatTypeOther,
    );

    if (!resolvedThreatType) {
      announce('Select the threat type first to auto-fill the incident classification.');
      return;
    }

    updateThreatSummary('incidentClassification', resolvedThreatType);
    announce('Incident classification updated from the threat type.');
  }

  async function handleCopy() {
    setSubmitAttempted(true);
    if (!validation.isValid) {
      announce('Resolve the highlighted fields before copying the report.');
      return;
    }

    await copyToClipboard(report.plainText);
    announce('Report copied to the clipboard.');
  }

  async function handleDownloadDocx() {
    setSubmitAttempted(true);
    if (!validation.isValid) {
      announce('Resolve the highlighted fields before exporting the DOCX.');
      return;
    }

    await downloadDocx(report, formData.preferences.fontFamily);
    announce('DOCX export started.');
  }

  async function handleDownloadPdf() {
    setSubmitAttempted(true);
    if (!validation.isValid) {
      announce('Resolve the highlighted fields before exporting the PDF.');
      return;
    }

    await downloadPdf(report, formData.preferences.fontFamily);
    announce('PDF export started.');
  }

  function handleExportJson() {
    downloadJson(formData);
    announce('Draft JSON exported.');
  }

  function handleImportJson(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    file
      .text()
      .then((content) => {
        const parsed = JSON.parse(content);
        startTransition(() => {
          setFormData(normalizeFormData(parsed));
          setSubmitAttempted(false);
        });
        announce('Draft JSON imported successfully.');
      })
      .catch(() => {
        announce('The selected JSON file could not be imported.');
      })
      .finally(() => {
        event.target.value = '';
      });
  }

  function handleLoadSample() {
    startTransition(() => {
      setFormData(normalizeFormData(SAMPLE_FORM_DATA));
      setSubmitAttempted(false);
    });
    announce('Sample SentinelOne report loaded.');
  }

  function handleResetForm() {
    startTransition(() => {
      setFormData(normalizeFormData(DEFAULT_FORM_DATA));
      setSubmitAttempted(false);
    });
    announce('Report draft reset.');
  }

  return (
    <div className="min-h-screen bg-canvas text-text">
      <div className="mx-auto max-w-[1640px] px-3 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="grid gap-5 lg:gap-6 lg:grid-cols-[minmax(0,1fr)_500px]">
          <main className="space-y-6">
            <Card className="border-accent/20 bg-panel">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="space-y-4 max-w-xl w-full">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                    SOC Ticket Builder - GeekSahil
                  </p>
                  <SelectWithOtherField
                    id="report-title-header"
                    label="Main Report Heading"
                    tooltip="Keep SentinelOne by default, or choose Other only when your team needs a different heading."
                    otherLabel="Custom Report Heading"
                    value={formData.preferences.reportTitle}
                    otherValue={formData.preferences.reportTitleOther}
                    options={REPORT_TITLE_OPTIONS}
                    error={visibleErrors['preferences.reportTitle']}
                    otherError={visibleErrors['preferences.reportTitleOther']}
                    required
                    onChange={(nextValue) => updatePreferences('reportTitle', nextValue)}
                    onOtherChange={(nextValue) => updatePreferences('reportTitleOther', nextValue)}
                  />
                  <p className="max-w-3xl text-sm leading-6 text-muted">
                    Streamlined SOC ticket creation. Keep the fields tight, hover the info buttons for writing flow hints, and export directly to DOCX or PDF.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={TOOLBAR_BUTTON_CLASS}
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    {theme === 'dark' ? 'Day Mode' : 'Night Mode'}
                  </button>
                  <button type="button" className={TOOLBAR_BUTTON_CLASS} onClick={handleLoadSample}>
                    Sample Data
                  </button>
                  <button type="button" className={TOOLBAR_BUTTON_CLASS} onClick={handleExportJson}>
                    Export JSON
                  </button>
                  <button
                    type="button"
                    className={TOOLBAR_BUTTON_CLASS}
                    onClick={() => importRef.current?.click()}
                  >
                    Import JSON
                  </button>
                  <button type="button" className={TOOLBAR_BUTTON_CLASS} onClick={handleResetForm}>
                    Reset
                  </button>
                  <input
                    ref={importRef}
                    className="hidden"
                    type="file"
                    accept="application/json"
                    onChange={handleImportJson}
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-3 border-t border-line/70 pt-5 sm:grid-cols-3">
                <div className="rounded-2xl border border-line bg-canvas/70 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Theme</p>
                  <p className="mt-2 text-base font-semibold text-text">
                    {theme === 'dark' ? 'Night Mode' : 'Day Mode'}
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-canvas/70 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Validation</p>
                  <p className="mt-2 text-base font-semibold text-text">
                    {validation.isValid ? 'Ready to Export' : 'Needs Attention'}
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-canvas/70 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Missing Fields</p>
                  <p className="mt-2 text-base font-semibold text-text">{missingCount}</p>
                </div>
              </div>
            </Card>

            <Card>
              <SubjectBuilderSection value={formData.subject} errors={visibleErrors} onChange={updateSubject} />
            </Card>

            <Card>
              <ImpactedEndpointSection
                value={formData.impactedEndpoint}
                errors={visibleErrors}
                onChange={updateImpactedEndpoint}
              />
            </Card>

            <Card>
              <ThreatSummarySection
                value={formData.threatSummary}
                productName={resolveOtherValue(formData.subject.productName, formData.subject.productNameOther)}
                errors={visibleErrors}
                onChange={updateThreatSummary}
                onToggleMitigationAction={toggleMitigationAction}
                onAutofillClassification={handleUseThreatTypeAsClassification}
              />
            </Card>

            <Card>
              <AnalysisNotesSection
                value={formData.analysisNotes}
                verdict={resolveOtherValue(formData.threatSummary.analystVerdict, formData.threatSummary.analystVerdictOther)}
                justification={formData.threatSummary.falsePositiveJustification}
                onJustificationChange={(nextValue) => updateThreatSummary('falsePositiveJustification', nextValue)}
                onAddBlock={addAnalysisNote}
                onRemoveBlock={removeAnalysisNote}
                onChangeBlock={updateAnalysisNote}
              />
            </Card>

            <Card>
              <RecommendedNextStepsSection
                values={formData.recommendedNextSteps}
                customValue={formData.customNextSteps}
                error={visibleErrors.recommendedNextSteps}
                onToggle={toggleRecommendedStep}
                onCustomChange={(nextValue) =>
                  setFormData((previous) => ({
                    ...previous,
                    customNextSteps: nextValue,
                  }))
                }
              />
            </Card>

            <FinalOutputSection
              isValid={validation.isValid}
              missingCount={missingCount}
              preferences={formData.preferences}
              errors={visibleErrors}
              onPreferenceChange={updatePreferences}
              onCopy={handleCopy}
              onDownloadDocx={handleDownloadDocx}
              onDownloadPdf={handleDownloadPdf}
            />
          </main>

          <aside>
            <PreviewPanel
              report={report}
              missingCount={missingCount}
              isValid={validation.isValid}
              statusMessage={statusMessage}
              fontFamily={formData.preferences.fontFamily}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
