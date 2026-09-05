import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Terminal, Cpu, Cloud, Layers, Compass, ArrowRight } from 'lucide-react';
import { playHoverSound } from '../utils/soundEffects';

gsap.registerPlugin(ScrollTrigger);

export default function Welcome() {
  const containerRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const visionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned transition between Screen 1 (Welcome) and Screen 2 (Vision & Engineering Pillars)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1,
        },
      });

      // Screen 1: Welcome typography scaling & fading
      tl.to(welcomeTextRef.current, {
        scale: 1.4,
        opacity: 0.04,
        ease: 'power2.inOut',
      })
      // Screen 2: Engineering Vision sliding in smoothly
      .fromTo(
        visionRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const engineeringPillars = [
    {
      icon: Terminal,
      title: "Distributed Microservices",
      tag: "Backend & Systems",
      desc: "Architecting high-throughput, fault-tolerant financial and enterprise backends in Java & Spring Boot with rigorous unit testing.",
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
    },
    {
      icon: Cpu,
      title: "Computer Vision & AI",
      tag: "Intelligence & ML",
      desc: "Deploying real-time video surveillance CNNs with 85% accuracy and automated OCR engagement analysis via FastAPI.",
      color: "border-blue-500/30 text-blue-400 bg-blue-500/10"
    },
    {
      icon: Cloud,
      title: "Cloud Native & DevOps",
      tag: "AWS & Orchestration",
      desc: "Dockerized containerization, Kubernetes scaling, and automated GitHub Actions CI/CD deploying to AWS EC2, S3, and Lambda.",
      color: "border-purple-500/30 text-purple-400 bg-purple-500/10"
    },
    {
      icon: Layers,
      title: "Cinematic UI Engineering",
      tag: "Frontend Motion",
      desc: "Crafting Awwwards-inspired digital web experiences with GSAP physics, 3D math transformations, and buttery Lenis smooth scroll.",
      color: "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
    }
  ];

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white overflow-hidden flex flex-col justify-center select-none py-16"
    >
      {/* Background Noise & Lighting */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[180px] pointer-events-none" />

      {/* SCREEN 1: Massive Welcome Typography Watermark */}
      <div 
        ref={welcomeTextRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 px-4 text-center"
      >
        <span className="text-xs sm:text-sm font-mono tracking-[0.4em] uppercase text-yellow-400 mb-2 font-semibold">
          To My Engineering Universe
        </span>
        <h2 className="text-[20vw] sm:text-[24vw] font-display font-black tracking-tighter uppercase leading-none opacity-15 text-white select-none">
          WELCOME
        </h2>
        <p className="text-sm sm:text-base font-sans text-zinc-400 max-w-lg mt-2 opacity-60">
          Where robust microservice architectures meet award-winning creative interfaces
        </p>
      </div>

      {/* SCREEN 2: Core Engineering Pillars Stage */}
      <div 
        ref={visionRef}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center space-y-8 px-4 sm:px-6"
      >
        {/* Header */}
        <div className="text-center space-y-2 border-b border-white/10 pb-6">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-yellow-400">
            <Compass className="w-3.5 h-3.5" />
            <span>Architecture & Craft</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
            ENGINEERING <span className="text-stroke-white">PILLARS</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-lg mx-auto">
            Disciplined software engineering principles applied across modern enterprise stacks and intelligent platforms.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {engineeringPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="p-7 rounded-3xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-white/10 hover:border-yellow-400/40 backdrop-blur-xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl border ${pillar.color} transition-transform group-hover:scale-110`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full border border-white/5">
                      {pillar.tag}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-display text-white group-hover:text-yellow-400 transition-colors mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-yellow-400 transition-colors">
                  <span>CORE COMPETENCY 0{idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
