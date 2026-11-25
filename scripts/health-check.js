// Weekly drift check. Prints a markdown report. Exit code 1 on any failure.
const fs = require('fs');
const { CSV_PATH, checkDataset } = require('./lib/dataset');

const HF_CSV = process.env.HF_CSV_URL
  || 'https://huggingface.co/datasets/brettleehari/hidden-curriculum/resolve/main/hidden-curriculum.csv';
const SITE = process.env.SITE_URL || 'https://brettleehari.github.io/hidden-curriculum/';

async function main() {
  const problems = [];
  const { errors, stats } = checkDataset();
  errors.forEach((e) => problems.push(`Dataset: ${e}`));

  try {
    const res = await fetch(HF_CSV);
    if (!res.ok) problems.push(`HuggingFace mirror returned HTTP ${res.status}`);
    else if ((await res.text()).trim() !== fs.readFileSync(CSV_PATH, 'utf-8').trim()) {
      problems.push('HuggingFace mirror differs from data/hidden-curriculum.csv. Run the "Sync to HuggingFace" workflow.');
    }
  } catch (err) {
    problems.push(`HuggingFace mirror unreachable: ${err.message}`);
  }

  try {
    const res = await fetch(SITE);
    if (!res.ok) problems.push(`Site returned HTTP ${res.status}`);
  } catch (err) {
    problems.push(`Site unreachable: ${err.message}`);
  }

  console.log('### Dataset health check');
  console.log(`\nValidated terms: ${stats.total}. Layer 1: ${stats.layer1Pct}%.`);
  if (stats.emptyDomains.length) console.log(`\nDomains with no validated terms: ${stats.emptyDomains.join(', ')}.`);
  if (problems.length) {
    console.log('\n**Problems**');
    problems.forEach((p) => console.log(`- ${p}`));
    process.exit(1);
  }
  console.log('\nAll checks pass.');
}

main();
