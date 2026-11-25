import { ArrowRight, Database, ExternalLink } from 'lucide-react';

export default function About() {
  return (
    <section className="py-16 px-4 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">About This Project</h2>

        <div className="bg-blue-50 rounded-lg p-8 border border-blue-200 mb-8">
          <p className="text-lg text-slate-800 leading-relaxed mb-6">
            I am Hari Prasad Sudharsan, a Chennai-born, Dallas-based AI and telecom professional with 20 years of experience. I moved to the United States and spent two years documenting every American cultural metaphor I encountered in software engineering. This project is the result.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://github.com/brettleehari/hidden-curriculum/blob/main/paper/The_Hidden_Curriculum.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-700 hover:text-blue-900 font-semibold transition">
              <ArrowRight className="mr-2 w-4 h-4" /> Read the Paper
            </a>
            <a href="https://huggingface.co/datasets/brettleehari/hidden-curriculum" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-700 hover:text-blue-900 font-semibold transition">
              <Database className="mr-2 w-4 h-4" /> Dataset on HuggingFace
            </a>
            <a href="https://github.com/brettleehari/hidden-curriculum" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-700 hover:text-blue-900 font-semibold transition">
              <ExternalLink className="mr-2 w-4 h-4" /> Source on GitHub
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">How to Cite</h3>
          <p className="font-mono text-sm text-slate-700 bg-slate-50 p-4 rounded border-l-4 border-amber-500">
            Sudharsan, H. P. (2026). The Hidden Curriculum of Software Engineering: How American Cultural Metaphors Shape Global Technical Vocabulary and Why AI Is Making Them Invisible. arXiv preprint.
          </p>
        </div>
      </div>
    </section>
  );
}