import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import terms from '../data/terms.json';

const domainColorMap = {
  'Roads & Traffic': 'bg-blue-100 text-blue-800',
  'American Sports: Track': 'bg-blue-100 text-blue-800',
  'American Sports: Football': 'bg-blue-100 text-blue-800',
  'American Food Culture': 'bg-orange-100 text-orange-800',
  'Military: Cold War': 'bg-red-100 text-red-800',
  'Military: WWII': 'bg-red-100 text-red-800',
  'Wild West: Frontier': 'bg-amber-100 text-amber-800',
  'American Household': 'bg-green-100 text-green-800',
  'Silicon Valley Business': 'bg-purple-100 text-purple-800',
  'American Car Culture': 'bg-cyan-100 text-cyan-800',
  'Cybersecurity: Espionage': 'bg-rose-100 text-rose-800',
  'American Hacker Subculture': 'bg-violet-100 text-violet-800',
  'American Industrial Trades': 'bg-stone-100 text-stone-800',
  'American Pop Culture': 'bg-pink-100 text-pink-800',
  'American Slang': 'bg-teal-100 text-teal-800',
};

// Subdomains share the colour of their domain: "American Car Culture: Roads"
// uses the "American Car Culture" colour.
function getDomainColor(domain) {
  if (domainColorMap[domain]) return domainColorMap[domain];
  const base = Object.keys(domainColorMap).find(k => domain.startsWith(k) || k.startsWith(domain.split(':')[0]));
  return base ? domainColorMap[base] : 'bg-gray-100 text-gray-800';
}

const domains = [...new Set(terms.map(t => t.cultural_domain))].sort();

export default function TermsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('all');

  const filteredTerms = terms.filter(t => {
    const matchesSearch = t.term.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = filterDomain === 'all' || t.cultural_domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Browse Documented Terms</h2>
        <p className="text-slate-600 mb-8">
          Explore the full dataset of American cultural metaphors in software engineering. The "Affects All Non-Americans" column shows whether the term creates a barrier for all non-American developers (including native English speakers from UK, Australia, South Africa) or only non-English speakers.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by term..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Domains</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 text-slate-600 text-sm">
          Showing {filteredTerms.length} of {terms.length} terms
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-950 text-white">
                <th className="px-4 py-3 text-left font-semibold">Term</th>
                <th className="px-4 py-3 text-left font-semibold">Domain</th>
                <th className="px-4 py-3 text-left font-semibold">What Americans See</th>
                <th className="px-4 py-3 text-left font-semibold">What Software Means</th>
                <th className="px-4 py-3 text-left font-semibold">Where It Appears</th>
                <th className="px-4 py-3 text-left font-semibold">What Non-Americans Read</th>
                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Affects All Non-Americans</th>
                <th className="px-4 py-3 text-left font-semibold">Neutral Alternative</th>
              </tr>
            </thead>
            <tbody>
              {filteredTerms.map((term, idx) => (
                <tr key={term.term_id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-4 py-3 font-bold text-blue-950 whitespace-nowrap">{term.term}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${getDomainColor(term.cultural_domain)}`}>
                      {term.cultural_domain}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 min-w-[200px]">{term.what_americans_see}</td>
                  <td className="px-4 py-3 text-slate-700 min-w-[200px]">{term.what_software_means}</td>
                  <td className="px-4 py-3 text-slate-700">{term.where_it_appears}</td>
                  <td className="px-4 py-3 text-slate-700 min-w-[200px]">{term.what_non_americans_read}</td>
                  <td className="px-4 py-3 text-center">
                    {term.affects_all_non_americans === 'yes' ? (
                      <span className="text-amber-600 font-bold">Yes</span>
                    ) : (
                      <span className="text-green-600 font-semibold">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{term.neutral_alternative}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
