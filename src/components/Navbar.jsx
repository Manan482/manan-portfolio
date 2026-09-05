import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Volume2, VolumeX, ExternalLink, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound, playClickSound, toggleSound, isSoundEnabled } from '../utils/soundEffects';

export default function Navbar({ onOpenFeedback }) {
  const [isOpen, setIsOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Portfolio Scanner', href: '#portfolio-scanner' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Foundation', href: '#foundation' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  // Smart Hide on Hero Top, Drop In when Scrolling past Hero
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 220) {
        // At top of hero - hide to let Hero's embedded top nav shine
        setIsVisible(false);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 350) {
        // Scrolling DOWN past hero
        setIsVisible(false);
      } else {
        // Scrolling UP
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP intro animation on mount
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
    );
  }, []);

  const handleSoundToggle = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    toggleSound(newState);
    if (newState) playClickSound();
  };

  const handleLinkClick = (href) => {
    playClickSound();
    setIsOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-500 ease-in-out px-4 sm:px-8 py-4 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60">
          
          {/* Logo with yellow glow hover */}
          <a 
            href="#home"
            onClick={() => playClickSound()}
            onMouseEnter={playHoverSound}
            className="group flex items-center space-x-2 text-white font-display text-xl font-bold tracking-wider"
          >
            <span className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black text-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md shadow-yellow-400/30">
              M
            </span>
            <span className="group-hover:text-yellow-400 transition-colors duration-300 group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]">
              {personalInfo.brandLogo}
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-7 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={playHoverSound}
                onClick={() => handleLinkClick(link.href)}
                className="relative py-1 text-zinc-300 hover:text-white transition-colors duration-200 group font-sans"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center space-x-3">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundOn ? 'Mute Sound FX' : 'Enable Sound FX'}
              className="p-2.5 rounded-full text-zinc-400 hover:text-yellow-400 hover:bg-white/5 border border-white/5 transition-all duration-200"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Quick Contact CTA */}
            <a
              href="#contact"
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
              className="hidden lg:inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-yellow-400/20 hover:shadow-yellow-400/40 hover:scale-105"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => { playClickSound(); setIsOpen(!isOpen); }}
              className="md:hidden p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 flex flex-col justify-center px-8 bg-zinc-950/95 backdrop-blur-3xl md:hidden animate-fadeIn">
          <div className="flex flex-col space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">Navigation</p>
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                style={{ animationDelay: `${idx * 60}ms` }}
                className="text-3xl font-display font-black text-zinc-200 hover:text-yellow-400 tracking-tight transition-all duration-200 flex items-center justify-between group"
              >
                <span>{link.name}</span>
                <span className="text-sm font-mono text-zinc-600 group-hover:text-yellow-400">0{idx + 1}</span>
              </a>
            ))}

            <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
              <a
                href="#contact"
                onClick={() => handleLinkClick('#contact')}
                className="w-full py-3.5 rounded-2xl bg-yellow-400 text-black font-bold uppercase tracking-wider text-center"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
