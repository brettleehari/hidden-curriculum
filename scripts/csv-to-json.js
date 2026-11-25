// Derives every downstream artifact from the master CSV:
//   site/src/data/terms.json   the table the site renders
//   site/src/data/stats.json   the numbers the site shows
//   huggingface/README.md      the stats block in the dataset card
// Nothing downstream is edited by hand. Change the CSV, then run this.

const fs = require('fs');
const path = require('path');
const {
  ROOT, CSV_PATH, CANDIDATES_PATH, COLUMNS, readTable, datasetStats,
} = require('./lib/dataset');

const outDir = path.join(ROOT, 'site', 'src', 'data');
fs.mkdirSync(outDir, { recursive: true });

const { records } = readTable(CSV_PATH);
const terms = records.map((r) => {
  const t = Object.fromEntries(COLUMNS.map((c) => [c, r[c]]));
  t.domain_id = parseInt(t.domain_id, 10);
  return t;
});
fs.writeFileSync(path.join(outDir, 'terms.json'), JSON.stringify(terms, null, 2) + '\n');

const candidates = fs.existsSync(CANDIDATES_PATH) ? readTable(CANDIDATES_PATH).records : [];
const stats = datasetStats(records);
const summary = {
  validated: stats.total,
  candidates: candidates.length,
  candidateTerms: new Set(candidates.map((c) => c.term.toLowerCase())).size,
  layer1: stats.layer1,
  layer1Pct: stats.layer1Pct,
  domains: stats.byDomain,
};
fs.writeFileSync(path.join(outDir, 'stats.json'), JSON.stringify(summary, null, 2) + '\n');

// Dataset card: replace the block between the two markers.
const cardPath = path.join(ROOT, 'huggingface', 'README.md');
const card = fs.readFileSync(cardPath, 'utf-8');
const block = [
  '<!-- stats:start -->',
  `- Validated terms: ${summary.validated}`,
  `- Layer 1 terms (affect all non-Americans): ${summary.layer1} of ${summary.validated} (${summary.layer1Pct}%)`,
  `- Candidate terms awaiting review: ${summary.candidateTerms}`,
  '',
  '| Domain | Validated terms |',
  '|---|---|',
  ...stats.byDomain.map((d) => `| ${d.id}. ${d.name} | ${d.count} |`),
  '<!-- stats:end -->',
].join('\n');
const next = card.replace(/<!-- stats:start -->[\s\S]*?<!-- stats:end -->/, block);
if (next === card && !card.includes(block)) {
  console.error('huggingface/README.md has no stats markers.');
  process.exit(1);
}
fs.writeFileSync(cardPath, next);

console.log(`Derived ${terms.length} validated terms and ${summary.candidates} candidate entries from the master CSV.`);
