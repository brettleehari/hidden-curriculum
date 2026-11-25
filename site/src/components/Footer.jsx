import { ArrowRight, Database, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">The Hidden Curriculum</h3>
            <p className="text-slate-300 text-sm">Documenting American cultural metaphors in software engineering to support non-American developers worldwide.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/brettleehari/hidden-curriculum/blob/main/paper/The_Hidden_Curriculum.pdf" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" /> Read the Paper
                </a>
              </li>
              <li>
                <a href="https://huggingface.co/datasets/brettleehari/hidden-curriculum" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition flex items-center gap-2">
                  <Database className="w-4 h-4" /> HuggingFace Dataset
                </a>
              </li>
              <li>
                <a href="https://github.com/brettleehari/hidden-curriculum" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> GitHub Repository
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">License</h3>
            <p className="text-slate-300 text-sm mb-2">Dataset (CSV): CC BY 4.0</p>
            <p className="text-slate-300 text-sm mb-4">Code: MIT</p>
            <p className="text-slate-300 text-sm">Built by an independent researcher. Open source. Contribute freely.</p>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          <p>The Hidden Curriculum of Software Engineering, 2026. CC BY 4.0 for data, MIT for code.</p>
        </div>
      </div>
    </footer>
  );
}