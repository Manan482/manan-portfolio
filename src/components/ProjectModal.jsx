import React from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';
import { playClickSound } from '../utils/soundEffects';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl bg-zinc-900 border border-white/20 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div 
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: project.accentColor || '#f4c400' }}
        />

        {/* Close button */}
        <button 
          onClick={() => { playClickSound(); onClose(); }}
          className="absolute top-6 right-6 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Category Pill */}
        <div className="flex items-center space-x-2 mb-3">
          <span 
            className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-black"
            style={{ backgroundColor: project.accentColor || '#f4c400' }}
          >
            {project.category}
          </span>
          <span className="text-xs font-mono text-zinc-400">{project.tag}</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-display font-extrabold tracking-tight mb-4">
          {project.title}
        </h2>

        {/* Highlight Banner */}
        <div className="p-4 rounded-2xl bg-zinc-800/80 border border-white/10 mb-6 flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm font-mono text-zinc-200">{project.highlight}</p>
        </div>

        {/* Full Description */}
        <div className="space-y-4 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed mb-6">
          <p>{project.description}</p>
        </div>

        {/* Tech Stack Badges */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-yellow-400" /> Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span 
                key={t}
                className="px-3 py-1 rounded-lg bg-zinc-800 border border-white/10 text-xs font-mono text-zinc-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="flex-1 py-3 px-5 rounded-xl bg-white text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-2 hover:bg-zinc-200 transition-colors shadow-lg"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="flex-1 py-3 px-5 rounded-xl bg-yellow-400 text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-2 hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
