import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitTerm } from '../utils/submitTerm';

const domains = [
  'American Sports',
  'Silicon Valley Business',
  'Military and Cold War',
  'American Food Culture',
  'American Car Culture',
  'American Household',
  'Wild West and Frontier',
  'American Pop Culture',
  'American Industrial Trades',
  'Cybersecurity',
  'American Hacker Subculture',
  'American Slang',
  'Other',
];

const initialFormData = {
  term: '',
  cultural_domain: 'American Sports',
  what_americans_see: '',
  what_software_means: '',
  where_it_appears: '',
  what_non_americans_read: '',
  affects_all_non_americans: 'yes',
  neutral_alternative: '',
  contributor_name: '',
  contributor_country: '',
  personal_story: '',
};

export default function ContributeForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [submitting, setSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const result = await submitTerm(formData);
      if (result.success) {
        setLastSubmission({ ...formData, issueUrl: result.issueUrl, mode: result.mode });
        setStatus('success');
        setFormData(initialFormData);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Contribute a Term</h2>
        <p className="text-slate-600 mb-8">Found a culturally-embedded term in software engineering? Share it. An automated check reviews your submission first, then a maintainer. Approved terms enter the dataset, this site, and the HuggingFace mirror.</p>

        {status === 'success' && lastSubmission && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-900 mb-2">{lastSubmission.mode === 'github' ? 'One Step Left' : 'Submission Received'}</h3>
                <p className="text-green-800 mb-4">{lastSubmission.mode === 'github' ? 'A GitHub issue opened in a new tab with your answers filled in. Press "Submit new issue" there to send your term for review.' : 'Your term is recorded and waiting for review. Thank you for contributing to the Hidden Curriculum.'}</p>
                <div className="bg-white p-4 rounded border border-green-100 text-sm space-y-1">
                  <div><span className="font-semibold text-slate-900">Term:</span> {lastSubmission.term}</div>
                  <div><span className="font-semibold text-slate-900">Domain:</span> {lastSubmission.cultural_domain}</div>
                  {lastSubmission.contributor_name && (
                    <div><span className="font-semibold text-slate-900">From:</span> {lastSubmission.contributor_name}{lastSubmission.contributor_country && ` (${lastSubmission.contributor_country})`}</div>
                  )}
                  {lastSubmission.issueUrl && (
                    <div>
                      <a href={lastSubmission.issueUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {lastSubmission.mode === 'github' ? 'Open the prefilled issue again' : 'View your submission on GitHub'}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">Submission Failed</h3>
                <p className="text-red-800">Something went wrong. Please try again.</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Term <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="term"
                value={formData.term}
                onChange={handleChange}
                required
                placeholder="e.g., playbook, sprint, fork"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Cultural Origin / Domain <span className="text-red-600">*</span>
              </label>
              <select
                name="cultural_domain"
                value={formData.cultural_domain}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {domains.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              What Americans See <span className="text-red-600">*</span>
            </label>
            <textarea
              name="what_americans_see"
              value={formData.what_americans_see}
              onChange={handleChange}
              required
              placeholder="What does this word mean in American daily life?"
              rows="3"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              What Software Means <span className="text-red-600">*</span>
            </label>
            <textarea
              name="what_software_means"
              value={formData.what_software_means}
              onChange={handleChange}
              required
              placeholder="The technical definition in software engineering"
              rows="3"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Where It Appears
            </label>
            <input
              type="text"
              name="where_it_appears"
              value={formData.where_it_appears}
              onChange={handleChange}
              placeholder="Tools, frameworks, contexts (e.g., Ansible, Git, AWS)"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              What Non-Americans Read <span className="text-red-600">*</span>
            </label>
            <textarea
              name="what_non_americans_read"
              value={formData.what_non_americans_read}
              onChange={handleChange}
              required
              placeholder="What would someone outside America think this means?"
              rows="3"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Affects All Non-Americans? <span className="text-red-600">*</span>
            </label>
            <p className="text-sm text-slate-600 mb-3">Does this confuse even native English speakers outside the US?</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="affects_all_non_americans"
                  value="yes"
                  checked={formData.affects_all_non_americans === 'yes'}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-slate-700">Yes (Cultural barrier, Layer 1)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="affects_all_non_americans"
                  value="no"
                  checked={formData.affects_all_non_americans === 'no'}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-slate-700">No (Linguistic only, Layer 2)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Neutral Alternative
            </label>
            <input
              type="text"
              name="neutral_alternative"
              value={formData.neutral_alternative}
              onChange={handleChange}
              placeholder="A culturally-neutral replacement, if one exists"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="border-t border-slate-200 pt-6">
            <p className="text-sm font-semibold text-slate-700 mb-4">Optional Information</p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="contributor_name"
                  value={formData.contributor_name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Country</label>
                <input
                  type="text"
                  name="contributor_country"
                  value={formData.contributor_country}
                  onChange={handleChange}
                  placeholder="Where you are based"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Your Story</label>
              <textarea
                name="personal_story"
                value={formData.personal_story}
                onChange={handleChange}
                placeholder="Share your personal experience with this term"
                rows="3"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              <Send className="w-5 h-5" />
              {submitting ? 'Submitting...' : 'Submit Your Term'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}