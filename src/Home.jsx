// frontend/src/Home.jsx
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import News from './components/News.jsx';
import Process from './components/Process.jsx';
import Gallery from './components/Gallery.jsx';
import Partners from './components/Partners.jsx';
import FAQ from './components/FAQ.jsx';
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
        <Services />
        <News />
        <Process />
        <Gallery />
        <Partners />
        <FAQ />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
