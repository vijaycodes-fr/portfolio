'use client';
import dynamic from 'next/dynamic';
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

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        {/* Section break */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
        <About />
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <Skills />
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <Projects />
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <Experience />
        <div className="h-px bg-gradient-to-r from-transparent via-[#f59e0b]/30 to-transparent" />
        <Achievements />
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
