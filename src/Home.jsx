// frontend/src/Home.jsx
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import About from './components/About.jsx';
import Investigaciones from './components/Investigaciones.jsx';
import News from './components/News.jsx';
import Investigadores from './components/Investigadores.jsx';
import CTABanner from './components/CTABanner.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Investigaciones />
        <News />
        <Investigadores />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
