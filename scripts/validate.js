// Health gate for the dataset. Every workflow runs this before it builds,
// publishes, or commits. Exit code 1 means the data is not fit to ship.
//
// Usage: node scripts/validate.js [--strict] [--json]
//   --strict  treat warnings as errors
//   --json    print the report as JSON

const fs = require('fs');
const {
  CANDIDATES_PATH, CANDIDATE_COLUMNS, checkDataset, readTable, termKeys, domainFromText,
} = require('./lib/dataset');

const strict = process.argv.includes('--strict');
const asJson = process.argv.includes('--json');

const report = checkDataset();

// The candidate backlog gets a lighter check: shape, domain, duplicates.
const candidates = { total: 0, alreadyValidated: [] };
if (fs.existsSync(CANDIDATES_PATH)) {
  const { header, records } = readTable(CANDIDATES_PATH);
  candidates.total = records.length;
  if (header.join(',') !== CANDIDATE_COLUMNS.join(',')) {
    report.errors.push(`candidates.csv header mismatch. Expected: ${CANDIDATE_COLUMNS.join(',')}`);
  }
  const validated = new Set(report.records.flatMap((r) => termKeys(r.term)));
  const seen = new Map();
  for (const rec of records) {
    const where = `candidates.csv line ${rec._line} (${rec.term || '?'})`;
    if (!rec.term) report.errors.push(`${where}: term is empty`);
    const domain = domainFromText(rec.cultural_domain);
    if (!domain) report.errors.push(`${where}: cultural_domain "${rec.cultural_domain}" is not one of the 12 domains`);
    else if (Number(rec.domain_id) !== domain.id) report.errors.push(`${where}: domain_id does not match cultural_domain`);
    const key = `${termKeys(rec.term).join('/')}|${rec.domain_id}`;
    if (seen.has(key)) report.errors.push(`${where}: duplicates line ${seen.get(key)}`);
    seen.set(key, rec._line);
    if (termKeys(rec.term).some((k) => validated.has(k))) candidates.alreadyValidated.push(rec.term);
  }
}

const failed = report.errors.length > 0 || (strict && report.warnings.length > 0);

if (asJson) {
  console.log(JSON.stringify({
    ok: !failed, errors: report.errors, warnings: report.warnings, stats: report.stats, candidates,
  }, null, 2));
} else {
  const { stats } = report;
  console.log(`Validated terms: ${stats.total}`);
  console.log(`Layer 1 (affects all non-Americans): ${stats.layer1} of ${stats.total} (${stats.layer1Pct}%)`);
  console.log(`Candidate backlog: ${candidates.total} (${candidates.alreadyValidated.length} already validated)`);
  console.log('Terms per domain:');
  for (const d of stats.byDomain) console.log(`  ${String(d.id).padStart(2)}  ${d.name.padEnd(28)} ${d.count}`);
  if (stats.emptyDomains.length) console.log(`Domains with no validated terms: ${stats.emptyDomains.join(', ')}`);
  if (report.warnings.length) {
    console.log(`\n${report.warnings.length} warning(s):`);
    report.warnings.forEach((w) => console.log(`  warning: ${w}`));
  }
  if (report.errors.length) {
    console.log(`\n${report.errors.length} error(s):`);
    report.errors.forEach((e) => console.log(`  error: ${e}`));
  }
  console.log(failed ? '\nFAILED. Fix the errors above.' : '\nOK. Dataset is healthy.');
}

process.exit(failed ? 1 : 0);
