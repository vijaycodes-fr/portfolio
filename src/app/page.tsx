'use client';
import Navbar from '@/components/ui/Navbar';
import ScrollProgress from '@/components/ui/ScrollProgress';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Experience from '@/sections/Experience';
import Achievements from '@/sections/Achievements';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

function Divider({ color = 'rgba(255,255,255,0.08)' }: { color?: string }) {
  return <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />;
}

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Divider color="rgba(0,212,255,0.3)" />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
        <Divider />
        <Experience />
        <Divider color="rgba(245,158,11,0.3)" />
        <Achievements />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
