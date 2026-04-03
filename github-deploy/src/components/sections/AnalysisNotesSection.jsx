import { SectionHeader } from '../SectionHeader.jsx';
import { Card } from '../Card.jsx';
import { TextArea } from '../fields/TextArea.jsx';
import { TextInput } from '../fields/TextInput.jsx';

export function AnalysisNotesSection({
  value,
  verdict,
  justification,
  onJustificationChange,
  onAddBlock,
  onRemoveBlock,
  onChangeBlock,
}) {
  const showJustification = Boolean(verdict);
  const justificationTitle = verdict ? `${verdict} Justification` : 'Verdict Justification';
  
  return (
    <div className="space-y-6">
      <SectionHeader
        step="Section 04"
        title="SOC Analyst Triage Comments"
        description="These guided boxes help new analysts follow the same writing flow as the official sample. None of the boxes are mandatory individually."
        aside={
          <button
            type="button"
            className="w-full sm:w-auto rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            onClick={onAddBlock}
          >
            Add Custom Note
          </button>
        }
      />

      <div className="space-y-4">
        {showJustification ? (
          <Card
            title={justificationTitle}
            className="bg-accent-soft/20 border-accent/20"
          >
            <TextArea
              id="verdict-justification"
              label={justificationTitle}
              tooltip={`Write the rationale for the selected analyst verdict: ${verdict || 'Not Provided'}.`}
              value={justification || ''}
              onChange={(event) => onJustificationChange(event.target.value)}
              placeholder={`Explain the rationale behind the ${verdict || 'current'} verdict.`}
              hint={`This will appear as the final block in the SOC Analyst Triage Comments.`}
            />
          </Card>
        ) : null}

        {value.map((block, index) => (
          <Card
            key={block.id}
            title={block.title}
            actions={
              <button
                type="button"
                className="rounded-full border border-danger/30 bg-danger/10 px-4 py-2 text-sm font-medium text-danger transition hover:bg-danger/15"
                onClick={() => onRemoveBlock(block.id)}
              >
                Remove
              </button>
            }
            className="bg-canvas/50"
          >
            <div className="grid gap-5">
              <TextInput
                id={`analysis-title-${block.id}`}
                label="Note Heading"
                tooltip={block.hint}
                value={block.title}
                onChange={(event) => onChangeBlock(block.id, 'title', event.target.value)}
                placeholder={`Analyst Note ${index + 1}`}
              />

              <TextArea
                id={`analysis-points-${block.id}`}
                label="Analyst Points"
                tooltip={block.hint}
                value={block.points}
                onChange={(event) => onChangeBlock(block.id, 'points', event.target.value)}
                placeholder={block.placeholder}
                hint="Use one line per bullet point. Filled lines will appear under SOC Analyst Triage Comments."
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
