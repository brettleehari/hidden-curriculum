import { ArrowRight, Database, ExternalLink } from 'lucide-react';
import stats from '../data/stats.json';

export default function Hero() {
  // Every number on this page comes from the master CSV at build time.
  const totalTerms = stats.validated;
  const affectsAllPct = stats.layer1Pct;

  return (
    <>
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Hidden Curriculum of Software Engineering</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-6">
            {totalTerms} American cultural metaphors validated, {stats.candidateTerms} more in review. {affectsAllPct}% of validated terms create barriers for ALL non-Americans, not only non-English speakers. Help us find more.
          </p>
          <div className="bg-blue-800/50 rounded-lg p-6 mb-8">
            <p className="text-base leading-relaxed text-blue-50 mb-4">
              Software engineering terminology borrows from American sports, food, military, car culture, and Silicon Valley slang. These terms feel transparent to Americans. They create learning barriers for every developer raised outside the United States. The barrier is cultural, not linguistic. A British developer does not know American football. An Australian does not connect "grandfathered" to post-Civil War voting laws. This project documents the problem and invites every developer worldwide to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://github.com/brettleehari/hidden-curriculum/blob/main/paper/The_Hidden_Curriculum.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded font-semibold transition">
                Read the Paper
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a href="https://huggingface.co/datasets/brettleehari/hidden-curriculum" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded font-semibold transition">
                Browse Dataset
                <Database className="ml-2 w-4 h-4" />
              </a>
              <a href="https://github.com/brettleehari/hidden-curriculum" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded font-semibold transition">
                GitHub Repo
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-slate-100 to-slate-50 py-12 px-4 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-950 mb-2">{totalTerms}</div>
              <div className="text-slate-700 font-medium">Validated Terms</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-950 mb-2">12</div>
              <div className="text-slate-700 font-medium">Cultural Domains</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-950 mb-2">{affectsAllPct}%</div>
              <div className="text-slate-700 font-medium">Affect All Non-Americans</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-950 mb-2">{stats.candidateTerms}</div>
              <div className="text-slate-700 font-medium">Candidates in Review</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
