// Shared dataset logic. Every script and workflow reads and checks the
// master CSV through this file, so the rules live in one place.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CSV_PATH = path.join(ROOT, 'data', 'hidden-curriculum.csv');
const CANDIDATES_PATH = path.join(ROOT, 'data', 'candidates.csv');
const SCHEMA_PATH = path.join(ROOT, 'data', 'schema.json');

const COLUMNS = [
  'term_id', 'term', 'cultural_domain', 'what_americans_see',
  'what_software_means', 'where_it_appears', 'what_non_americans_read',
  'affects_all_non_americans', 'neutral_alternative', 'domain_id',
  'contributor', 'source_citation',
];

const CANDIDATE_COLUMNS = ['term', 'cultural_domain', 'american_origin', 'technical_meaning', 'domain_id'];

// The 12 canonical domains. `match` lists the lowercase prefixes a
// cultural_domain value is allowed to start with.
const DOMAINS = [
  { id: 1, prefix: 'SPORTS', name: 'American Sports', match: ['american sports'] },
  { id: 2, prefix: 'BIZ', name: 'Silicon Valley Business', match: ['silicon valley business'] },
  { id: 3, prefix: 'MIL', name: 'Military and Cold War', match: ['military'] },
  { id: 4, prefix: 'FOOD', name: 'American Food Culture', match: ['american food culture'] },
  { id: 5, prefix: 'CAR', name: 'American Car Culture', match: ['american car culture'] },
  { id: 6, prefix: 'HOUSE', name: 'American Household', match: ['american household'] },
  { id: 7, prefix: 'FRONTIER', name: 'Wild West and Frontier', match: ['wild west'] },
  { id: 8, prefix: 'POP', name: 'American Pop Culture', match: ['american pop culture'] },
  { id: 9, prefix: 'TRADE', name: 'American Industrial Trades', match: ['american industrial trades'] },
  { id: 10, prefix: 'CYBER', name: 'Cybersecurity', match: ['cybersecurity'] },
  { id: 11, prefix: 'HACK', name: 'American Hacker Subculture', match: ['american hacker subculture'] },
  { id: 12, prefix: 'SLANG', name: 'American Slang', match: ['american slang'] },
];

function domainFromText(text) {
  const t = String(text || '').trim().toLowerCase().replace(/&/g, 'and');
  return DOMAINS.find((d) => d.match.some((m) => t.startsWith(m))) || null;
}

// RFC 4180 parser. Handles quoted fields, escaped quotes, and newlines
// inside quotes.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((v) => v !== '')) rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length) {
    row.push(field);
    if (row.some((v) => v !== '')) rows.push(row);
  }
  return rows;
}

function escapeCSV(value) {
  const v = value === undefined || value === null ? '' : String(value);
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

function readTable(file) {
  const rows = parseCSV(fs.readFileSync(file, 'utf-8'));
  const header = rows[0].map((h) => h.trim());
  const records = rows.slice(1).map((cells, idx) => {
    const rec = { _line: idx + 2, _cells: cells.length };
    header.forEach((h, i) => { rec[h] = (cells[i] || '').trim(); });
    return rec;
  });
  return { header, records };
}

function writeTable(file, columns, records) {
  const lines = [columns.join(',')];
  for (const r of records) lines.push(columns.map((c) => escapeCSV(r[c])).join(','));
  fs.writeFileSync(file, lines.join('\n') + '\n');
}

// "lint/linter" and "Lint / Linter" are the same term. So are "sunset" and
// "sunset/sunsetting": each slash-separated part counts as a key.
function termKeys(term) {
  return String(term || '')
    .toLowerCase()
    .split('/')
    .map((p) => p.replace(/\(.*?\)/g, '').replace(/[^a-z0-9#! ]+/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function loadSchema() {
  return JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf-8'));
}

// Checks one record against data/schema.json plus the domain rules.
// Returns { errors, warnings }. `requireId` is false for a submission
// with no term_id yet.
function checkRecord(rec, schema, { requireId = true } = {}) {
  const errors = [];
  const warnings = [];
  const props = schema.properties;

  for (const key of schema.required) {
    if (key === 'where_it_appears') continue; // optional in the form; warned below
    if (!rec[key]) errors.push(`${key} is empty`);
  }
  for (const [key, rule] of Object.entries(props)) {
    const value = rec[key];
    if (!value) continue;
    if (rule.minLength && value.length < rule.minLength) {
      errors.push(`${key} is too short (${value.length} characters, minimum ${rule.minLength})`);
    }
    if (rule.enum && !rule.enum.includes(value)) {
      errors.push(`${key} is "${value}", expected one of: ${rule.enum.join(', ')}`);
    }
    if (rule.pattern && !new RegExp(rule.pattern).test(value)) {
      errors.push(`${key} "${value}" does not match ${rule.pattern}`);
    }
  }

  const domain = domainFromText(rec.cultural_domain);
  if (rec.cultural_domain && !domain) {
    errors.push(`cultural_domain "${rec.cultural_domain}" is not one of the 12 domains`);
  }
  if (requireId) {
    if (!rec.term_id) errors.push('term_id is empty');
    const id = Number(rec.domain_id);
    if (!Number.isInteger(id) || id < 1 || id > 12) {
      errors.push(`domain_id "${rec.domain_id}" is not an integer from 1 to 12`);
    } else if (domain && domain.id !== id) {
      errors.push(`domain_id ${id} does not match cultural_domain "${rec.cultural_domain}" (expected ${domain.id})`);
    }
    if (domain && rec.term_id && !rec.term_id.startsWith(`${domain.prefix}-`)) {
      errors.push(`term_id ${rec.term_id} does not carry the ${domain.prefix}- prefix of its domain`);
    }
    if (!rec.contributor) warnings.push('contributor is empty');
    if (!rec.source_citation) warnings.push('source_citation is empty');
  }
  if (!rec.where_it_appears) warnings.push('where_it_appears is empty');
  if (!rec.neutral_alternative) warnings.push('neutral_alternative is empty');
  for (const key of ['what_americans_see', 'what_software_means', 'what_non_americans_read']) {
    if (rec[key] && /\bhttps?:\/\//i.test(rec[key])) warnings.push(`${key} contains a URL`);
  }
  for (const key of COLUMNS) {
    const value = rec[key] || '';
    // A cell starting with = + or @ runs as a formula when someone opens the CSV in a spreadsheet.
    if (/^[=+@]/.test(value)) errors.push(`${key} starts with "${value[0]}", a spreadsheet formula character`);
    if (value.length > 600) errors.push(`${key} is too long (${value.length} characters, maximum 600)`);
    if (/[\u0000-\u001f]/.test(value)) errors.push(`${key} contains a line break or control character`);
  }
  return { errors, warnings, domain };
}

// Full health check of the master CSV.
function checkDataset() {
  const schema = loadSchema();
  const { header, records } = readTable(CSV_PATH);
  const errors = [];
  const warnings = [];

  if (header.join(',') !== COLUMNS.join(',')) {
    errors.push(`header mismatch. Expected: ${COLUMNS.join(',')}`);
  }
  const seenIds = new Map();
  const seenTerms = new Map();
  for (const rec of records) {
    const where = `line ${rec._line} (${rec.term_id || '?'} ${rec.term || '?'})`;
    if (rec._cells !== COLUMNS.length) {
      errors.push(`${where}: ${rec._cells} columns, expected ${COLUMNS.length}`);
    }
    const res = checkRecord(rec, schema);
    res.errors.forEach((e) => errors.push(`${where}: ${e}`));
    res.warnings.forEach((w) => warnings.push(`${where}: ${w}`));

    if (rec.term_id) {
      if (seenIds.has(rec.term_id)) errors.push(`${where}: term_id duplicates line ${seenIds.get(rec.term_id)}`);
      seenIds.set(rec.term_id, rec._line);
    }
    for (const key of termKeys(rec.term)) {
      if (seenTerms.has(key) && seenTerms.get(key) !== rec._line) {
        errors.push(`${where}: term "${key}" duplicates line ${seenTerms.get(key)}`);
      }
      seenTerms.set(key, rec._line);
    }
  }

  const stats = datasetStats(records);
  return { errors, warnings, records, stats };
}

function datasetStats(records) {
  const layer1 = records.filter((r) => r.affects_all_non_americans === 'yes').length;
  const byDomain = DOMAINS.map((d) => ({
    id: d.id,
    name: d.name,
    count: records.filter((r) => Number(r.domain_id) === d.id).length,
  }));
  return {
    total: records.length,
    layer1,
    layer1Pct: records.length ? Math.round((layer1 / records.length) * 100) : 0,
    byDomain,
    emptyDomains: byDomain.filter((d) => d.count === 0).map((d) => d.name),
  };
}

function findDuplicate(term, records) {
  const keys = termKeys(term);
  return records.find((r) => termKeys(r.term).some((k) => keys.includes(k))) || null;
}

function nextTermId(domain, records) {
  let max = 0;
  for (const r of records) {
    const m = (r.term_id || '').match(new RegExp(`^${domain.prefix}-(\\d{3})$`));
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return `${domain.prefix}-${String(max + 1).padStart(3, '0')}`;
}

module.exports = {
  ROOT, CSV_PATH, CANDIDATES_PATH, SCHEMA_PATH, COLUMNS, CANDIDATE_COLUMNS, DOMAINS,
  domainFromText, parseCSV, escapeCSV, readTable, writeTable, termKeys,
  loadSchema, checkRecord, checkDataset, datasetStats, findDuplicate, nextTermId,
};
