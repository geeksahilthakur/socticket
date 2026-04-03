import { DOCX_FILE_NAME, JSON_FILE_NAME, PDF_FILE_NAME } from './constants.js';
import { downloadBlob } from './helpers.js';

function getDocxFont(fontFamily) {
  switch (fontFamily) {
    case 'arial':
      return 'Arial';
    case 'times':
      return 'Times New Roman';
    case 'corporate':
      return 'Aptos';
    case 'calibri':
    default:
      return 'Calibri';
  }
}

function getPdfFont(fontFamily) {
  if (fontFamily === 'times') {
    return 'times';
  }

  return 'helvetica';
}

export async function copyToClipboard(reportText) {
  await navigator.clipboard.writeText(reportText);
}

export async function downloadDocx(report, fontFamily) {
  const { Document, Packer, Paragraph, TextRun } = await import('docx');
  const font = getDocxFont(fontFamily);

  const children = [
    new Paragraph({
      spacing: { after: 160 },
      children: [new TextRun({ text: report.title, bold: true, size: 28, font })],
    }),
    new Paragraph({
      spacing: { after: 160 },
      children: [
        new TextRun({ text: 'Subject: ', bold: true, size: 22, font }),
        new TextRun({ text: report.subjectLine, size: 22, font }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: report.greeting, size: 22, font })],
    }),
    new Paragraph({
      spacing: { after: 140 },
      children: [new TextRun({ text: report.intro, size: 22, font })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: 'Impacted Endpoint:', bold: true, size: 22, font })],
    }),
  ];

  report.impactedEndpointBullets.forEach((bullet) => {
    children.push(
      new Paragraph({
        bullet: { level: 0 },
        spacing: { after: 60 },
        children: [new TextRun({ text: bullet, size: 22, font })],
      }),
    );
  });

  children.push(
    new Paragraph({
      spacing: { before: 120, after: 60 },
      children: [new TextRun({ text: 'Threat Summary:', bold: true, size: 22, font })],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: 'Analyst Verdict: ', bold: true, size: 22, font }),
        new TextRun({ text: report.analystVerdict, size: 22, font }),
      ],
    }),
  );

  report.threatSummaryBullets.forEach((bullet) => {
    children.push(
      new Paragraph({
        bullet: { level: 0 },
        spacing: { after: 60 },
        children: [
          new TextRun({ text: `${bullet.label}: `, bold: true, size: 22, font }),
          new TextRun({ text: bullet.value, size: 22, font }),
        ],
      }),
    );
  });

  children.push(
    new Paragraph({
      spacing: { before: 120, after: 60 },
      children: [new TextRun({ text: 'SOC Analyst Triage Comments:', bold: true, size: 22, font })],
    }),
  );

  report.analysisNotesSections.forEach((section) => {
    children.push(
      new Paragraph({
        spacing: { before: 120, after: 60 },
        children: [new TextRun({ text: `${section.title}:`, bold: true, size: 22, font })],
      }),
    );

    (section.bullets.length > 0 ? section.bullets : ['Not Provided']).forEach((bullet) => {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [new TextRun({ text: bullet, size: 22, font })],
        }),
      );
    });
  });

  children.push(
    new Paragraph({
      spacing: { before: 120, after: 60 },
      children: [new TextRun({ text: 'Recommended Next Steps:', bold: true, size: 22, font })],
    }),
  );

  (report.recommendedNextSteps.length > 0 ? report.recommendedNextSteps : ['Not Provided']).forEach(
    (bullet) => {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [new TextRun({ text: bullet, size: 22, font })],
        }),
      );
    },
  );

  report.footer.forEach((line, index) => {
    children.push(
      new Paragraph({
        spacing: { before: index === 0 ? 320 : 0, after: 120 },
        children: [new TextRun({ text: line, size: 22, font, bold: true })],
      }),
    );
  });

  const document = new Document({
    sections: [
      {
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(document);
  downloadBlob(DOCX_FILE_NAME, blob);
}

export async function downloadPdf(report, fontFamily) {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
  const font = getPdfFont(fontFamily);
  const marginX = 54;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const maxWidth = pageWidth - marginX * 2;
  const bottomMargin = 52;
  let y = 58;

  function ensurePage(spaceNeeded = 16) {
    if (y + spaceNeeded > pageHeight - bottomMargin) {
      pdf.addPage();
      y = 58;
    }
  }

  function drawWrappedText(text, { size = 11, bold = false, indent = 0, after = 6 } = {}) {
    pdf.setFont(font, bold ? 'bold' : 'normal');
    pdf.setFontSize(size);
    const lines = pdf.splitTextToSize(text || ' ', maxWidth - indent);
    lines.forEach((line) => {
      ensurePage(16);
      pdf.text(line, marginX + indent, y);
      y += 16;
    });
    y += after;
  }

  function drawBullets(items) {
    items.forEach((item) => {
      const lines = pdf.splitTextToSize(item || 'Not Provided', maxWidth - 16);
      ensurePage(16 * lines.length + 6);
      pdf.setFont(font, 'normal');
      pdf.setFontSize(11);
      pdf.text('•', marginX, y);
      lines.forEach((line, index) => {
        pdf.text(line, marginX + 14, y + index * 16);
      });
      y += lines.length * 16 + 5;
    });
  }

  drawWrappedText(report.title, { size: 14, bold: true, after: 12 });
  drawWrappedText(`Subject: ${report.subjectLine}`, { size: 11, bold: true, after: 10 });
  drawWrappedText(report.greeting, { size: 11, after: 4 });
  drawWrappedText(report.intro, { size: 11, after: 10 });

  drawWrappedText('Impacted Endpoint:', { size: 11, bold: true, after: 2 });
  drawBullets(report.impactedEndpointBullets);
  y += 6;

  drawWrappedText('Threat Summary:', { size: 11, bold: true, after: 2 });
  drawWrappedText(`Analyst Verdict: ${report.analystVerdict}`, { size: 11, bold: true, after: 2 });
  report.threatSummaryBullets.forEach((item) => {
    ensurePage(16 + 6);
    pdf.setFont(font, 'normal');
    pdf.setFontSize(11);
    pdf.text('•', marginX, y);
    
    // Instead of complex inline text splitting, we draw label bold, then check width
    pdf.setFont(font, 'bold');
    pdf.text(`${item.label}: `, marginX + 14, y);
    const labelWidth = pdf.getTextWidth(`${item.label}: `);
    
    pdf.setFont(font, 'normal');
    const lines = pdf.splitTextToSize(item.value || 'Not Provided', maxWidth - 16 - labelWidth);
    lines.forEach((line, index) => {
      // First line goes next to label, consecutive lines properly aligned
      pdf.text(line, marginX + 14 + (index === 0 ? labelWidth : 0), y + index * 16);
    });
    y += lines.length * 16 + 5;
  });
  y += 6;

  drawWrappedText('SOC Analyst Triage Comments:', { size: 11, bold: true, after: 2 });

  report.analysisNotesSections.forEach((section) => {
    drawWrappedText(`${section.title}:`, { size: 11, bold: true, after: 2 });
    drawBullets(section.bullets.length > 0 ? section.bullets : ['Not Provided']);
    y += 6;
  });

  drawWrappedText('Recommended Next Steps:', { size: 11, bold: true, after: 2 });
  drawBullets(report.recommendedNextSteps.length > 0 ? report.recommendedNextSteps : ['Not Provided']);
  y += 10;

  y += 10;
  report.footer.forEach((line) => {
    drawWrappedText(line, { size: 11, bold: true, after: 6 });
  });

  pdf.save(PDF_FILE_NAME);
}

export function downloadJson(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(JSON_FILE_NAME, blob);
}
