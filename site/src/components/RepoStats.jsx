import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import terms from '../data/terms.json';
import { fetchRepoStats, fetchRecentIssues, fetchContributors, timeAgo } from '../utils/githubApi';

const OWNER = 'brettleehari';
const REPO = 'hidden-curriculum';

const domainBarColors = {
  'Roads & Traffic': 'bg-blue-400',
  'American Sports: Track': 'bg-blue-500',
  'American Sports: Football': 'bg-blue-600',
  'American Food Culture': 'bg-orange-400',
  'Military: Cold War': 'bg-red-500',
  'Military: WWII': 'bg-red-600',
  'Wild West: Frontier': 'bg-amber-600',
  'American Household': 'bg-green-500',
  'Silicon Valley Business': 'bg-purple-500',
  'American Car Culture': 'bg-cyan-500',
  'Cybersecurity: Espionage': 'bg-rose-500',
  'American Hacker Subculture': 'bg-violet-500',
  'American Industrial Trades': 'bg-stone-500',
  'American Pop Culture': 'bg-pink-500',
  'American Slang': 'bg-teal-500',
};

function getDomainBarColor(domain) {
  return domainBarColors[domain] || 'bg-gray-400';
}

// Compute domain counts from terms.json (build-time data)
const domainCounts = {};
terms.forEach(t => {
  const d = t.cultural_domain || 'Unknown';
  domainCounts[d] = (domainCounts[d] || 0) + 1;
});
const sortedDomains = Object.entries(domainCounts).sort((a, b) => b[1] - a[1]);
const maxDomainCount = Math.max(...Object.values(domainCounts), 1);

export default function RepoStats() {
  const [repoData, setRepoData] = useState(null);
  const [recentIssues, setRecentIssues] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [repo, issues, contribs] = await Promise.all([
          fetchRepoStats(OWNER, REPO),
          fetchRecentIssues(OWNER, REPO, 'new-term', 'all', 5),
          fetchContributors(OWNER, REPO),
        ]);

        if (repo.message && repo.message.includes('rate limit')) {
          setRateLimited(true);
        } else {
          setRepoData(repo);
          setRecentIssues(Array.isArray(issues) ? issues : []);
          setContributors(Array.isArray(contribs) ? contribs : []);
        }
      } catch {
        setRateLimited(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Project Dashboard</h2>
        <p className="text-slate-600 mb-8">Live data from the GitHub repository. Every contribution flows through this pipeline.</p>

        {rateLimited && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            Live stats update every hour. Showing cached data.
          </div>
        )}

        {/* Repo Vitals */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {[
            { label: 'Terms in Dataset', value: terms.length },
            { label: 'Cultural Domains', value: 12 },
            { label: 'Stars', value: loading ? '...' : (repoData?.stargazers_count ?? 0) },
            { label: 'Forks', value: loading ? '...' : (repoData?.forks_count ?? 0) },
            { label: 'Open Issues', value: loading ? '...' : (repoData?.open_issues_count ?? 0) },
            { label: 'Contributors', value: loading ? '...' : (contributors.length || 1) },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-3xl font-bold text-blue-950">{stat.value}</div>
              <div className="text-xs text-slate-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pipeline Visualization */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-10">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Contribution Pipeline</h3>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-0">
            {[
              { step: '1', title: 'Submit Term', desc: 'Via website form or GitHub issue', color: 'bg-amber-500' },
              { step: '2', title: 'GitHub Issue Created', desc: 'Labeled "new-term" and "pending-review"', color: 'bg-blue-500' },
              { step: '3', title: 'Reviewed and Approved', desc: 'Maintainer reviews, approves, merges', color: 'bg-green-500' },
              { step: '4', title: 'Live in Dataset', desc: 'CSV updated, HuggingFace synced, site rebuilt', color: 'bg-purple-500', count: terms.length },
            ].map((item, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="text-center px-2 flex-1">
                  <div className={`${item.color} text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold`}>
                    {item.step}
                  </div>
                  <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                  {item.count !== undefined && (
                    <div className="text-xs font-bold text-blue-950 mt-1">{item.count} terms</div>
                  )}
                </div>
                {i < 3 && (
                  <div className="hidden md:block text-slate-300 text-2xl px-1">&rarr;</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Domain Coverage Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-10">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Domain Coverage</h3>
          <p className="text-sm text-slate-600 mb-4">Terms documented per cultural domain. Longer bars mean more coverage. Short bars signal where the community needs your help.</p>
          <div className="space-y-3">
            {sortedDomains.map(([domain, count], i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-48 text-sm text-slate-700 text-right truncate">{domain}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                  <div
                    className={`h-6 rounded-full ${getDomainBarColor(domain)} transition-all duration-500`}
                    style={{ width: `${(count / maxDomainCount) * 100}%`, minWidth: '2rem' }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        {recentIssues.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Submissions</h3>
            <div className="space-y-3">
              {recentIssues.map((issue, i) => {
                const termName = issue.title.replace(/^New Term:\s*/i, '');
                const isApproved = issue.labels?.some(l => l.name === 'approved');
                const isClosed = issue.state === 'closed';
                let statusColor = 'bg-yellow-100 text-yellow-800';
                let statusText = 'Pending Review';
                if (isApproved) {
                  statusColor = 'bg-green-100 text-green-800';
                  statusText = 'Approved';
                } else if (isClosed) {
                  statusColor = 'bg-blue-100 text-blue-800';
                  statusText = 'Under Discussion';
                }

                return (
                  <a
                    key={i}
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor}`}>{statusText}</span>
                    <span className="font-semibold text-slate-900 flex-1">{termName}</span>
                    <span className="text-sm text-slate-500">{issue.user?.login}</span>
                    <span className="text-sm text-slate-400">{timeAgo(issue.created_at)}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Top Contributors */}
        {contributors.length > 1 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Top Contributors</h3>
            <div className="flex flex-wrap gap-4">
              {contributors.map((c, i) => (
                <a
                  key={i}
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <img src={c.avatar_url} alt={c.login} className="w-8 h-8 rounded-full" />
                  <span className="font-semibold text-slate-900">{c.login}</span>
                  <span className="text-sm text-slate-500">{c.contributions} contributions</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* GitHub Repo Link */}
        <div className="text-center">
          <a
            href="https://github.com/brettleehari/hidden-curriculum"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <ExternalLink className="w-5 h-5" />
            View Full Repository on GitHub
          </a>
          <p className="text-sm text-slate-500 mt-2">Stars, forks, issues, and full commit history</p>
        </div>
      </div>
    </section>
  );
}
