import { Card } from './Card.jsx';
import { cn, getFontPreviewStyle } from '../utils/helpers.js';

function BulletList({ items }) {
  return (
    <ul className="space-y-2 pl-5 text-[14px] leading-7 text-slate-700">
      {items.map((bullet, index) => (
        <li key={`${bullet}-${index}`} className="list-disc">
          {bullet}
        </li>
      ))}
    </ul>
  );
}

export function PreviewPanel({ report, missingCount, isValid, statusMessage, fontFamily }) {
  return (
    <div className="space-y-5 lg:sticky lg:top-6">
      <Card
        eyebrow="Live Preview"
        title="SentinelOne Format"
        actions={
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]',
              isValid ? 'bg-success/15 text-success' : 'bg-danger/10 text-danger',
            )}
          >
            {isValid ? 'Ready' : `${missingCount} Missing`}
          </span>
        }
      >
        <div className="space-y-5">
          {statusMessage ? (
            <div className="rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
              {statusMessage}
            </div>
          ) : null}

          <div className="rounded-[24px] border border-line bg-white shadow-panel" style={getFontPreviewStyle(fontFamily)}>
            <div className="max-h-[78vh] space-y-6 overflow-auto px-5 py-5 sm:px-6 sm:py-6">
              <div className="space-y-4">
                <h3 className="text-[20px] font-bold text-slate-900">{report.title}</h3>
                <p className="text-[14px] leading-7 text-slate-900">
                  <span className="font-bold">Subject:</span> {report.subjectLine}
                </p>
              </div>

              <div className="space-y-2 text-[14px] leading-7 text-slate-800">
                <p>{report.greeting}</p>
                <p>{report.intro}</p>
              </div>

              {report.includeDividers ? <hr className="border-line/60" /> : null}

              <div className="space-y-3">
                <h4 className="text-[15px] font-bold text-slate-900">Impacted Endpoint:</h4>
                <BulletList items={report.impactedEndpointBullets} />
              </div>

              {report.includeDividers ? <hr className="border-line/60" /> : null}

              <div className="space-y-3">
                <h4 className="text-[15px] font-bold text-slate-900">Threat Summary:</h4>
                <p className="text-[14px] leading-7 text-slate-900">
                  <span className="font-bold">Analyst Verdict:</span> {report.analystVerdict}
                </p>
                <ul className="space-y-2 pl-5 text-[14px] leading-7 text-slate-700">
                  {report.threatSummaryBullets.map((bullet, index) => (
                    <li key={`threat-${index}`} className="list-disc">
                      <span className="font-bold text-slate-900">{bullet.label}:</span> {bullet.value}
                    </li>
                  ))}
                </ul>
              </div>

              {report.includeDividers ? <hr className="border-line/60" /> : null}

              <div className="space-y-3">
                <h4 className="text-[15px] font-bold text-slate-900">SOC Analyst Triage Comments:</h4>
              </div>

              {report.analysisNotesSections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-[15px] font-bold text-slate-900">{section.title}:</h4>
                  <BulletList items={section.bullets.length > 0 ? section.bullets : ['Not Provided']} />
                </div>
              ))}

              {report.includeDividers ? <hr className="border-line/60" /> : null}

              <div className="space-y-3">
                <h4 className="text-[15px] font-bold text-slate-900">Recommended Next Steps:</h4>
                <BulletList items={report.recommendedNextSteps.length > 0 ? report.recommendedNextSteps : ['Not Provided']} />
              </div>

              {report.includeDividers ? <hr className="border-line/60" /> : null}

              <div className="space-y-2 pt-6">
                {report.footer.map((line) => (
                  <p key={`footer-${line}`} className="text-[14px] font-bold text-slate-900">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
