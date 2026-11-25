# The Hidden Curriculum of Software Engineering

American cultural metaphors embedded in software terminology, documented as an open dataset.

## The Problem

Software engineering terminology borrows from American sports, food culture, military history, car culture, household items, frontier mythology, and Silicon Valley slang. These terms feel transparent to Americans. They create barriers for every developer raised outside the United States.

This is a cultural problem before it is a linguistic one. A British developer does not know American football. An Australian does not connect "grandfathered" to post-Civil War voting laws.

The dataset uses a two-layer model:

- Layer 1, cultural. The term is opaque to all non-Americans, including native English speakers from the UK, Australia, and South Africa.
- Layer 2, linguistic. The barrier compounds for non-native English speakers.

The goal is not to judge. It is to make invisible cultural assumptions visible.

## Resources

- Site: https://brettleehari.github.io/hidden-curriculum/
- Dataset mirror: https://huggingface.co/datasets/brettleehari/hidden-curriculum
- Paper: [paper/The_Hidden_Curriculum.pdf](paper/The_Hidden_Curriculum.pdf)
- Author: Hari Prasad Sudharsan

## One Source of Truth

`data/hidden-curriculum.csv` is the master file. Everything else is derived from it and never edited by hand.

```
data/hidden-curriculum.csv        validated terms (the master file)
data/candidates.csv               review backlog from the paper's Appendix A
        |
        |  node scripts/csv-to-json.js
        v
site/src/data/terms.json          the table on the site
site/src/data/stats.json          every number on the site
huggingface/README.md             the stats block in the dataset card
        |
        v
GitHub Pages site                 deploy-site.yml
HuggingFace dataset               sync-huggingface.yml
```

Current counts live in the [dataset card](huggingface/README.md). They regenerate on every change.

## The Review Line

```
Contributor submits a term (site form or GitHub issue form)
        |
        v
Triage (triage-submission.yml)
  automated review: required fields, minimum detail, domain, duplicates
  label: ready-for-review, needs-changes, or duplicate
        |
        v
Maintainer review
  three inclusion criteria, then the "approved" label, then close the issue
        |
        v
Process (process-approved.yml)
  gate runs again, term gets an ID, row lands in the master CSV,
  full dataset is validated, candidate backlog shrinks
        |
        v
Site rebuilds, HuggingFace mirror syncs
        |
        v
Weekly health check (health-check.yml)
  master CSV valid, mirror identical to master, site serving
  opens an issue on any failure
```

A submission failing the gate at approval time is reopened with the reasons. Nothing reaches the master file without passing `scripts/validate.js`.

### Inclusion criteria

1. The term is a metaphor, not a literal description.
2. The origin traces to a specific American cultural domain.
3. The term is in active professional use.

### What the gate checks

- All required fields present, with minimum detail
- `affects_all_non_americans` is yes or no
- Domain is one of the 12, and `domain_id` and the `term_id` prefix agree with it
- No duplicate IDs, no duplicate terms (slash variants count: lint and lint/linter collide)
- No spreadsheet formula characters, control characters, or oversized fields

## Run It Locally

```bash
node scripts/validate.js                 # health gate
node --test scripts/test/pipeline.test.js
node scripts/csv-to-json.js              # regenerate derived files
cd site && npm ci && npm run dev         # site at localhost:5173
```

Review a submission offline:

```bash
node scripts/issue-to-csv.js --check --file issue.json
```

## Maintainer Guide

1. Open the issue. Read the automated review comment.
2. Check the three inclusion criteria and the Layer 1 answer.
3. Edit the issue body to fix small problems. The review reruns on every edit.
4. Add the `approved` label and close the issue.
5. The term appears on the site and on HuggingFace within a few minutes.

To reject, close the issue without the `approved` label.

One-time setup for a new repository: `scripts/setup-repo.sh` creates the labels. Add an `HF_TOKEN` secret with write access to the HuggingFace dataset. Set GitHub Pages to deploy from GitHub Actions.

## Dataset Schema

| Field | Description |
|-------|-------------|
| term_id | Unique identifier (e.g., SPORTS-003) |
| term | The software word |
| cultural_domain | One of 12 domains, with an optional subdomain after a colon |
| what_americans_see | The cultural meaning Americans absorb through daily life |
| what_software_means | Technical definition |
| where_it_appears | Tools, frameworks, platforms |
| what_non_americans_read | First literal reading without American context |
| affects_all_non_americans | yes = cultural barrier (Layer 1). no = linguistic only (Layer 2) |
| neutral_alternative | A culturally neutral replacement, if one exists |
| domain_id | Numeric domain code, 1 through 12 |
| contributor | Who documented the term |
| source_citation | Research source, "Original research", or "Community contribution" |

### Domains

| ID | Prefix | Domain |
|----|--------|--------|
| 1 | SPORTS | American Sports |
| 2 | BIZ | Silicon Valley Business |
| 3 | MIL | Military and Cold War |
| 4 | FOOD | American Food Culture |
| 5 | CAR | American Car Culture |
| 6 | HOUSE | American Household |
| 7 | FRONTIER | Wild West and Frontier |
| 8 | POP | American Pop Culture |
| 9 | TRADE | American Industrial Trades |
| 10 | CYBER | Cybersecurity |
| 11 | HACK | American Hacker Subculture |
| 12 | SLANG | American Slang |

## Benchmark

`benchmark/` holds the Cultural Disclosure index (CDi). It measures whether a language model names the American origin of a term or presents the term as universal. It reads the master CSV. See [benchmark/README.md](benchmark/README.md).

## Citation

```
Sudharsan, H. P. (2026). The Hidden Curriculum of Software Engineering:
How American Cultural Metaphors Shape Global Technical Vocabulary
and Why AI Is Making Them Invisible.
```

## License

CC BY 4.0 for data. MIT for code.

Built by an independent researcher. Open source. Contribute freely.
