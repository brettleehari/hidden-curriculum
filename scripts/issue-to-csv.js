// Review gate for one submission.
//
//   node scripts/issue-to-csv.js --check   reads the issue, prints a review
//                                          report, changes nothing
//   node scripts/issue-to-csv.js           reads the issue, appends it to the
//                                          master CSV when every check passes
//
// The issue comes from $GITHUB_EVENT_PATH (inside a workflow) or from
// --file <path-to-issue.json> (local testing). The JSON needs
// { "body": "...", "user": { "login": "..." }, "number": 1 }.
//
// Results go to $GITHUB_OUTPUT as status, term_id and term, and the
// markdown report goes to the file named by --report (default: stdout).

const fs = require('fs');
const {
  CSV_PATH, CANDIDATES_PATH, COLUMNS, CANDIDATE_COLUMNS, readTable, writeTable, termKeys, checkDataset,
} = require('./lib/dataset');
const { parseIssueBody, evaluateSubmission, reportMarkdown } = require('./lib/issue');

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const argValue = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : null);

function loadIssue() {
  const file = argValue('--file');
  if (file) return JSON.parse(fs.readFileSync(file, 'utf-8'));
  if (process.env.GITHUB_EVENT_PATH) {
    const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf-8'));
    if (event.issue) return event.issue;
  }
  console.error('No issue found. Pass --file issue.json or run inside an issues workflow.');
  process.exit(2);
}

function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) {
    // Strip line breaks so a value never writes a second output key.
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${String(value).replace(/[\r\n]+/g, ' ')}\n`);
  }
}

const issue = loadIssue();
const { records } = readTable(CSV_PATH);
const fields = parseIssueBody(issue.body);
const result = evaluateSubmission(fields, records, { login: issue.user && issue.user.login });

let report = reportMarkdown(result);

if (!checkOnly && result.status === 'ready') {
  const clean = Object.fromEntries(COLUMNS.map((c) => [c, result.record[c]]));
  writeTable(CSV_PATH, COLUMNS, [...records.map((r) => Object.fromEntries(COLUMNS.map((c) => [c, r[c]]))), clean]);

  // A promoted term leaves the candidate backlog.
  if (fs.existsSync(CANDIDATES_PATH)) {
    const keys = termKeys(clean.term);
    const cands = readTable(CANDIDATES_PATH).records;
    const kept = cands.filter((c) => !termKeys(c.term).some((k) => keys.includes(k)));
    if (kept.length !== cands.length) writeTable(CANDIDATES_PATH, CANDIDATE_COLUMNS, kept);
  }

  // The whole dataset must still be healthy after the append.
  const health = checkDataset();
  if (health.errors.length) {
    console.error('Dataset failed validation after the append:');
    health.errors.forEach((e) => console.error(`  ${e}`));
    process.exit(1);
  }
  report = `Added \`${clean.term_id}\` (${clean.term}) to the dataset. The site and the HuggingFace mirror update in a few minutes.`;
  console.error(`Added "${clean.term}" as ${clean.term_id}`);
}

setOutput('status', result.status);
setOutput('term_id', result.record.term_id);
const reportFile = argValue('--report');
if (reportFile) fs.writeFileSync(reportFile, report + '\n');
else console.log(report);

// In write mode a submission failing the gate is a hard stop.
if (!checkOnly && result.status !== 'ready') process.exit(1);
