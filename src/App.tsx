import { About, Marquee } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Experience, Journey } from './components/Journey';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

export default function App() {
  return (
    <>
      <Loader />
      <a className="skip-link" href="#contenu">
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="contenu">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
