import React from 'react';
import { 
  educationList, 
  certifications, 
  technicalSkills, 
  personalInfo 
} from '../data/portfolioData';
import { playHoverSound } from '../utils/soundEffects';
import { 
  GraduationCap, 
  Award, 
  Code2, 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Terminal,
  Server,
  Cloud,
  Database
} from 'lucide-react';

export default function ResumeOverview() {
  const categoryIcons = {
    "Languages": Code2,
    "Frameworks & Backend": Server,
    "Cloud & DevOps": Cloud,
    "Databases & Architecture": Database,
    "Core Engineering": Terminal,
  };

  return (
    <section id="foundation" className="relative w-full bg-zinc-950 text-white py-24 px-6 sm:px-12 lg:px-20 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curriculum Vitae & Core Competencies</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase">
            ENGINEERING <span className="text-stroke-white">FOUNDATION</span>
          </h2>
          <p className="text-zinc-400 font-sans text-sm sm:text-base max-w-xl mx-auto">
            Comprehensive breakdown of academic performance, professional certifications, and technical proficiencies.
          </p>
        </div>

        {/* Technical Skills Matrix */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <Code2 className="w-6 h-6 text-yellow-400" />
            <h3 className="text-2xl font-display font-bold">Technical Stack & Domain Mastery</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSkills.map((category) => {
              const Icon = categoryIcons[category.category] || Code2;
              return (
                <div
                  key={category.category}
                  onMouseEnter={playHoverSound}
                  className="p-6 rounded-3xl bg-zinc-900/70 border border-white/10 hover:border-yellow-400/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/5 group"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold font-display text-white">{category.category}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-white/5 text-xs font-mono text-zinc-300 hover:text-white hover:border-yellow-400/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education & Certifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Education Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
              <GraduationCap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-display font-bold">Academic Journey</h3>
            </div>

            <div className="space-y-4">
              {educationList.map((edu, idx) => (
                <div
                  key={idx}
                  onMouseEnter={playHoverSound}
                  className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/25 transition-all duration-300 relative group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="text-lg font-bold font-display text-white group-hover:text-yellow-400 transition-colors">
                      {edu.institution}
                    </h4>
                    <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-mono text-yellow-400 border border-yellow-400/20 w-fit">
                      {edu.score}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 font-sans mb-1 font-medium">{edu.degree}</p>
                  
                  <div className="flex items-center space-x-4 text-xs font-mono text-zinc-500 mb-3">
                    <span>{edu.period}</span>
                    <span>•</span>
                    <span>{edu.location}</span>
                  </div>

                  {edu.highlights && (
                    <ul className="space-y-1 text-xs text-zinc-400 font-sans">
                      {(Array.isArray(edu.highlights) ? edu.highlights : [edu.highlights]).map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Publications Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
              <Award className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-display font-bold">Credentials & Publications</h3>
            </div>

            <div className="space-y-4">
              {/* Certifications */}
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  onMouseEnter={playHoverSound}
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-xs font-mono"
                      style={{ backgroundColor: cert.badgeColor }}
                    >
                      {cert.issuer.substring(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                      <p className="text-xs text-zinc-400 font-mono">Issued by {cert.issuer}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              ))}

              {/* Research Publication Card */}
              <div 
                onMouseEnter={playHoverSound}
                className="p-6 rounded-3xl bg-gradient-to-br from-yellow-950/30 via-zinc-900/80 to-zinc-900 border border-yellow-400/30 transition-all hover:border-yellow-400/60"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-yellow-400 text-xs font-mono uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    <span>Peer-Reviewed Publication</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">IJPREMS</span>
                </div>

                <h4 className="text-base font-bold font-display text-white mb-2">
                  "International vs. National Learning: Pros and Cons"
                </h4>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-4">
                  Published in the International Journal of Progressive Research in Engineering, Management and Science, investigating pedagogical technology architectures.
                </p>

                <a
                  href={personalInfo.socials.researchPaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-yellow-400 hover:text-yellow-300"
                >
                  <span>Read Paper Archive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Problem Solving & DSA Focus */}
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/10 text-xs font-sans text-zinc-400 leading-relaxed">
                <span className="font-bold text-white block mb-1 font-mono uppercase tracking-wider">Algorithmic Excellence:</span>
                Rigorous training in <span className="text-yellow-400 font-semibold">Data Structures & Algorithms</span>, Object-Oriented Design, and System Architecture with modern Java and C++.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
