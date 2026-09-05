import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { playHoverSound, playClickSound } from '../utils/soundEffects';
import { FolderOpen, ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsFolder() {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop 3D Folder Explosion ScrollTrigger
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1.2,
          }
        });

        // 1. Folder flap opening backwards (-130deg on hinge bottom center)
        tl.to(folderFrontRef.current, {
          rotationX: -130,
          transformOrigin: 'bottom center',
          ease: 'power2.inOut',
          duration: 1,
        })
        // 2. Project cards rise up out of the folder
        .to('.explosion-card', {
          y: -100,
          scale: 0.8,
          opacity: 1,
          stagger: 0.08,
          ease: 'power2.out',
          duration: 0.8,
        }, '-=0.4')
        // 3. Explosive 3D grid spread outward
        .to('.explosion-card-0', { x: -380, y: -190, rotationZ: -4, scale: 1, duration: 1.2, ease: 'back.out(1.2)' }, '-=0.2')
        .to('.explosion-card-1', { x: 0, y: -220, rotationZ: 2, scale: 1, duration: 1.2, ease: 'back.out(1.2)' }, '<')
        .to('.explosion-card-2', { x: 380, y: -190, rotationZ: 5, scale: 1, duration: 1.2, ease: 'back.out(1.2)' }, '<')
        .to('.explosion-card-3', { x: -380, y: 160, rotationZ: 3, scale: 1, duration: 1.2, ease: 'back.out(1.2)' }, '<')
        .to('.explosion-card-4', { x: 0, y: 190, rotationZ: -3, scale: 1, duration: 1.2, ease: 'back.out(1.2)' }, '<')
        .to('.explosion-card-5', { x: 380, y: 160, rotationZ: -5, scale: 1, duration: 1.2, ease: 'back.out(1.2)' }, '<');
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#f7f6f2] text-zinc-900 overflow-hidden flex flex-col justify-center select-none py-20 px-4"
    >
      {/* Ambient Yellow Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#f4c400]/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Background Watermark: MY WORK (22vw) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[20vw] font-display font-black tracking-tighter uppercase leading-none opacity-5 text-zinc-900 select-none">
          MY WORK
        </h2>
      </div>

      {/* Header Info */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mb-12 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-zinc-900 text-yellow-400 font-mono text-xs uppercase tracking-widest mb-3 shadow-md">
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Interactive Archive Folder System</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-zinc-900 uppercase">
          ENGINEERED <span className="text-stroke-black">PROJECTS</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto mt-2 font-sans">
          Scroll to unlock the physical archive and inspect high-throughput microservices, AI detection systems, and commerce platforms.
        </p>
      </div>

      {/* DESKTOP 3D FOLDER STAGE (Hidden on Mobile) */}
      <div className="hidden lg:flex relative z-10 w-full h-[620px] items-center justify-center [perspective:2000px]">
        
        {/* Physical Archive Folder Envelope Base */}
        <div className="relative w-[520px] h-[360px] preserve-3d">
          
          {/* Folder Back Cover */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#f4c400] to-[#e5b700] shadow-2xl border-2 border-yellow-500 flex flex-col justify-between p-8 text-black/90">
            <div className="flex justify-between items-center border-b border-black/15 pb-3">
              <span className="font-mono text-xs font-bold tracking-wider">PROJECT ARCHIVE // MANAN MAHAJAN</span>
              <span className="font-mono text-xs bg-black text-yellow-400 px-2.5 py-0.5 rounded-md font-bold">6 BLUEPRINTS</span>
            </div>
            <div className="text-center opacity-40">
              <p className="font-mono text-xs tracking-widest uppercase font-bold">Confidential Engineering Records</p>
              <p className="text-[10px] font-mono">VIT Vellore • 2023 - 2027</p>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span>SECURITY: HIGH</span>
              <span>SCROLL TO OPEN</span>
            </div>
          </div>

          {/* Cards Nesting Inside Folder */}
          <div ref={cardsContainerRef} className="absolute inset-0 flex items-center justify-center preserve-3d pointer-events-auto">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => { playClickSound(); setSelectedProject(proj); }}
                onMouseEnter={playHoverSound}
                className={`explosion-card explosion-card-${idx} absolute w-[340px] h-[210px] rounded-3xl bg-zinc-900 text-white p-5 border border-zinc-800 shadow-2xl cursor-pointer hover:border-yellow-400 hover:scale-105 transition-all duration-300 flex flex-col justify-between group`}
                style={{ 
                  zIndex: 20 + idx,
                  boxShadow: '0 20px 35px -10px rgba(0,0,0,0.5)',
                }}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span 
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase"
                      style={{ backgroundColor: proj.accentColor, color: '#fff' }}
                    >
                      {proj.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">{proj.tag}</span>
                  </div>
                  <h3 className="text-base font-bold font-display line-clamp-1 group-hover:text-yellow-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 font-sans">
                    {proj.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs font-mono">
                  <span className="text-yellow-400 text-[11px] font-bold flex items-center gap-1 group-hover:underline">
                    Inspect Architecture <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open GitHub Repository"
                      onClick={(e) => { e.stopPropagation(); playClickSound(); }}
                      className="p-1 hover:text-white hover:scale-110 transition-transform"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open Project / Repository"
                      onClick={(e) => { e.stopPropagation(); playClickSound(); }}
                      className="p-1 hover:text-yellow-400 hover:scale-110 transition-transform"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Folder Front Flap (Hinged at Bottom, opens -130deg) */}
          <div 
            ref={folderFrontRef}
            className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#f4c400] to-[#ffd736] shadow-xl border-t-2 border-yellow-300 flex flex-col justify-between p-8 text-black backface-hidden preserve-3d pointer-events-none"
            style={{ 
              transformOrigin: 'bottom center',
              zIndex: 40 
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-display font-black tracking-tight">MANAN'S WORK</h4>
                <p className="text-xs font-mono text-black/70">ARCHIVE DOSSIER • VIT CSE</p>
              </div>
              <Sparkles className="w-6 h-6 text-black/80" />
            </div>

            <div className="p-3 bg-black/10 rounded-2xl border border-black/10 backdrop-blur-sm text-center">
              <p className="text-xs font-mono font-bold tracking-wider">▲ PHYSICAL ARCHIVE FLAP ▲</p>
              <p className="text-[10px] text-black/70 font-mono">Hinged 3D Opening System</p>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE SNAP CAROUSEL (Visible on Small / Tablet screens) */}
      <div className="lg:hidden relative z-10 w-full overflow-x-auto pb-6 pt-2 flex gap-4 snap-x snap-mandatory px-4 no-scrollbar">
        {projects.map((proj) => (
          <div
            key={`mobile-${proj.id}`}
            onClick={() => { playClickSound(); setSelectedProject(proj); }}
            className="shrink-0 w-[85vw] max-w-[340px] snap-center p-6 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span 
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase text-white"
                  style={{ backgroundColor: proj.accentColor }}
                >
                  {proj.category}
                </span>
                <span className="text-xs font-mono text-zinc-400">{proj.tag}</span>
              </div>
              <h3 className="text-lg font-bold font-display mb-2">{proj.title}</h3>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-4">{proj.summary}</p>
            </div>

            <button
              onClick={() => setSelectedProject(proj)}
              className="w-full py-2.5 rounded-xl bg-yellow-400 text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-2"
            >
              <span>View Specifications</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Detailed Modal Popup */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
