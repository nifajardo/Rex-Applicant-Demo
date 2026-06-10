#!/usr/bin/env node

import markdownpdf from 'markdown-pdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define file paths
const mdFile = path.join(__dirname, '../APPLICANT_GUIDE.md');
const pdfFile = path.join(__dirname, '../public/APPLICANT_GUIDE.pdf');

// Ensure public directory exists
const publicDir = path.dirname(pdfFile);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Markdown PDF options
const options = {
  cssPath: path.join(__dirname, '../public/pdf-styles.css'),
  paperFormat: 'A4',
  paperOrientation: 'portrait',
  paperBorder: '1cm',
  runBeforeCreate(mdDocument) {
    // Add CSS for styling
    mdDocument.definePageStyle('heading', {
      header: {
        height: '1cm',
        contents: {
          default: '<div style="text-align: center; font-size: 12px; color: #666;">CGB Scholarship Application Guide</div>'
        }
      },
      footer: {
        height: '0.5cm',
        contents: {
          default: '<div style="text-align: center; font-size: 10px; color: #999;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
        }
      }
    });
  }
};

// Convert markdown to PDF
markdownpdf(options)
  .from.path(mdFile)
  .to.path(pdfFile, function () {
    console.log('✓ PDF created successfully!');
    console.log(`  Location: ${pdfFile}`);
    console.log(`  File size: ${(fs.statSync(pdfFile).size / 1024).toFixed(2)} KB`);
  })
  .catch(error => {
    console.error('✗ Error creating PDF:', error.message);
    process.exit(1);
  });
