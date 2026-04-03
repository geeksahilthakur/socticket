import { Card } from '../Card.jsx';
import { SectionHeader } from '../SectionHeader.jsx';
import { REPORT_FONT_OPTIONS, REPORT_TITLE_OPTIONS } from '../../data/options.js';
import { SelectField } from '../fields/SelectField.jsx';
import { TextArea } from '../fields/TextArea.jsx';

export function FinalOutputSection({
  isValid,
  missingCount,
  preferences,
  errors,
  onPreferenceChange,
  onCopy,
  onDownloadDocx,
  onDownloadPdf,
}) {
  return (
    <div className="space-y-6">
      <SectionHeader
        step="Section 06"
        title="Export"
        description="The downloaded DOCX and PDF follow the SentinelOne sample structure from the reference document."
      />

      <Card className="border-accent/20 bg-gradient-to-br from-panel to-accent-soft/60">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="grid gap-5">
            <SelectField
              id="report-font"
              label="Export Font"
              tooltip="Calibri is the closest default to the Word sample formatting."
              options={REPORT_FONT_OPTIONS}
              value={preferences.fontFamily}
              onChange={(event) => onPreferenceChange('fontFamily', event.target.value)}
              required
            />

            <TextArea
              id="footer-text"
              label="Footer Text"
              tooltip="The sign-off block that appears at the bottom of the report (e.g., Regards, SOC Team, SafeAeon)."
              value={preferences.footerText}
              onChange={(event) => onPreferenceChange('footerText', event.target.value)}
              placeholder={'Regards,\nSOC Team\nSafeAeon'}
              error={errors['preferences.footerText']}
              required
            />
            
            <label className="flex items-center gap-3 bg-canvas/30 rounded-xl p-4 border border-line/50 hover:bg-canvas/50 transition cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.includeDividers}
                onChange={(e) => onPreferenceChange('includeDividers', e.target.checked)}
                className="w-5 h-5 rounded border-line text-accent focus:ring-accent bg-canvas"
              />
              <span className="text-sm font-semibold text-text">Add Section Dividers</span>
            </label>
          </div>

          <div className="flex flex-col justify-between gap-5 rounded-[20px] border border-line/80 bg-panel px-5 py-5">
            <div className="space-y-2">
              <p className="font-display text-2xl font-semibold text-text">
                {isValid ? 'Report ready to export.' : 'Complete the required report fields.'}
              </p>
              <p className="text-sm leading-6 text-muted">
                {isValid
                  ? 'The current preview reflects the same title, bullets, and section order used in the PDF and DOCX download.'
                  : `${missingCount} required item${missingCount === 1 ? '' : 's'} still need attention before export.`}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full border border-line bg-canvas px-4 py-3 text-sm font-semibold text-text transition hover:border-accent/50 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isValid}
                onClick={onCopy}
              >
                Copy
              </button>
              <button
                type="button"
                className="rounded-full border border-line bg-canvas px-4 py-3 text-sm font-semibold text-text transition hover:border-accent/50 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isValid}
                onClick={onDownloadDocx}
              >
                Download DOCX
              </button>
              <button
                type="button"
                className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isValid}
                onClick={onDownloadPdf}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
