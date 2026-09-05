import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound, playClickSound } from '../utils/soundEffects';
import { ArrowUp, Heart, Sparkles, Send, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeRows = [
    { text: "MANAN MAHAJAN • SOFTWARE ENGINEER • DISTRIBUTED SYSTEMS • FULL STACK ARCHITECT •", reverse: false, opacity: "opacity-10" },
    { text: "JAVA • SPRING BOOT • MONGODB • AWS CLOUD • DOCKER • FASTAPI • REACT • TAILWIND •", reverse: true, opacity: "opacity-15" },
    { text: "AWWWARDS LEVEL CREATIVE MOTION • CINEMATIC FRONTEND • SCALABLE MICROSERVICES •", reverse: false, opacity: "opacity-10" },
    { text: "VIT VELLORE '27 • RESEARCH PUBLICATION IJPREMS • ORACLE CERTIFIED •", reverse: true, opacity: "opacity-20" },
  ];

  return (
    <footer className="relative w-full bg-[#f4c400] text-zinc-900 overflow-hidden flex flex-col justify-between pt-16 pb-10 select-none">
      
      {/* 4 Layers of Massive Animated Background Marquee Typography */}
      <div className="absolute inset-0 flex flex-col justify-around pointer-events-none z-0 overflow-hidden py-4">
        {marqueeRows.map((row, i) => (
          <div 
            key={i} 
            className={`w-full overflow-hidden whitespace-nowrap ${row.opacity}`}
          >
            <div className={`flex w-max ${row.reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`} style={{ animationDuration: '40s' }}>
              <span className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter uppercase px-4 text-black">
                {row.text} {row.text}
              </span>
              <span className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter uppercase px-4 text-black">
                {row.text} {row.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 flex flex-col items-center text-center space-y-10">
        
        {/* Centerpiece: Floating 3D Cartoon Avatar with Cinematic Shadow */}
        <div className="relative group">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-black/80 shadow-[0_20px_50px_rgba(0,0,0,0.4)] bg-zinc-950 animate-float-slow transform group-hover:scale-105 transition-transform duration-300">
            <img 
              src={personalInfo.images.avatar3d} 
              alt="Manan Mahajan 3D Avatar" 
              className="w-full h-full object-cover object-top filter contrast-105"
            />
          </div>
          
          {/* Subtle glow ring under avatar */}
          <div className="absolute -inset-2 rounded-full border border-black/20 pointer-events-none animate-ping" style={{ animationDuration: '4s' }} />
        </div>

        {/* Dual Glowing CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={() => playClickSound()}
            className="px-8 py-3.5 rounded-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold uppercase tracking-wider text-xs shadow-lg shadow-blue-600/30 hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>Follow on LinkedIn</span>
          </a>

          <a
            href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20from%20Portfolio`}
            onMouseEnter={playHoverSound}
            onClick={() => playClickSound()}
            className="px-8 py-3.5 rounded-full bg-white hover:bg-zinc-100 text-black font-bold uppercase tracking-wider text-xs shadow-lg shadow-black/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Email</span>
          </a>
        </div>

        {/* Luxury Branding Section */}
        <div className="space-y-2 pt-4">
          <h3 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase">
            <span className="text-black">{personalInfo.shortName}</span>{' '}
            <span className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">MAHAJAN</span>
          </h3>
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-black/80 font-bold max-w-md mx-auto">
            Crafting high-impact scalable architectures & cinematic digital experiences.
          </p>
        </div>

        {/* Responsive Uppercase Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest pt-2">
          {['Home', 'About', 'Projects', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onMouseEnter={playHoverSound}
              onClick={() => playClickSound()}
              className="text-black/80 hover:text-black hover:underline transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            className="text-black/80 hover:text-black hover:underline flex items-center gap-1"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Minimal Divider Line */}
        <div className="w-full max-w-4xl h-px bg-black/15 rounded-full my-6" />

        {/* Bottom Copyright & Back to Top */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold text-black/80">
          <p>© {new Date().getFullYear()} Manan A Mahajan. Engineered with React, GSAP & Lenis.</p>
          
          <button
            onClick={scrollToTop}
            onMouseEnter={playHoverSound}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black text-yellow-400 hover:bg-zinc-800 transition-all shadow-md hover:scale-105"
          >
            <span>TOP OF PAGE</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
