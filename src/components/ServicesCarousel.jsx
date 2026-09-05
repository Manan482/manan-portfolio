import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/portfolioData';
import { playHoverSound, playClickSound } from '../utils/soundEffects';
import { Layers, ArrowRight, CheckCircle, Sparkles, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: 3D Half-Circle Curved Orbit pinned along 500% scroll distance
      mm.add("(min-width: 1024px)", () => {
        const totalCards = services.length;
        const radius = 550; // curve radius
        const angleStep = 0.45; // angle increment between cards in radians

        // Custom object to tween progress from 0 to totalCards - 1
        const progressObj = { progress: 0 };

        const updateCardPositions = (currentProgress) => {
          const nearestIndex = Math.round(currentProgress);
          setActiveIndex(Math.max(0, Math.min(totalCards - 1, nearestIndex)));

          cardsRef.current.forEach((card, idx) => {
            if (!card) return;
            const offset = idx - currentProgress;
            const angle = offset * angleStep;

            // Mathematical curve formula as mandated by Document1(1)
            const x = Math.sin(angle) * radius;
            const y = (radius - Math.cos(angle) * radius) * 0.35;
            const z = -Math.abs(offset) * 80;
            const rotationZ = (angle * 180) / Math.PI * 0.75;
            const scale = Math.max(0.65, 1 - Math.abs(offset) * 0.15);
            const opacity = Math.max(0.15, 1 - Math.abs(offset) * 0.3);

            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              rotationZ: rotationZ,
              scale: scale,
              opacity: opacity,
              zIndex: Math.round(100 - Math.abs(offset) * 10),
            });
          });
        };

        // ScrollTrigger pinned timeline
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            progressObj.progress = self.progress * (totalCards - 1);
            updateCardPositions(progressObj.progress);
          },
        });

        // Initialize positions
        updateCardPositions(0);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeService = services[activeIndex] || services[0];

  return (
    <section 
      id="services"
      ref={containerRef}
      className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden flex flex-col justify-center select-none py-20 px-6 transition-colors duration-700"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, ${activeService.color}15 0%, rgba(9,9,11,1) 75%)`
      }}
    >
      {/* Dynamic Background Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-25 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeService.color }}
      />

      {/* Massive Outlined Background Typography: "SERVICES" 18vw */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h2 className="text-[18vw] font-display font-black tracking-tighter uppercase leading-none text-stroke-dark select-none mix-blend-overlay">
          SERVICES
        </h2>
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-yellow-400 font-mono text-xs uppercase tracking-widest mb-3 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curved 3D Kinetic Section</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
          ENGINEERING <span className="text-stroke-white">SERVICES</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mt-2 font-sans">
          Horizontal 3D curved trajectory showcasing end-to-end capabilities from enterprise Java backend to AI pipelines.
        </p>
      </div>

      {/* DESKTOP 3D CURVED CAROUSEL STAGE */}
      <div className="hidden lg:flex relative z-10 w-full h-[580px] items-center justify-center [perspective:1000px] preserve-3d">
        {services.map((service, idx) => (
          <div
            key={service.id}
            ref={(el) => (cardsRef.current[idx] = el)}
            onMouseEnter={playHoverSound}
            onClick={() => playClickSound()}
            className="absolute w-[420px] h-[540px] rounded-[30px] p-8 border border-white/15 backdrop-blur-2xl shadow-2xl transition-all duration-300 flex flex-col justify-between group preserve-3d"
            style={{
              backgroundColor: 'rgba(18, 18, 24, 0.85)',
              boxShadow: `0 25px 50px -12px ${service.color}35`,
            }}
          >
            {/* Top Card Bar */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span 
                  className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-black"
                  style={{ backgroundColor: service.color }}
                >
                  {service.tag}
                </span>
                <span className="text-xs font-mono text-zinc-500">0{idx + 1} / 0{services.length}</span>
              </div>

              <h3 className="text-2xl font-bold font-display tracking-tight text-white group-hover:text-yellow-400 transition-colors mb-4">
                {service.title}
              </h3>

              <p className="text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                {service.description || service.summary}
              </p>

              {/* Feature Points */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                {(service.points || service.deliverables || []).map((pt, i) => (
                  <div key={i} className="flex items-center space-x-2.5 text-xs text-zinc-300 font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Card CTA */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-yellow-400 transition-colors"
              >
                <span>Inquire for Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div 
                className="w-3 h-3 rounded-full animate-pulse" 
                style={{ backgroundColor: service.color }} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE SNAP SLIDER (Visible on Mobile / Tablet) */}
      <div className="lg:hidden relative z-10 w-full overflow-x-auto pb-6 flex gap-4 snap-x snap-mandatory px-4 no-scrollbar">
        {services.map((service, idx) => (
          <div
            key={`mob-${service.id}`}
            className="shrink-0 w-[85vw] max-w-[360px] snap-center p-7 rounded-[30px] bg-zinc-900/90 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase text-black"
                  style={{ backgroundColor: service.color }}
                >
                  {service.tag}
                </span>
                <span className="text-xs font-mono text-zinc-500">0{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">{service.title}</h3>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-4">{service.description}</p>
              
              <div className="space-y-2 pt-3 border-t border-white/10">
                {service.points.map((pt, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-zinc-300 font-mono">
                    <CheckCircle className="w-3 h-3 text-yellow-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="mt-6 w-full py-3 rounded-xl bg-yellow-400 text-black font-bold uppercase text-xs tracking-wider text-center flex items-center justify-center space-x-2"
            >
              <span>Contact Regarding {service.tag}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

      {/* Progress Dots Indicator */}
      <div className="hidden lg:flex relative z-10 justify-center items-center space-x-2 mt-8">
        {services.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-8 bg-yellow-400' : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
