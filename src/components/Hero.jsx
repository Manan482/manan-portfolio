import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound, playClickSound, toggleSound, playIronManSound } from '../utils/soundEffects';
import { 
  ArrowUpRight, 
  Download, 
  Volume2, 
  VolumeX, 
  Terminal, 
  Sparkles, 
  ChevronDown, 
  Clock, 
  Code2, 
  ExternalLink, 
  Zap, 
  ShieldCheck,
  FileText
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

// Cypher text scramble helper
function ScrambleText({ text, className = '' }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  const handleMouseEnter = () => {
    playHoverSound();
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 28);
  };

  return (
    <span onMouseEnter={handleMouseEnter} className={className}>
      {displayText}
    </span>
  );
}

export default function Hero() {
  const [soundOn, setSoundOn] = useState(true);
  const [activeTerminalTab, setActiveTerminalTab] = useState('health');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Cursor-Point Spotlight Reveal State
  const [lensPos, setLensPos] = useState({ x: -500, y: -500 });
  const [lensActive, setLensActive] = useState(false);
  const lensRadius = 125; // 250px spotlight diameter

  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const nameRef = useRef(null);
  const portraitContainerRef = useRef(null);
  const hudTopRef = useRef(null);
  const hudBottomRef = useRef(null);
  const summaryCardRef = useRef(null);
  const leftCardRef = useRef(null);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 1. High-Performance Interactive Cyber Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor(window.innerWidth / 25), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.6 + 0.8,
    }));

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = lensActive ? 'rgba(56, 189, 248, 0.5)' : 'rgba(250, 204, 21, 0.45)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lensActive
              ? `rgba(56, 189, 248, ${0.15 * (1 - dist / 115)})`
              : `rgba(250, 204, 21, ${0.12 * (1 - dist / 115)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = lensActive ? 'rgba(56, 189, 248, 0.25)' : 'rgba(234, 179, 8, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lensActive]);

  // 2. 3D Spatial Gyroscope / Mouse Magnetic Parallax
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId;

    const onMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    const updatePhysics = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (portraitContainerRef.current) {
        portraitContainerRef.current.style.transform = `perspective(1000px) rotateY(${currentX * 6}deg) rotateX(${-currentY * 4}deg) translateZ(25px)`;
      }
      if (summaryCardRef.current) {
        summaryCardRef.current.style.transform = `perspective(1000px) rotateY(${currentX * 8}deg) rotateX(${-currentY * 6}deg) translate3d(${currentX * 15}px, ${-currentY * 10}px, 40px)`;
      }
      if (leftCardRef.current) {
        leftCardRef.current.style.transform = `perspective(1000px) rotateY(${currentX * 8}deg) rotateX(${-currentY * 6}deg) translate3d(${-currentX * 15}px, ${-currentY * 10}px, 40px)`;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 3. GSAP Entry Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(hudTopRef.current, { y: -40, opacity: 0, duration: 0.9 })
        .from(nameRef.current, { scale: 0.92, y: 50, opacity: 0, duration: 1.1 }, '-=0.5')
        .from(portraitContainerRef.current, { y: 80, opacity: 0, duration: 1.1 }, '-=0.7')
        .from([summaryCardRef.current, leftCardRef.current], { scale: 0.85, opacity: 0, stagger: 0.15, duration: 0.8 }, '-=0.5')
        .from(hudBottomRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.4');

      gsap.to(nameRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to(portraitContainerRef.current, {
        y: 50,
        scale: 0.98,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSoundToggle = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    toggleSound(newState);
    if (newState) playClickSound();
  };

  // Cursor-follow coordinate tracking on the portrait container
  const handlePortraitMouseMove = (e) => {
    if (!portraitContainerRef.current) return;
    const rect = portraitContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensPos({ x, y });
  };

  const handlePortraitMouseEnter = (e) => {
    setLensActive(true);
    playIronManSound();
    handlePortraitMouseMove(e);
  };

  const handlePortraitMouseLeave = () => {
    setLensActive(false);
  };

  const navLinks = [
    { name: 'Work.', href: '#projects' },
    { name: 'About.', href: '#about' },
    { name: 'Foundation.', href: '#foundation' },
    { name: 'Services.', href: '#services' },
    { name: 'Contact.', href: '#contact' },
  ];

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-[100dvh] w-full bg-[#070709] text-white flex flex-col justify-between items-center overflow-hidden select-none py-2"
    >
      {/* 1. Interactive HTML5 Cyber Particle Matrix Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-70" 
      />

      {/* 2. Cyber Ambient Lighting & Grid Mesh */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[150px] pointer-events-none z-0 transition-colors duration-700 ${
          lensActive ? 'bg-sky-500/15' : 'bg-yellow-400/8'
        }`} 
      />
      
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '4rem 4rem'
        }}
      />

      {/* ============================================================ */}
      {/* TOP HUD: Minimalist Brand, Telemetry & Dot Nav               */}
      {/* ============================================================ */}
      <header 
        ref={hudTopRef}
        className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-4 sm:pt-6 flex items-center justify-between"
      >
        {/* Left: Brand Monogram with Live Beacon */}
        <div className="flex items-center space-x-3.5">
          <a 
            href="#home" 
            onClick={() => playClickSound()}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm group-hover:scale-105 transition-all shadow-lg ${
                lensActive 
                  ? 'bg-sky-400 text-black shadow-sky-400/30' 
                  : 'bg-yellow-400 text-black shadow-yellow-400/30'
              }`}>
                M
              </span>
              <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[#070709] animate-pulse ${
                lensActive ? 'bg-sky-400' : 'bg-emerald-400'
              }`} />
            </div>

            <div className="flex flex-col">
              <span className="font-display font-black text-sm tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                <ScrambleText text="MANAN MAHAJAN" />
              </span>
              <span className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase flex items-center space-x-1.5">
                <span>VIT CSE '27</span>
                <span className="text-zinc-600">•</span>
                <span className="text-yellow-400/90 font-semibold">CGPA 7.87</span>
              </span>
            </div>
          </a>
        </div>

        {/* Center: Live UTC Clock Telemetry Pill */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] font-mono text-zinc-400 shadow-sm backdrop-blur-md">
          <Clock className="w-3.5 h-3.5 text-yellow-400" />
          <span>VELLORE, IN</span>
          <span className="text-white font-bold">{currentTime || '16:30:00'}</span>
          <span className="text-emerald-400 font-semibold">● ACTIVE</span>
        </div>

        {/* Right: Dot Links & Controls */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-5 text-xs font-mono font-bold tracking-wider text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={playHoverSound}
                onClick={() => playClickSound()}
                className="hover:text-yellow-400 transition-colors py-1 relative group"
              >
                <ScrambleText text={link.name} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSoundToggle}
              onMouseEnter={playHoverSound}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-[11px] font-mono text-zinc-300 hover:text-white hover:border-yellow-400/40 transition-all shadow-sm"
              aria-label="Toggle Sound"
            >
              {soundOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="hidden sm:inline">FX ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="hidden sm:inline">FX OFF</span>
                </>
              )}
            </button>

            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
              className="px-3.5 py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-bold text-[11px] tracking-wider uppercase flex items-center space-x-1.5 shadow-lg shadow-yellow-400/25 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* CENTER STAGE: Fully Visible Name, Cutout & Professional Summary */}
      {/* ============================================================ */}
      <div 
        ref={stageRef}
        className="relative w-full flex-1 flex items-center justify-center overflow-hidden perspective-[1200px] px-4 py-4"
      >
        {/* Layer 1: Fully Visible, Non-Clipped Hero Name (MANAN MAHAJAN) */}
        <div 
          ref={nameRef}
          className="absolute z-0 w-full text-center pointer-events-none select-none px-4 max-w-7xl mx-auto top-6 sm:top-8"
        >
          {/* Top Pill Subtitle */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900/70 border border-white/10 text-[10px] sm:text-xs font-mono tracking-widest text-yellow-400 uppercase mb-2 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>SOFTWARE DEVELOPMENT ENGINEER // CLOUD ARCHITECT</span>
          </div>

          {/* Full Name: MANAN MAHAJAN (responsively sized so every letter is 100% visible) */}
          <h1 className="text-[clamp(2.8rem,7.5vw,7.8rem)] font-display font-black uppercase tracking-tight leading-none text-zinc-100 drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6">
            <span className="text-yellow-400">MANAN</span>
            <span className="text-zinc-100">MAHAJAN</span>
          </h1>

          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-zinc-400 uppercase mt-2">
            VIT VELLORE '27 • DISTRIBUTED SYSTEMS • ENTERPRISE BACKEND
          </p>
        </div>

        {/* Layer 2 (Left): Engineering Core Card */}
        <div
          ref={leftCardRef}
          className="hidden xl:flex absolute left-6 2xl:left-14 z-20 flex-col gap-2.5 p-4 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left w-64 pointer-events-auto transition-transform duration-200 ease-out hover:border-yellow-400/50"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="font-mono font-bold text-xs text-white">ENGINEERING CORE</span>
            </div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>

          <div className="space-y-1.5 pt-1 text-[11px] font-mono text-zinc-300">
            <div className="flex justify-between">
              <span className="text-zinc-500">Language:</span>
              <span className="text-white font-bold">Java 21 / Spring Boot 3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Cloud Infra:</span>
              <span className="text-white font-bold">AWS (EC2, S3, Docker)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Database:</span>
              <span className="text-white font-bold">MongoDB & SQL Engine</span>
            </div>
          </div>

          <div className="mt-1 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-emerald-400">
            <span>● 12+ Microservices Tested</span>
            <span className="text-zinc-400">REST / JWT</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Layer 3 (Center): DUAL-LAYER CURSOR SPOTLIGHT REVEAL CONTAINER */}
        {/* Only the circular region where the cursor hovers transforms!  */}
        {/* ============================================================ */}
        <div 
          ref={portraitContainerRef}
          onMouseMove={handlePortraitMouseMove}
          onMouseEnter={handlePortraitMouseEnter}
          onMouseLeave={handlePortraitMouseLeave}
          className="relative z-10 h-[64vh] sm:h-[72vh] max-h-[78vh] flex items-end justify-center pointer-events-auto group cursor-crosshair transition-transform duration-150 ease-out mt-12 sm:mt-16 select-none"
        >
          {/* Ambient Backlight Glow behind character */}
          <div 
            className={`absolute -inset-6 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-all duration-700 pointer-events-none ${
              lensActive 
                ? 'bg-gradient-to-t from-sky-400/35 via-sky-500/15 to-transparent' 
                : 'bg-gradient-to-t from-yellow-400/25 via-yellow-400/10 to-transparent'
            }`} 
          />

          {/* BASE LAYER (Default: Manan in Navy Shirt) */}
          <img 
            src={personalInfo.images.heroReal}
            alt="Manan Mahajan"
            className="h-full w-auto object-contain object-bottom filter contrast-105 brightness-105 drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] rounded-b-none pointer-events-none"
            style={{
              imageRendering: '-webkit-optimize-contrast',
            }}
          />

          {/* OVERLAY LAYER (Iron Man Suit revealed ONLY where the cursor hovers!) */}
          <div 
            className="absolute inset-0 h-full w-full flex items-end justify-center pointer-events-none"
            style={{
              opacity: lensActive ? 1 : 0,
              maskImage: `radial-gradient(circle ${lensRadius}px at ${lensPos.x}px ${lensPos.y}px, black 65%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${lensRadius}px at ${lensPos.x}px ${lensPos.y}px, black 65%, transparent 100%)`,
              transition: 'opacity 0.25s ease-out',
            }}
          >
            <img 
              src={personalInfo.images.heroIronMan}
              alt="Manan Iron Man Suit"
              className="h-full w-auto object-contain object-bottom filter contrast-110 brightness-110 drop-shadow-[0_30px_70px_rgba(56,189,248,0.7)] rounded-b-none"
              style={{
                imageRendering: '-webkit-optimize-contrast',
              }}
            />
          </div>

          {/* NANOTECH APERTURE RETICLE: Glowing Arc Reactor Ring tracking cursor */}
          {lensActive && (
            <div 
              className="absolute pointer-events-none rounded-full border border-sky-400/85 shadow-[0_0_25px_rgba(56,189,248,0.9),inset_0_0_15px_rgba(56,189,248,0.5)] flex items-center justify-center transition-all duration-75"
              style={{
                left: `${lensPos.x}px`,
                top: `${lensPos.y}px`,
                width: `${lensRadius * 2}px`,
                height: `${lensRadius * 2}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Rotating dashed ring */}
              <div 
                className="absolute inset-0 rounded-full border border-dashed border-sky-300/40 animate-spin" 
                style={{ animationDuration: '10s' }} 
              />
              
              {/* Corner Telemetry Tags */}
              <div className="absolute -top-3 right-2 text-[9px] font-mono text-sky-300 font-bold bg-black/85 px-1.5 py-0.5 rounded border border-sky-400/40 shadow-lg">
                MARK 85 ACTIVE
              </div>
              <div className="absolute -bottom-3 left-2 text-[8px] font-mono text-sky-400/90 bg-black/85 px-1.5 py-0.5 rounded border border-sky-400/30">
                ARC REACTOR 100%
              </div>
            </div>
          )}

          {/* Interactive HUD Guide Pill below the character */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center px-3.5 py-1.5 rounded-full bg-zinc-950/90 backdrop-blur-md border border-white/20 shadow-2xl text-[11px] font-mono tracking-wider transition-all duration-300">
            {lensActive ? (
              <div className="flex items-center space-x-2 text-sky-400">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span className="font-bold">NANOTECH ARMOR SCANNER // ACTIVE 🦾</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span>Hover cursor over image to reveal Iron Man suit</span>
              </div>
            )}
          </div>
        </div>

        {/* Layer 4 (Right): Prominent Professional Summary & Credentials Card */}
        <div
          ref={summaryCardRef}
          className="hidden xl:flex absolute right-6 2xl:right-14 z-20 flex-col gap-3 p-5 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left w-80 pointer-events-auto transition-transform duration-200 ease-out hover:border-yellow-400/50"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span className="font-mono font-bold text-xs text-white">PROFESSIONAL SUMMARY</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              AVAILABLE FOR HIRE
            </span>
          </div>

          {/* Full Professional Summary Copy */}
          <p className="text-[11.5px] font-sans text-zinc-300 leading-relaxed">
            B.Tech Computer Science & Engineering undergraduate at <strong className="text-white">Vellore Institute of Technology (VIT Vellore '27)</strong>. 
            Specializing in high-throughput enterprise backend engineering, microservice architectures, and modern cloud deployment with <span className="text-yellow-400 font-mono">Java 21</span>, <span className="text-yellow-400 font-mono">Spring Boot</span>, <span className="text-yellow-400 font-mono">MongoDB</span>, and <span className="text-yellow-400 font-mono">AWS</span>.
          </p>

          {/* Credentials Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/10">
            {['VIT CSE (CGPA 7.87)', 'Java 21', 'Spring Boot 3', 'AWS', 'Docker', 'IJPREMS Author'].map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-[10px] font-mono text-zinc-400">
                {tag}
              </span>
            ))}
          </div>

          {/* Quick Action Links */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] font-mono">
            <a 
              href="#projects"
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
              className="text-yellow-400 hover:text-yellow-300 font-bold flex items-center space-x-1"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a 
              href={personalInfo.socials.researchPaper}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={playHoverSound}
              className="text-zinc-400 hover:text-white flex items-center space-x-1"
            >
              <FileText className="w-3 h-3 text-yellow-400" />
              <span>Research Paper</span>
            </a>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* MOBILE PROFESSIONAL SUMMARY (Visible on mobile/tablet screens) */}
      {/* ============================================================ */}
      <div className="xl:hidden relative z-20 w-full max-w-lg px-6 py-2">
        <div className="p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/10 shadow-lg text-left space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-yellow-400 font-bold">PROFESSIONAL SUMMARY</span>
            <span className="text-emerald-400 text-[10px]">VIT CSE '27</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            {personalInfo.bio}
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BOTTOM HUD: Interactive Terminal Command Drawer & Socials    */}
      {/* ============================================================ */}
      <footer 
        ref={hudBottomRef}
        className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-4 sm:pb-6 flex flex-col gap-3 border-t border-white/10 pt-3"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Interactive Live Terminal Bar */}
          <div className="flex items-center space-x-3 text-xs font-mono">
            <button
              onClick={() => { playClickSound(); setTerminalOpen(!terminalOpen); }}
              onMouseEnter={playHoverSound}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-300 shadow-md transition-all group"
            >
              <Terminal className="w-3.5 h-3.5 text-yellow-400 group-hover:rotate-12 transition-transform" />
              <span className="text-zinc-400">$ manan --status</span>
              <span className="text-emerald-400 font-bold">READY 🚀</span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${terminalOpen ? 'rotate-180' : ''}`} />
            </button>

            <span className="hidden lg:inline text-zinc-500">
              Low-Latency Microservices • Java 21 • AWS Cloud
            </span>
          </div>

          {/* Center: Scroll Down Indicator */}
          <a 
            href="#portfolio-scanner"
            onClick={() => playClickSound()}
            onMouseEnter={playHoverSound}
            className="hidden md:flex items-center space-x-1.5 text-xs font-mono text-zinc-400 hover:text-yellow-400 transition-colors group"
          >
            <span>Explore Scanner</span>
            <ChevronDown className="w-4 h-4 text-yellow-400 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Right: Quick Direct Social Icons */}
          <div className="flex items-center space-x-2">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              onClick={() => playClickSound()}
              title="GitHub Repositories"
              className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-all shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              onClick={() => playClickSound()}
              title="LinkedIn Profile"
              className="p-2 rounded-full bg-zinc-900 hover:bg-blue-600/30 border border-white/10 text-zinc-400 hover:text-blue-400 transition-all shadow-sm"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              onClick={() => playClickSound()}
              title="Instagram Profile"
              className="p-2 rounded-full bg-zinc-900 hover:bg-pink-600/30 border border-white/10 text-zinc-400 hover:text-pink-400 transition-all shadow-sm"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              onClick={() => playClickSound()}
              title="WhatsApp Contact"
              className="p-2 rounded-full bg-zinc-900 hover:bg-emerald-600/30 border border-white/10 text-zinc-400 hover:text-emerald-400 transition-all shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Expandable High-Tech Interactive Terminal Drawer */}
        {terminalOpen && (
          <div className="w-full bg-zinc-950/95 border border-white/15 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl text-xs font-mono animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-zinc-400 ml-2 font-bold">terminal@manan-sde:~</span>
              </div>

              {/* Terminal Tabs */}
              <div className="flex items-center space-x-2">
                {[
                  { id: 'health', label: 'SYSTEM_HEALTH' },
                  { id: 'stack', label: 'TECH_MATRIX' },
                  { id: 'research', label: 'PUBLICATIONS' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { playClickSound(); setActiveTerminalTab(tab.id); }}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                      activeTerminalTab === tab.id
                        ? 'bg-yellow-400 text-black shadow'
                        : 'text-zinc-400 hover:text-white bg-zinc-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Tab Content */}
            {activeTerminalTab === 'health' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-zinc-300">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                  <p className="text-zinc-500 uppercase text-[10px]">Microservice Nodes</p>
                  <p className="text-white font-bold text-sm">6 Services Active</p>
                  <p className="text-emerald-400 text-[10px]">Zero Critical Defects</p>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                  <p className="text-zinc-500 uppercase text-[10px]">VIT Vellore CSE</p>
                  <p className="text-white font-bold text-sm">CGPA 7.87 / 10</p>
                  <p className="text-yellow-400 text-[10px]">Graduating May 2027</p>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                  <p className="text-zinc-500 uppercase text-[10px]">Cloud Latency</p>
                  <p className="text-white font-bold text-sm">&lt; 18ms Avg Response</p>
                  <p className="text-blue-400 text-[10px]">AWS ap-south-1 Deploy</p>
                </div>
              </div>
            )}

            {activeTerminalTab === 'stack' && (
              <div className="flex flex-wrap gap-2 text-[11px]">
                {['Java 21', 'Spring Boot 3', 'MongoDB', 'AWS EC2 / S3 / Lambda', 'Docker', 'FastAPI', 'OpenCV', 'React 19', 'Tailwind CSS', 'GSAP', 'JUnit 5', 'Mockito'].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-yellow-300/90 font-mono">
                    {item}
                  </span>
                ))}
              </div>
            )}

            {activeTerminalTab === 'research' && (
              <div className="space-y-2 text-zinc-300">
                <p className="text-yellow-400 font-bold">International vs. National Learning: Pros and Cons</p>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Published in the International Journal of Progressive Research in Engineering Management and Science (IJPREMS), Volume 04, Issue 04, April 2024.
                </p>
                <a 
                  href={personalInfo.socials.researchPaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-yellow-400 hover:underline pt-1"
                >
                  <span>View Full Published Paper (PDF / Web)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        )}
      </footer>
    </section>
  );
}
