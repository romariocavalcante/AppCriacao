export function generateCertificateSVG(name, title, dateStr) {
  const date = dateStr || new Date().toLocaleDateString();
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1120" height="792" viewBox="0 0 1120 792">
    <rect width="100%" height="100%" fill="#f8fafc" />
    <rect x="40" y="40" width="1040" height="712" rx="16" fill="#fff" stroke="#e6eef6" stroke-width="2" />
    <text x="560" y="140" font-family="Segoe UI, Roboto, Arial" font-size="28" fill="#0f172a" text-anchor="middle" font-weight="700">${escapeXml(title)}</text>
    <text x="560" y="220" font-family="Segoe UI, Roboto, Arial" font-size="20" fill="#334155" text-anchor="middle">Conferido a</text>
    <text x="560" y="280" font-family="Segoe UI, Roboto, Arial" font-size="36" fill="#0b1220" text-anchor="middle" font-weight="700">${escapeXml(name)}</text>
    <text x="560" y="340" font-family="Segoe UI, Roboto, Arial" font-size="16" fill="#475569" text-anchor="middle">Concluiu os estudos com sucesso.</text>
    <text x="560" y="380" font-family="Segoe UI, Roboto, Arial" font-size="14" fill="#64748b" text-anchor="middle">Data: ${escapeXml(date)}</text>
    <g transform="translate(120,520)">
      <rect x="0" y="0" width="320" height="120" rx="8" fill="#f1f5f9" stroke="#e2e8f0" />
      <text x="160" y="68" font-family="Segoe UI, Roboto, Arial" font-size="12" fill="#334155" text-anchor="middle">Assinatura</text>
    </g>
    <g transform="translate(680,520)">
      <rect x="0" y="0" width="320" height="120" rx="8" fill="#f1f5f9" stroke="#e2e8f0" />
      <text x="160" y="68" font-family="Segoe UI, Roboto, Arial" font-size="12" fill="#334155" text-anchor="middle">Autoridade</text>
    </g>
  </svg>`;
  return svg;
}

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&"']/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
    }
  });
}

export function downloadDataUrl(filename, dataUrl) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function generateAndDownloadCertificate(name, title) {
  const svg = generateCertificateSVG(name, title);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  downloadDataUrl(`${title.replace(/\s+/g, '_')}_${name.replace(/\s+/g, '_')}.svg`, url);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
