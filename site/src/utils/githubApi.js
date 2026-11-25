const BASE_URL = 'https://api.github.com';

export async function fetchRepoStats(owner, repo) {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}`);
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function fetchRecentIssues(owner, repo, label, state, count) {
  const params = new URLSearchParams({
    labels: label,
    state: state,
    per_page: String(count),
    sort: 'created',
    direction: 'desc',
  });
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/issues?${params}`);
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function fetchContributors(owner, repo) {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/contributors`);
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'moments ago';
}
