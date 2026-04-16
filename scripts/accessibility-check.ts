import { JSDOM } from 'jsdom';
import axe from 'axe-core';

export async function runAccessibilityAudit(html: string) {
  const dom = new JSDOM(html, {
    url: 'http://localhost:3000',
    runScripts: 'dangerously',
  });
  
  const { window } = dom;
  const { document } = window;
  
  window.axe = axe;
  
  const results = await axe.run(document);
  
  return {
    violations: results.violations.length,
    passes: results.passes.length,
    incomplete: results.incomplete.length,
    violationsDetails: results.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.length,
    })),
    score: calculateScore(results.violations),
  };
}

function calculateScore(violations: any[]) {
  const critical = violations.filter(v => v.impact === 'critical').length;
  const serious = violations.filter(v => v.impact === 'serious').length;
  const moderate = violations.filter(v => v.impact === 'moderate').length;
  
  if (critical > 0) return 0;
  if (serious > 0) return 50;
  if (moderate > 0) return 75;
  return 100;
}

export function createAxeReport(violations: any[]) {
  if (violations.length === 0) {
    return '✅ Acessibilidade: Nenhuma violação encontrada';
  }
  
  const grouped = {
    critical: violations.filter(v => v.impact === 'critical'),
    serious: violations.filter(v => v.impact === 'serious'),
    moderate: violations.filter(v => v.impact === 'moderate'),
    minor: violations.filter(v => v.impact === 'minor'),
  };
  
  let report = '# 🚨 Relatório de Acessibilidade\n\n';
  
  if (grouped.critical.length > 0) {
    report += '## 🔴 Critical\n';
    grouped.critical.forEach(v => {
      report += `- ${v.id}: ${v.description} (${v.nodes.length} nós)\n`;
    });
    report += '\n';
  }
  
  if (grouped.serious.length > 0) {
    report += '## 🟠 Serious\n';
    grouped.serious.forEach(v => {
      report += `- ${v.id}: ${v.description}\n`;
    });
    report += '\n';
  }
  
  report += `---\n`;
  report += `**Total:** ${violations.length} violações\n`;
  
  return report;
}

if (require.main === module) {
  const fs = require('fs');
  const html = fs.readFileSync('./build/index.html', 'utf-8');
  
  runAccessibilityAudit(html).then(results => {
    console.log(createReport(results.violationsDetails));
    process.exit(results.violations > 0 ? 1 : 0);
  });
}