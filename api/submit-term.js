// Vercel serverless function
// Receives form submission and creates a GitHub Issue

const ALLOWED_ORIGINS = [
  'https://brettleehari.github.io',
  'http://localhost:5173',
  'http://localhost:3000',
];

function setCorsHeaders(res, origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', allowed);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  setCorsHeaders(res, origin);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    term,
    cultural_domain,
    what_americans_see,
    what_software_means,
    where_it_appears,
    what_non_americans_read,
    affects_all_non_americans,
    neutral_alternative,
    contributor_name,
    contributor_country,
    personal_story,
  } = req.body;

  // Validate required fields
  if (
    !term ||
    !cultural_domain ||
    !what_americans_see ||
    !what_software_means ||
    !what_non_americans_read ||
    !affects_all_non_americans
  ) {
    return res.status(400).json({
      error: 'Missing required fields: term, cultural_domain, what_americans_see, what_software_means, what_non_americans_read, affects_all_non_americans',
    });
  }

  // Format issue body
  const issueBody = `## New Term Submission

**Term:** ${term}
**Cultural Domain:** ${cultural_domain}
**What Americans See:** ${what_americans_see}
**What Software Means:** ${what_software_means}
**Where It Appears:** ${where_it_appears || 'Not specified'}
**What Non-Americans Read:** ${what_non_americans_read}
**Affects All Non-Americans:** ${affects_all_non_americans}
**Neutral Alternative:** ${neutral_alternative || 'Not specified'}

---
**Contributor:** ${contributor_name || 'Anonymous'}${contributor_country ? ` from ${contributor_country}` : ''}
**Personal Story:** ${personal_story || 'Not provided'}`;

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO || 'brettleehari/hidden-curriculum';

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/issues`,
      {
        method: 'POST',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `New Term: ${term}`,
          body: issueBody,
          labels: ['new-term', 'pending-review'],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API error:', errorData);
      return res.status(502).json({ error: 'Failed to create GitHub issue' });
    }

    const issue = await response.json();
    return res.status(201).json({
      success: true,
      issueUrl: issue.html_url,
      issueNumber: issue.number,
    });
  } catch (err) {
    console.error('Error creating issue:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
