#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function getShortSha() {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch (e) {
    return null;
  }
}

function insertMetaSha(indexPath, sha) {
  let html = fs.readFileSync(indexPath, 'utf8');
  const metaTag = `<meta name="build-sha" content="${sha}" />`;

  if (/name=["']build-sha["']/i.test(html)) {
    html = html.replace(/<meta[^>]*name=["']build-sha["'][^>]*>/i, metaTag);
  } else {
    // insert before </head>
    html = html.replace(/<\/head>/i, `\t\t${metaTag}\n\t</head>`);
  }

  fs.writeFileSync(indexPath, html, 'utf8');
}

const sha = getShortSha();
if (!sha) {
  console.warn('Could not determine git SHA (git may not be available). Skipping insert-sha.');
  process.exit(0);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.resolve(__dirname, '..', 'index.html');
if (!fs.existsSync(indexPath)) {
  console.warn('index.html not found at', indexPath);
  process.exit(0);
}

try {
  insertMetaSha(indexPath, sha);
  console.log('Inserted build-sha meta into index.html:', sha);
} catch (err) {
  console.error('Failed to insert build-sha meta:', err);
  process.exit(1);
}
