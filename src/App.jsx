import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import PortfolioScanner from './components/PortfolioScanner';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import ProjectsFolder from './components/ProjectsFolder';
import ResumeOverview from './components/ResumeOverview';
import ServicesCarousel from './components/ServicesCarousel';
import Contact from './components/Contact';
import Footer from './components/Footer';

import ErrorBoundary from './components/ErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-zinc-950 text-white selection:bg-yellow-400 selection:text-black font-sans antialiased">
      
      {/* Fixed Responsive Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Interactive Portfolio Scanner Hero (280px aperture cursor follow & color switcher) */}
      <PortfolioScanner />

      {/* Cinematic Welcome & Engineering Pillars Section */}
      <Welcome />

      {/* 3D Archive Folder Explosion Projects Showcase (NOW PLACED BEFORE FOUNDATION) */}
      <ProjectsFolder />

      {/* Academic Foundation & Technical Stack Matrix */}
      <ResumeOverview />

      {/* 3D Half-Circle Curved Services Carousel */}
      <ServicesCarousel />

      {/* Luxury Dark Minimal Contact Transmission Portal */}
      <Contact />

      {/* Vibrant Yellow Cinematic Marquee Footer */}
      <Footer />

      </div>
    </ErrorBoundary>
  );
}
