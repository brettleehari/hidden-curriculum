// Run with: node --test scripts/test/
const test = require('node:test');
const assert = require('node:assert');
const {
  parseCSV, escapeCSV, termKeys, domainFromText, checkDataset,
} = require('../lib/dataset');
const { parseIssueBody, evaluateSubmission } = require('../lib/issue');

// A fixed fixture, so the tests do not change as the real dataset grows.
const records = [
  { term_id: 'SPORTS-001', term: 'punt', cultural_domain: 'American Sports: Football', domain_id: '1' },
  { term_id: 'BIZ-001', term: 'sunset/sunsetting', cultural_domain: 'Silicon Valley Business', domain_id: '2' },
  { term_id: 'HOUSE-003', term: 'lint/linter', cultural_domain: 'American Household', domain_id: '6' },
];

const API_BODY = `## New Term Submission

**Term:** two-pizza team
**Cultural Domain:** Silicon Valley Business
**What Americans See:** Pizza as the default office meeting food
**What Software Means:** A team small enough to feed with two pizzas
**Where It Appears:** Amazon, team design
**What Non-Americans Read:** A team who eats pizza together
**Affects All Non-Americans:** yes
**Neutral Alternative:** small team

---
**Contributor:** Asha from India
**Personal Story:** N/A`;

const FORM_BODY = `### Term

home run

### Cultural Domain

American Sports

### What Americans See

A baseball hit over the fence, the best outcome of an at-bat

### What Software Means

A major success on a project or release

### Where It Appears

_No response_

### What Non-Americans Read

Running to your house

### Affects All Non-Americans?

Yes

### Neutral Alternative

_No response_

### Your Name (optional)

_No response_

### Your Country (optional)

Kenya

### Your Story (optional)

_No response_`;

test('CSV parser handles quotes, commas and embedded newlines', () => {
  const rows = parseCSV('a,b\n"x, y","he said ""hi"""\n"line1\nline2",z\n');
  assert.deepStrictEqual(rows, [['a', 'b'], ['x, y', 'he said "hi"'], ['line1\nline2', 'z']]);
  assert.strictEqual(escapeCSV('x, "y"'), '"x, ""y"""');
});

test('term keys treat slash variants as the same term', () => {
  assert.deepStrictEqual(termKeys('Lint / Linter'), ['lint', 'linter']);
  assert.ok(termKeys('sunsetting').some((k) => termKeys('sunset/sunsetting').includes(k)));
});

test('domain lookup accepts subdomains and rejects unknown domains', () => {
  assert.strictEqual(domainFromText('American Sports: Football').id, 1);
  assert.strictEqual(domainFromText('Military & Cold War').id, 3);
  assert.strictEqual(domainFromText('Roads & Traffic'), null);
});

test('master dataset is healthy', () => {
  const { errors } = checkDataset();
  assert.deepStrictEqual(errors, []);
});

test('API-format issue parses and passes the gate', () => {
  const fields = parseIssueBody(API_BODY);
  assert.strictEqual(fields.term, 'two-pizza team');
  assert.strictEqual(fields.contributor, 'Asha');
  assert.strictEqual(fields.country, 'India');
  const result = evaluateSubmission(fields, records);
  assert.strictEqual(result.status, 'ready');
  assert.strictEqual(result.record.term_id, 'BIZ-002');
  assert.strictEqual(result.record.domain_id, '2');
});

test('issue-form-format issue parses and passes the gate', () => {
  const fields = parseIssueBody(FORM_BODY);
  assert.strictEqual(fields.term, 'home run');
  assert.strictEqual(fields.where_it_appears, '');
  assert.strictEqual(fields.affects_all_non_americans, 'yes');
  const result = evaluateSubmission(fields, records, { login: 'octocat' });
  assert.strictEqual(result.status, 'ready');
  assert.strictEqual(result.record.contributor, 'octocat');
});

test('duplicate terms are caught, including slash variants', () => {
  const fields = parseIssueBody(API_BODY.replace('two-pizza team', 'Linter'));
  const result = evaluateSubmission(fields, records);
  assert.strictEqual(result.status, 'duplicate');
});

test('thin, malformed and formula-injection submissions are rejected', () => {
  const thin = evaluateSubmission(parseIssueBody(API_BODY.replace('Pizza as the default office meeting food', 'pizza')), records);
  assert.strictEqual(thin.status, 'needs-changes');
  const other = evaluateSubmission(parseIssueBody(API_BODY.replace('Silicon Valley Business', 'Other')), records);
  assert.strictEqual(other.status, 'needs-changes');
  const inject = evaluateSubmission(parseIssueBody(API_BODY.replace('small team', '=HYPERLINK("http://x")')), records);
  assert.strictEqual(inject.status, 'needs-changes');
  const empty = evaluateSubmission(parseIssueBody('hello'), records);
  assert.strictEqual(empty.status, 'needs-changes');
});
