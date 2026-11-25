import Hero from './components/Hero';
import TermsTable from './components/TermsTable';
import RepoStats from './components/RepoStats';
import ContributeForm from './components/ContributeForm';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <TermsTable />
      <RepoStats />
      <ContributeForm />
      <About />
      <Footer />
    </div>
  );
}
