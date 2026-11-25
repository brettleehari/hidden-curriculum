// Turns a GitHub issue into a dataset record and judges it.
// Two body formats exist and both are supported:
//   1. The API format written by api/submit-term.js:  **Term:** playbook
//   2. The issue form format written by GitHub:       ### Term\n\nplaybook

const {
  loadSchema, checkRecord, findDuplicate, nextTermId, domainFromText,
} = require('./dataset');

// field key -> labels used across the two formats
const FIELD_LABELS = {
  term: ['Term'],
  cultural_domain: ['Cultural Domain'],
  what_americans_see: ['What Americans See'],
  what_software_means: ['What Software Means'],
  where_it_appears: ['Where It Appears'],
  what_non_americans_read: ['What Non-Americans Read'],
  affects_all_non_americans: ['Affects All Non-Americans?', 'Affects All Non-Americans'],
  neutral_alternative: ['Neutral Alternative'],
  contributor: ['Contributor', 'Your Name (optional)', 'Your Name'],
  country: ['Your Country (optional)', 'Your Country'],
  story: ['Personal Story', 'Your Story (optional)', 'Your Story'],
};

const EMPTY = /^(_no response_|none|n\/a|-)?$/i;

function clean(value) {
  const v = String(value || '').replace(/[\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim();
  return EMPTY.test(v) ? '' : v;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseIssueBody(body) {
  const text = String(body || '').replace(/\r\n/g, '\n');
  const fields = {};

  // Issue form format: split on "### Heading".
  const sections = {};
  const parts = text.split(/^###\s+/m).slice(1);
  for (const part of parts) {
    const nl = part.indexOf('\n');
    const heading = (nl === -1 ? part : part.slice(0, nl)).trim().toLowerCase();
    sections[heading] = nl === -1 ? '' : part.slice(nl + 1);
  }

  for (const [key, labels] of Object.entries(FIELD_LABELS)) {
    let value = '';
    for (const label of labels) {
      if (sections[label.toLowerCase()] !== undefined) {
        value = clean(sections[label.toLowerCase()]);
        break;
      }
      const m = text.match(new RegExp(`^\\*\\*${escapeRe(label)}:?\\*\\*:?[ \\t]*(.*)$`, 'mi'));
      if (m) { value = clean(m[1]); break; }
    }
    fields[key] = value;
  }

  // API format writes "Name from Country" on one line.
  const from = fields.contributor.match(/^(.*?)\s+from\s+(.+)$/i);
  if (from) {
    fields.contributor = clean(from[1]);
    if (!fields.country) fields.country = clean(from[2]);
  }
  if (/^anonymous$/i.test(fields.contributor)) fields.contributor = '';

  const a = fields.affects_all_non_americans.toLowerCase();
  fields.affects_all_non_americans = a.startsWith('yes') ? 'yes' : a.startsWith('no') ? 'no' : a;
  return fields;
}

// Judges a submission against the schema and the current dataset.
// status: 'ready' | 'needs-changes' | 'duplicate'
function evaluateSubmission(fields, records, { login = '' } = {}) {
  const schema = loadSchema();
  const record = {
    term_id: '',
    term: fields.term,
    cultural_domain: fields.cultural_domain,
    what_americans_see: fields.what_americans_see,
    what_software_means: fields.what_software_means,
    where_it_appears: fields.where_it_appears,
    what_non_americans_read: fields.what_non_americans_read,
    affects_all_non_americans: fields.affects_all_non_americans,
    neutral_alternative: fields.neutral_alternative,
    domain_id: '',
    contributor: fields.contributor || login || 'Community contributor',
    source_citation: 'Community contribution',
  };

  const { errors, warnings } = checkRecord(record, schema, { requireId: false });
  const domain = domainFromText(record.cultural_domain);
  if (/^other\b/i.test(record.cultural_domain)) {
    errors.length = 0;
    const rest = checkRecord({ ...record, cultural_domain: 'American Slang' }, schema, { requireId: false });
    errors.push(...rest.errors, 'cultural_domain is "Other". A maintainer must assign one of the 12 domains before approval');
  }

  const duplicate = record.term ? findDuplicate(record.term, records) : null;
  if (duplicate) {
    return { status: 'duplicate', record, errors, warnings, duplicate };
  }
  if (errors.length) return { status: 'needs-changes', record, errors, warnings, duplicate: null };

  record.domain_id = String(domain.id);
  record.term_id = nextTermId(domain, records);
  return { status: 'ready', record, errors, warnings, duplicate: null };
}

function reportMarkdown(result) {
  const lines = ['<!-- hidden-curriculum-triage -->', '### Automated review'];
  if (result.status === 'ready') {
    lines.push('', 'All required checks pass. This submission is ready for a maintainer to review.');
    lines.push('', `Proposed ID: \`${result.record.term_id}\``);
  } else if (result.status === 'duplicate') {
    lines.push('', `The dataset already holds this term as \`${result.duplicate.term_id}\` (${result.duplicate.term}).`);
    lines.push('', 'If your entry adds a different cultural origin or a correction, say so in a comment. A maintainer will decide.');
  } else {
    lines.push('', 'This submission needs changes before review. Edit the issue and the checks run again.');
  }
  if (result.errors.length) {
    lines.push('', '**Must fix**', ...result.errors.map((e) => `- ${e}`));
  }
  if (result.warnings.length) {
    lines.push('', '**Worth adding**', ...result.warnings.map((w) => `- ${w}`));
  }
  lines.push('', 'Maintainer checklist before adding the `approved` label:');
  lines.push('- [ ] The term is a metaphor, not a literal description');
  lines.push('- [ ] The origin traces to a specific American cultural domain');
  lines.push('- [ ] The term is in active professional use');
  lines.push('- [ ] The Layer 1 answer (affects all non-Americans) is correct');
  return lines.join('\n');
}

module.exports = { parseIssueBody, evaluateSubmission, reportMarkdown };
