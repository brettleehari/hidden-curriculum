---
language:
- en
license: cc-by-4.0
task_categories:
- text-classification
tags:
- cultural-bias
- software-engineering
- metaphor
- nlp
- linguistics
- american-culture
- terminology
size_categories:
- n<1K
pretty_name: Hidden Curriculum
configs:
- config_name: default
  data_files:
  - split: train
    path: hidden-curriculum.csv
- config_name: candidates
  data_files:
  - split: train
    path: candidates.csv
---

# Hidden Curriculum Dataset

American cultural metaphors embedded in software engineering terminology.

## Dataset Summary

Each entry maps a software term to its American cultural origin, its technical definition, the tools where it appears, and how a developer raised outside the United States reads it on first encounter.

The core field is `affects_all_non_americans`. A "yes" marks a cultural barrier (Layer 1): the term is opaque to every non-American, including native English speakers from the UK, Australia, and South Africa. A "no" marks a linguistic barrier only (Layer 2).

## Current State

This block is generated from the master CSV on every sync.

<!-- stats:start -->
- Validated terms: 32
- Layer 1 terms (affect all non-Americans): 26 of 32 (81%)
- Candidate terms awaiting review: 266

| Domain | Validated terms |
|---|---|
| 1. American Sports | 6 |
| 2. Silicon Valley Business | 3 |
| 3. Military and Cold War | 4 |
| 4. American Food Culture | 3 |
| 5. American Car Culture | 4 |
| 6. American Household | 4 |
| 7. Wild West and Frontier | 3 |
| 8. American Pop Culture | 1 |
| 9. American Industrial Trades | 1 |
| 10. Cybersecurity | 1 |
| 11. American Hacker Subculture | 2 |
| 12. American Slang | 0 |
<!-- stats:end -->

## Two Configs

- `default`: validated terms. Each one passed the schema check and a maintainer review. Use this config for research.
- `candidates`: the review backlog. Terms documented in the paper's Appendix A with a cultural source and a technical meaning, not yet reviewed against the inclusion criteria. Do not treat these as validated.

```python
from datasets import load_dataset

validated = load_dataset("brettleehari/hidden-curriculum", split="train")
backlog = load_dataset("brettleehari/hidden-curriculum", "candidates", split="train")
```

## Source of Truth

The GitHub repository holds the master file: `data/hidden-curriculum.csv` at github.com/brettleehari/hidden-curriculum. This HuggingFace dataset is a mirror. Every merge to the master file triggers a sync. Do not open pull requests here. Submit terms through the website or a GitHub issue.

## Review Line

1. A contributor submits a term through the website or the GitHub issue form.
2. An automated review checks required fields, minimum detail, domain, and duplicates. It labels the issue ready, needs changes, or duplicate.
3. A maintainer checks three inclusion criteria: the term is a metaphor, it traces to a specific American cultural domain, and it is in active professional use.
4. On approval the term gets an ID, lands in the master CSV, and the full dataset is validated again.
5. The website and this mirror rebuild from the master CSV.
6. A weekly health check compares this mirror against the master file and opens an issue on any drift.

## Fields (default config)

- term_id: Unique identifier (format: DOMAIN-NNN)
- term: The software term
- cultural_domain: One of 12 domains, with an optional subdomain after a colon
- what_americans_see: The cultural reference Americans recognize
- what_software_means: Technical definition
- where_it_appears: Tools, platforms, frameworks
- what_non_americans_read: First reading without American context
- affects_all_non_americans: yes (Layer 1, cultural) or no (Layer 2, linguistic only)
- neutral_alternative: Suggested culturally neutral replacement
- domain_id: Numeric domain code, 1 through 12
- contributor: Who documented the term
- source_citation: Research source, "Original research", or "Community contribution"

## Fields (candidates config)

- term, cultural_domain, american_origin, technical_meaning, domain_id

## Limitations

One researcher classified the seed terms. Inter-rater agreement is unmeasured. The Layer 1 share comes from a small sample chosen for domain spread. Some cultural origins are disputed etymologies. Read the paper's Limitations section before citing a number.

## Intended Uses

- Measuring whether language models disclose the cultural origin of technical terms
- CS education material for global audiences
- Terminology guidance for tool and framework designers
- Linguistics research on metaphor in technical language

Not recommended for enforcing terminology changes without community consensus.

## Citation

```
@dataset{sudharsan2026hidden,
  title={Hidden Curriculum: American Cultural Metaphors in Software Terminology},
  author={Sudharsan, Hari Prasad},
  year={2026},
  url={https://huggingface.co/datasets/brettleehari/hidden-curriculum}
}
```

## License

CC BY 4.0. Share, adapt, and build on it with attribution.

## Contact

Hari Prasad Sudharsan, Independent Researcher. GitHub: github.com/brettleehari
