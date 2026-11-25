# Hidden Curriculum - Project Specification

## What This Project Is

A community-driven dataset and web application documenting American cultural metaphors embedded in software engineering terminology. The research paper establishes the thesis. This codebase brings it to life as a living, growing dataset with a contributor pipeline that flows from a web form to GitHub to HuggingFace.

Paper title: "The Hidden Curriculum of Software Engineering: How American Cultural Metaphors Shape Global Technical Vocabulary and Why AI Is Making Them Invisible"

Author: Hari Prasad Sudharsan (github.com/brettleehari)

## Core Thesis (Guide All Development Decisions by This)

Software engineering vocabulary is saturated with American cultural metaphors. 80% of these terms create barriers for ALL non-American developers, including native English speakers from the UK, Australia, and South Africa. The remaining 20% compound further for non-English speakers. This is a cultural barrier, not a language barrier.

Two-layer model:
- Layer 1: Cultural barrier. Affects all non-Americans. A British developer does not know American football ("punt"). An Australian does not connect "grandfathered" to post-Civil War voting laws. 80% of documented terms.
- Layer 2: Linguistic barrier. Compounds on top for non-English speakers. An Indian developer from Chennai faces Layer 1 PLUS English language processing overhead. 100% of terms.

## Architecture Overview

```
[Contributor visits site]
       |
       v
[React frontend on GitHub Pages]
       |
       v (form submit)
[Serverless function on Vercel]
       |
       v (creates GitHub Issue via API)
[GitHub repo: brettleehari/hidden-curriculum]
       |
       v (maintainer reviews, approves, merges)
[GitHub Action triggers on merge to main]
       |
       v (pushes updated dataset)
[HuggingFace Dataset: brettleehari/hidden-curriculum]
```

## Repository Structure

```
hidden-curriculum/
├── CLAUDE.md                    # This file
├── README.md                    # Project overview, schema, domains, citation
├── LICENSE                      # CC BY 4.0 for data, MIT for code
├── data/
│   ├── hidden-curriculum.csv    # Master dataset (source of truth)
│   └── schema.json              # JSON Schema for validation
├── site/                        # React frontend (deployed to GitHub Pages)
│   ├── package.json
│   ├── vite.config.js           # or next.config.js if using Next
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.jsx              # Main app
│       ├── components/
│       │   ├── Hero.jsx         # Title, subtitle, stats
│       │   ├── TermsTable.jsx   # Searchable, filterable table
│       │   ├── ContributeForm.jsx  # 8-field submission form
│       │   ├── RepoStats.jsx    # Live GitHub repo stats and activity
│       │   ├── About.jsx        # Author bio, citation, links
│       │   └── Footer.jsx
│       ├── data/
│       │   └── terms.json       # Pre-loaded terms (generated from CSV)
│       └── utils/
│           └── submitTerm.js    # API call to serverless function
├── api/                         # Serverless functions (Vercel)
│   └── submit-term.js           # Receives form, creates GitHub Issue
├── scripts/
│   ├── csv-to-json.js           # Converts CSV to JSON for frontend
│   ├── issue-to-csv.js          # Parses approved issues, appends to CSV
│   └── push-to-huggingface.js   # Syncs CSV to HuggingFace dataset
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── new-term.yml         # Structured issue template (fallback)
│   └── workflows/
│       ├── process-approved.yml # On issue close with "approved" label: parse and append to CSV
│       ├── sync-huggingface.yml # On push to data/: sync to HuggingFace
│       └── deploy-site.yml      # On push to site/: build and deploy to GitHub Pages
└── huggingface/
    └── README.md                # HuggingFace dataset card
```

## Dataset Schema

### Paper table (8 columns, human-readable)

| Column | Description |
|--------|-------------|
| Term | The software word (e.g., "playbook") |
| Cultural Origin | Domain + specific American source (e.g., "American Sports: Football") |
| What Americans See | Cultural meaning absorbed through daily life |
| What Software Means | Technical definition |
| Where It Appears | Tools, frameworks, platforms (e.g., "Ansible, Kubernetes") |
| What Non-Americans Read | First literal interpretation without American context |
| Affects All Non-Americans? | Yes = cultural barrier (Layer 1). No = linguistic only (Layer 2) |
| Neutral Alternative | Culturally-neutral replacement if one exists |

### Full dataset (12 columns, machine-readable)

All 8 above plus:

| Column | Description |
|--------|-------------|
| term_id | Unique identifier. Format: DOMAIN-NNN (e.g., SPORTS-003) |
| domain_id | Numeric code 1 through 12 (see domains below) |
| contributor | Name of person who documented this term |
| source_citation | Research source or "Original research" or "Community contribution" |

### Domain IDs

```
1  = American Sports (baseball, football, basketball, track, rugby)
2  = Silicon Valley Business Jargon
3  = Military and Cold War Vocabulary
4  = American Food Culture
5  = American Car Culture and Infrastructure
6  = American Household and Domestic
7  = Wild West and Frontier Mythology
8  = American Pop Culture and Entertainment
9  = American Industrial Trades
10 = Cybersecurity (Espionage and Hunting)
11 = American Hacker Subculture
12 = American Slang and Idioms
```

### JSON Schema for Validation

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["term", "cultural_domain", "what_americans_see", "what_software_means", "where_it_appears", "what_non_americans_read", "affects_all_non_americans"],
  "properties": {
    "term_id": { "type": "string", "pattern": "^[A-Z]+-[0-9]{3}$" },
    "term": { "type": "string", "minLength": 1 },
    "cultural_domain": { "type": "string" },
    "what_americans_see": { "type": "string", "minLength": 10 },
    "what_software_means": { "type": "string", "minLength": 10 },
    "where_it_appears": { "type": "string" },
    "what_non_americans_read": { "type": "string", "minLength": 10 },
    "affects_all_non_americans": { "type": "string", "enum": ["yes", "no"] },
    "neutral_alternative": { "type": "string" },
    "domain_id": { "type": "integer", "minimum": 1, "maximum": 12 },
    "contributor": { "type": "string" },
    "source_citation": { "type": "string" }
  }
}
```

## Component 1: React Frontend (site/)

### Tech Stack
- React 18+ with Vite
- Tailwind CSS (utility classes)
- Deployed to GitHub Pages via GitHub Actions

### Pages/Sections (single-page app, no routing needed)

**Hero Section**
- Title: "The Hidden Curriculum of Software Engineering"
- Subtitle: "290+ American cultural metaphors documented. 80% create barriers for ALL non-Americans, not only non-English speakers. Help us find more."
- Explanation paragraph about the two-layer model
- Links to arXiv paper, HuggingFace dataset, GitHub repo
- Stats banner: 290+ Terms, 12 Domains, 80% Affect All Non-Americans, 75% of Developers Are Non-American

**Browse Terms (TermsTable)**
- Load terms from data/terms.json (generated from CSV at build time)
- Search by term name (text input)
- Filter by domain (dropdown, 12 options + "All")
- Display 8-column table with:
  - Color-coded domain badges
  - Alternating row colors
  - Responsive layout (horizontal scroll on mobile, or card layout)
- Sort by term name or domain

**Repo Dashboard (RepoStats)**

This section shows live GitHub repo data so visitors see the project is active, open, and growing. Place it between the Browse Terms table and the Contribute Form.

Uses the GitHub public REST API (no auth needed for public repos, 60 requests/hour rate limit). Fetch on component mount, cache in React state. Show graceful fallback if API is unavailable.

API endpoints to call:
```
GET https://api.github.com/repos/brettleehari/hidden-curriculum
GET https://api.github.com/repos/brettleehari/hidden-curriculum/issues?labels=new-term&state=all&per_page=5
GET https://api.github.com/repos/brettleehari/hidden-curriculum/issues?labels=approved&state=closed&per_page=5
GET https://api.github.com/repos/brettleehari/hidden-curriculum/contributors
```

Display these sections:

1. **Repo Vitals** (top row of cards):
   - Stars count (from repo endpoint: stargazers_count)
   - Forks count (from repo endpoint: forks_count)
   - Open issues count (from repo endpoint: open_issues_count)
   - Total terms in dataset (from terms.json length at build time)
   - Contributors count (from contributors endpoint: array length)
   - Last updated date (from repo endpoint: pushed_at, formatted as "3 days ago" or similar)

2. **Pipeline Status** (visual flow diagram):
   Show 4 connected steps with status indicators:
   ```
   [Submit Term] --> [GitHub Issue Created] --> [Reviewed and Approved] --> [Live in Dataset + HuggingFace]
   ```
   Each step shows the count:
   - Pending review: open issues with "new-term" label
   - Approved: closed issues with "approved" label
   - Live terms: terms.json length

3. **Recent Activity Feed** (list of 5 most recent items):
   - Pull from both open and closed issues with "new-term" label
   - Each item shows:
     - Term name (parsed from issue title: "New Term: {name}")
     - Status badge: "Pending Review" (yellow), "Approved" (green), "Under Discussion" (blue)
     - Contributor name (from issue body or issue author login)
     - Country (from issue body if available)
     - Time ago (e.g., "2 hours ago", "3 days ago")
   - Clicking an item opens the GitHub issue in a new tab

4. **Top Contributors** (if more than 1 contributor):
   - Show avatar, username, and contribution count from contributors endpoint
   - Link to their GitHub profile
   - Show "Be the first community contributor" message if only the repo owner exists

5. **Domain Growth Chart** (simple bar chart):
   - Horizontal bar chart showing term count per domain
   - Calculated from terms.json at build time (not from API)
   - Color matches domain badge colors
   - Shows which domains have the most coverage and which need more contributions
   - Label each bar: "American Sports (5)", "Military (4)", etc.

Design notes:
- Use a subtle gray background section to visually separate from the terms table
- Cards use white background with slight shadow
- All numbers should animate counting up on first load (simple CSS animation or requestAnimationFrame)
- Show a skeleton loader while API calls are in flight
- If GitHub API returns 403 (rate limited), show cached/static fallback with a note: "Live stats update every hour. Showing cached data."
- The pipeline visualization should use connecting lines or arrows between steps

Implementation in utils/:
```
site/src/utils/
├── submitTerm.js       # POST to serverless function
└── githubApi.js        # Fetch repo stats, issues, contributors
```

githubApi.js should export:
```javascript
export async function fetchRepoStats(owner, repo) { ... }
export async function fetchRecentIssues(owner, repo, label, state, count) { ... }
export async function fetchContributors(owner, repo) { ... }
export function timeAgo(dateString) { ... }  // "2 hours ago", "3 days ago"
```

**Contribute Form (ContributeForm)**
- Fields:
  1. Term (text, required)
  2. Cultural Origin / Domain (dropdown with 12 domains + "Other", required)
  3. What Americans See (textarea, required)
  4. What Software Means (textarea, required)
  5. Where It Appears (text, optional)
  6. What Non-Americans Read (textarea, required)
  7. Affects All Non-Americans? (radio: Yes / No, required)
  8. Neutral Alternative (text, optional)
  9. Your Name (text, optional)
  10. Your Country (text, optional)
  11. Your Story (textarea, optional. Placeholder: "Share your personal experience with this term")
- Submit button: "Submit Your Term"
- On submit: POST to /api/submit-term
- On success: show green confirmation with submitted data
- On error: show red message with retry option

**About Section**
- Author bio: "I am Hari Prasad Sudharsan, a Chennai-born, Dallas-based AI and telecom professional with 20 years of experience. I moved to the United States and spent two years documenting every American cultural metaphor I encountered in software engineering. This project is the result."
- Citation block
- Links to paper, dataset, repo

**Footer**
- GitHub, HuggingFace, arXiv links
- License info: CC BY 4.0 for data, MIT for code
- "Built by an independent researcher. Open source. Contribute freely."

### Design System
- Primary color: Deep blue (#1e3a5f)
- Accent color: Warm amber (#f59e0b)
- Background: White with subtle gray (#f9fafb) alternating sections
- Font: System font stack (no external fonts needed)
- Domain badge colors (one per domain):
  1. Sports: blue-500
  2. Business: purple-500
  3. Military: red-600
  4. Food: orange-500
  5. Car: cyan-600
  6. Household: green-500
  7. Frontier: amber-700
  8. Pop Culture: pink-500
  9. Trades: stone-600
  10. Cybersecurity: rose-600
  11. Hacker: violet-500
  12. Slang: teal-500

## Component 2: Serverless API (api/)

### POST /api/submit-term

**Purpose:** Receive form submission from frontend, create a GitHub Issue in the repo.

**Tech:** Vercel serverless function (Node.js)

**Environment Variables (set in Vercel dashboard):**
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxx  (Personal access token with repo:write scope)
GITHUB_REPO=brettleehari/hidden-curriculum
```

**Logic:**
```
1. Receive POST body with form fields
2. Validate required fields (term, cultural_domain, what_americans_see, what_software_means, what_non_americans_read, affects_all_non_americans)
3. Format issue body as structured markdown:

   ## New Term Submission

   **Term:** {term}
   **Cultural Domain:** {domain}
   **What Americans See:** {what_americans_see}
   **What Software Means:** {what_software_means}
   **Where It Appears:** {where_it_appears}
   **What Non-Americans Read:** {what_non_americans_read}
   **Affects All Non-Americans:** {yes/no}
   **Neutral Alternative:** {neutral_alternative}

   ---
   **Contributor:** {name} from {country}
   **Personal Story:** {story}

4. POST to GitHub API: https://api.github.com/repos/{GITHUB_REPO}/issues
   - title: "New Term: {term}"
   - body: formatted markdown above
   - labels: ["new-term", "pending-review"]
5. Return { success: true, issueUrl: response.html_url }
```

**CORS:** Allow origin from the GitHub Pages domain (brettleehari.github.io)

**Rate limiting:** Limit to 10 submissions per IP per hour (use Vercel edge config or simple in-memory counter)

## Component 3: GitHub Actions (.github/workflows/)

### Workflow 1: process-approved.yml

**Trigger:** Issue closed with label "approved"

**Purpose:** Parse the approved issue body, generate a term_id, append a row to data/hidden-curriculum.csv, commit, and push.

```yaml
name: Process Approved Term
on:
  issues:
    types: [closed]

jobs:
  process:
    if: contains(github.event.issue.labels.*.name, 'approved')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node scripts/issue-to-csv.js "${{ github.event.issue.number }}"
      - run: |
          git config user.name "hidden-curriculum-bot"
          git config user.email "bot@hidden-curriculum.dev"
          git add data/hidden-curriculum.csv
          git commit -m "Add term from issue #${{ github.event.issue.number }}"
          git push
```

**scripts/issue-to-csv.js logic:**
```
1. Fetch issue body via GitHub API using issue number
2. Parse structured markdown fields using regex
3. Read existing CSV, find highest term_id for the domain
4. Generate next term_id (e.g., if last SPORTS was SPORTS-005, new one is SPORTS-006)
5. Map domain name to domain_id (1-12)
6. Append new row to CSV
7. Write updated CSV
```

### Workflow 2: sync-huggingface.yml

**Trigger:** Push to main that modifies data/hidden-curriculum.csv

**Purpose:** Push updated CSV to HuggingFace dataset repo.

**Environment Variables (GitHub Secrets):**
```
HF_TOKEN=hf_xxxxxxxxxxxx  (HuggingFace write token)
HF_REPO=brettleehari/hidden-curriculum
```

```yaml
name: Sync to HuggingFace
on:
  push:
    branches: [main]
    paths: ['data/hidden-curriculum.csv']

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Push to HuggingFace
        env:
          HF_TOKEN: ${{ secrets.HF_TOKEN }}
        run: |
          pip install huggingface_hub
          python3 -c "
          from huggingface_hub import HfApi
          api = HfApi(token='$HF_TOKEN')
          api.upload_file(
              path_or_fileobj='data/hidden-curriculum.csv',
              path_in_repo='hidden-curriculum.csv',
              repo_id='brettleehari/hidden-curriculum',
              repo_type='dataset',
              commit_message='Update dataset from GitHub'
          )
          print('Synced to HuggingFace')
          "
```

### Workflow 3: deploy-site.yml

**Trigger:** Push to main that modifies site/ or data/

**Purpose:** Build React app, convert CSV to JSON for frontend, deploy to GitHub Pages.

```yaml
name: Deploy Site
on:
  push:
    branches: [main]
    paths: ['site/**', 'data/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node scripts/csv-to-json.js
      - run: cd site && npm install && npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site/dist
      - uses: actions/deploy-pages@v4
```

**scripts/csv-to-json.js logic:**
```
1. Read data/hidden-curriculum.csv
2. Parse to JSON array
3. Write to site/src/data/terms.json
```

## Component 4: GitHub Issue Template (.github/ISSUE_TEMPLATE/new-term.yml)

Fallback for contributors who prefer GitHub directly over the website.

```yaml
name: Submit a New Term
description: Document an American cultural metaphor in software engineering
title: "New Term: "
labels: ["new-term", "pending-review"]
body:
  - type: input
    id: term
    attributes:
      label: Term
      description: The software engineering term
      placeholder: e.g., playbook
    validations:
      required: true
  - type: dropdown
    id: domain
    attributes:
      label: Cultural Domain
      options:
        - "American Sports"
        - "Silicon Valley Business"
        - "Military and Cold War"
        - "American Food Culture"
        - "American Car Culture"
        - "American Household"
        - "Wild West and Frontier"
        - "American Pop Culture"
        - "American Industrial Trades"
        - "Cybersecurity"
        - "American Hacker Subculture"
        - "American Slang"
        - "Other"
    validations:
      required: true
  - type: textarea
    id: what_americans_see
    attributes:
      label: What Americans See
      description: What does this word mean in American daily life?
      placeholder: Describe the cultural reference Americans recognize
    validations:
      required: true
  - type: textarea
    id: what_software_means
    attributes:
      label: What Software Means
      description: The technical definition in software engineering
    validations:
      required: true
  - type: input
    id: where_it_appears
    attributes:
      label: Where It Appears
      description: Tools, frameworks, platforms
      placeholder: e.g., Ansible, Git, AWS
  - type: textarea
    id: what_non_americans_read
    attributes:
      label: What Non-Americans Read
      description: First literal interpretation without American context
    validations:
      required: true
  - type: dropdown
    id: affects_all
    attributes:
      label: Affects All Non-Americans?
      description: Does this confuse even native English speakers outside the US?
      options:
        - "Yes"
        - "No"
    validations:
      required: true
  - type: input
    id: neutral_alternative
    attributes:
      label: Neutral Alternative
      description: A culturally-neutral replacement, if one exists
  - type: input
    id: contributor_name
    attributes:
      label: Your Name (optional)
  - type: input
    id: contributor_country
    attributes:
      label: Your Country (optional)
  - type: textarea
    id: personal_story
    attributes:
      label: Your Story (optional)
      description: Share your personal experience with this term
```

## Component 5: HuggingFace Dataset

### Setup (one-time)
1. Create dataset repo at huggingface.co/datasets/brettleehari/hidden-curriculum
2. Upload huggingface/README.md as the dataset card
3. Upload initial data/hidden-curriculum.csv
4. Generate HF write token, add as GitHub secret HF_TOKEN

### Dataset Card
Located at huggingface/README.md. Contains YAML frontmatter with:
- language: en
- license: cc-by-4.0
- task_categories: text-classification
- tags: cultural-bias, software-engineering, metaphor, nlp, linguistics
- size_categories: n<1K (update as dataset grows)

## Writing Style Rules (Apply to ALL User-Facing Text)

Follow Hari's voice throughout the site, README, and all documentation.

SHOULD:
- Use clear, simple language
- Be spartan and informative
- Use short, impactful sentences
- Use active voice
- Focus on practical, actionable content
- Use "you" and "your" to address the reader

AVOID:
- Em dashes anywhere. Use commas, periods, or colons.
- Constructions like "not just this, but also this"
- Metaphors and cliches
- Generalizations
- Setup language: in conclusion, in closing, to summarize
- Hashtags, asterisks, markdown formatting in social posts

NEVER USE THESE WORDS:
can, may, just, that, very, really, literally, actually, certainly, probably, basically, could, maybe, delve, embark, enlightening, esteemed, shed light, craft, crafting, imagine, realm, game-changer, unlock, discover, skyrocket, abyss, not alone, in a world where, revolutionize, disruptive, utilize, utilizing, dive deep, tapestry, illuminate, unveil, pivotal, intricate, elucidate, hence, furthermore, however, harness, exciting, groundbreaking, cutting-edge, remarkable, remains to be seen, glimpse into, navigating, landscape, stark, testament, moreover, boost, skyrocketing, opened up, powerful, inquiries, ever-evolving

## Development Sequence

Build in this order:

### Phase 1: Local Setup
1. Initialize repo: `git init hidden-curriculum`
2. Create directory structure per the tree above
3. Copy data/hidden-curriculum.csv (30 seed terms, provided separately)
4. Copy huggingface/README.md (dataset card, provided separately)
5. Write README.md

### Phase 2: React Frontend
1. Initialize Vite + React + Tailwind in site/
2. Build components: Hero, TermsTable, ContributeForm, About, Footer
3. Write scripts/csv-to-json.js to generate site/src/data/terms.json from CSV
4. Test locally: the form submit should show success state (no API yet)

### Phase 3: Serverless API
1. Set up Vercel project linked to the repo
2. Write api/submit-term.js
3. Set environment variables: GITHUB_TOKEN, GITHUB_REPO
4. Test: form submission should create a GitHub Issue with correct labels and formatting
5. Add CORS config for GitHub Pages domain

### Phase 4: GitHub Actions
1. Write .github/workflows/deploy-site.yml (deploy on push)
2. Write .github/workflows/process-approved.yml (parse issue, append CSV)
3. Write scripts/issue-to-csv.js (issue parser)
4. Write .github/ISSUE_TEMPLATE/new-term.yml
5. Test full cycle: submit form, issue created, approve issue, CSV updated, site rebuilds

### Phase 5: HuggingFace Sync
1. Create HuggingFace dataset repo
2. Upload initial CSV and dataset card
3. Generate HF write token, add as GitHub secret
4. Write .github/workflows/sync-huggingface.yml
5. Write scripts/push-to-huggingface.js (if needed beyond the workflow)
6. Test: approve an issue, verify CSV updates, verify HuggingFace syncs

### Phase 6: Polish and Launch
1. Custom domain setup (if desired): hidden-curriculum.dev or similar
2. SEO: meta tags, Open Graph, Twitter card
3. Analytics: simple page view counter (no tracking)
4. Write CONTRIBUTING.md with guidelines for community
5. Push to GitHub, deploy, announce

## Key External Accounts and Tokens Needed

| Service | What | Where to Get |
|---------|------|-------------|
| GitHub | Personal access token with repo scope | github.com/settings/tokens |
| Vercel | Account + project linked to repo | vercel.com |
| HuggingFace | Write token for dataset uploads | huggingface.co/settings/tokens |

## Testing Checklist

Before launch, verify the full pipeline:

- [ ] Site loads on GitHub Pages
- [ ] Terms table displays all 30 seed terms
- [ ] Search filters terms by name
- [ ] Domain dropdown filters correctly
- [ ] Form validates required fields
- [ ] Form submission creates GitHub Issue with correct format
- [ ] Issue has "new-term" and "pending-review" labels
- [ ] Closing issue with "approved" label triggers workflow
- [ ] Workflow parses issue and appends to CSV correctly
- [ ] term_id auto-increments correctly per domain
- [ ] CSV push triggers HuggingFace sync
- [ ] HuggingFace dataset reflects latest CSV
- [ ] Site rebuilds with new term visible in table
- [ ] Full cycle: submit, approve, CSV updated, HuggingFace updated, site updated
- [ ] Repo Dashboard: vitals cards show correct counts from terms.json
- [ ] Repo Dashboard: pipeline visualization renders 4 steps with arrows
- [ ] Repo Dashboard: domain coverage chart shows bars for all populated domains
- [ ] Repo Dashboard: recent submissions feed shows community submissions
- [ ] Repo Dashboard: GitHub link opens repo in new tab
- [ ] Repo Dashboard: graceful fallback if GitHub API is rate-limited (show static data)

## Reference Files (Provided Separately)

These files are already created and available in the publish/final/ directory:

- hidden-curriculum-dataset.csv (30 seed terms, 12 columns)
- hidden-curriculum-site.jsx (React component reference, convert to Vite project)
- hidden-curriculum-README.md (GitHub README)
- hidden-curriculum-dataset-card.md (HuggingFace dataset card)
- The_Hidden_Curriculum_of_Software_Engineering_arXiv.pdf (research paper)

## Citation

```
Sudharsan, H. P. (2026). The Hidden Curriculum of Software Engineering:
How American Cultural Metaphors Shape Global Technical Vocabulary
and Why AI Is Making Them Invisible. arXiv preprint.
```
