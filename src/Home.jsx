// frontend/src/Home.jsx
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Investigaciones from './components/Investigaciones.jsx';
import News from './components/News.jsx';
import Investigadores from './components/Investigadores.jsx';
import Instituciones from './components/Instituciones.jsx';
import CTABanner from './components/CTABanner.jsx';
import Footer from './components/Footer.jsx';
import Reveal from './components/ui/Reveal.jsx';
import SiteBackground from './components/ui/SiteBackground.jsx';

export default function Home() {
  return (
    <>
      <SiteBackground />
      <Header />
      <main>
        <Hero />
        <Reveal><About /></Reveal>
        <Reveal><Investigaciones /></Reveal>
        <Reveal><News /></Reveal>
        <Reveal><Investigadores /></Reveal>
        <Reveal><Instituciones /></Reveal>
        <Reveal><CTABanner /></Reveal>
      </main>
      <Footer />
    </>
  );
}
