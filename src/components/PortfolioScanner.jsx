import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound, playClickSound, playScannerSound } from '../utils/soundEffects';
import { 
  Scan, 
  Compass, 
  Sparkles, 
  Eye, 
  Activity, 
  Crosshair,
  Maximize2,
  Play,
  Pause,
  Radio,
  Cpu,
  Server,
  Database,
  Cloud,
  Layers,
  Zap,
  Network
} from 'lucide-react';

const PALETTE = [
  { name: 'yellow', label: 'Solar Gold', hex: '#f4c400', accent: '#3b82f6', wavelength: '580nm' },
  { name: 'red', label: 'Cyber Red', hex: '#dc2626', accent: '#38bdf8', wavelength: '650nm' },
  { name: 'green', label: 'Emerald Tech', hex: '#059669', accent: '#f59e0b', wavelength: '520nm' },
  { name: 'purple', label: 'Neon Violet', hex: '#7c3aed', accent: '#10b981', wavelength: '410nm' },
  { name: 'rose', label: 'Hot Rose', hex: '#e11d48', accent: '#60a5fa', wavelength: '620nm' },
  { name: 'orange', label: 'Vibrant Orange', hex: '#ea580c', accent: '#818cf8', wavelength: '600nm' },
];

const SCAN_MODES = [
  { id: 'hd', label: 'Crystal HD', icon: Eye, description: 'Direct unblurred optical reveal' },
  { id: 'cyber', label: 'Cyber Matrix', icon: Activity, description: 'High-contrast chromatic HUD' },
  { id: 'biometric', label: 'Neural Mesh', icon: Crosshair, description: 'Biometric telemetry & feature detection' },
];

export default function PortfolioScanner() {
  const [colorIndex, setColorIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [activeMode, setActiveMode] = useState('hd');
  const [apertureSize, setApertureSize] = useState(280);
  const [isHovered, setIsHovered] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState('CALM_STANCE // SDE ARCHITECT');
  const [stageDimensions, setStageDimensions] = useState({ width: 420, height: 560 });

  const currentColor = PALETTE[colorIndex];

  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const bgTextRef = useRef(null);
  const canvasRef = useRef(null);
  const circuitRef = useRef(null);

  // Parallax background mouse tracking
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });

  // Smooth lerp coordinates for laggy buttery smooth motion
  const targetPos = useRef({ x: 210, y: 280 });
  const currentPos = useRef({ x: 210, y: 280 });
  const animFrameId = useRef(null);

  const [coords, setCoords] = useState({ x: 210, y: 280 });

  // 1. Autonomous Spectrum Transition Timer (Cycles every 4.2 seconds)
  useEffect(() => {
    if (!isAutoCycling) return;

    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % PALETTE.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isAutoCycling]);

  // Smooth background color morphing with GSAP
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      backgroundColor: PALETTE[colorIndex].hex,
      duration: 1.4,
      ease: 'power2.inOut',
    });
  }, [colorIndex]);

  // 2. Heavyweight 60fps Cyber Particle & Radar Sweep Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = 55;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.75,
      vy: (Math.random() - 0.5) * 0.75,
      radius: Math.random() * 2 + 1.2,
      pulse: Math.random() * Math.PI,
    }));

    let radarAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // A. Draw sweeping radar cone from center
      radarAngle += 0.015;
      const centerX = width / 2;
      const centerY = height / 2;
      const radarRadius = Math.max(width, height) * 0.6;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radarRadius, radarAngle - 0.35, radarAngle);
      ctx.closePath();
      const radarGrad = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, radarRadius);
      radarGrad.addColorStop(0, 'rgba(0, 0, 0, 0.08)');
      radarGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radarGrad;
      ctx.fill();
      ctx.restore();

      // B. Draw particle connection links
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.pulse += 0.03;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 145) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.16 * (1 - dist / 145)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // C. Draw particle nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        const r = p.radius + Math.sin(p.pulse) * 0.5;
        ctx.arc(p.x, p.y, Math.max(0.5, r), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 3. Update stage dimensions dynamically
  useEffect(() => {
    const updateSize = () => {
      if (stageRef.current) {
        const w = stageRef.current.offsetWidth || 420;
        const h = stageRef.current.offsetHeight || 560;
        setStageDimensions({ width: w, height: h });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // 4. Buttery-smooth laggy physics loop using lerp (factor 0.14)
  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const renderLoop = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.14);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.14);

      setCoords({
        x: Math.round(currentPos.current.x),
        y: Math.round(currentPos.current.y),
      });

      const curY = currentPos.current.y;
      if (curY < 180) {
        setBiometricStatus('OPTIC_RECOGNISED // VIT CSE');
      } else if (curY < 360) {
        setBiometricStatus('CORE_ENGINE // JAVA • SPRING • AWS');
      } else {
        setBiometricStatus('CALM_STANCE // SDE ARCHITECT');
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animFrameId.current);
  }, []);

  const handleGlobalMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 30;
    const y = (e.clientY - innerHeight / 2) / 30;
    setBgOffset({ x, y });
  };

  const updateTargetFromPointer = (clientX, clientY) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    targetPos.current = {
      x: Math.max(0, Math.min(rect.width, x)),
      y: Math.max(0, Math.min(rect.height, y)),
    };
  };

  const handleStageMouseMove = (e) => {
    updateTargetFromPointer(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (!e.touches[0]) return;
    updateTargetFromPointer(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleManualColorSelect = (index) => {
    playClickSound();
    setColorIndex(index);
  };

  const toggleAutoCycle = () => {
    playClickSound();
    setIsAutoCycling(!isAutoCycling);
  };

  const halfAperture = apertureSize / 2;

  const clipTop = Math.max(0, coords.y - halfAperture);
  const clipBottom = Math.max(0, stageDimensions.height - (coords.y + halfAperture));
  const clipLeft = Math.max(0, coords.x - halfAperture);
  const clipRight = Math.max(0, stageDimensions.width - (coords.x + halfAperture));

  const clipPathStyle = {
    clipPath: `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round 24px)`,
    WebkitClipPath: `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round 24px)`,
  };

  return (
    <section 
      id="portfolio-scanner"
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      style={{ backgroundColor: currentColor.hex }}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center transition-colors duration-1000 select-none py-16 px-4"
    >
      {/* ============================================================ */}
      {/* HEAVYWEIGHT BACKGROUND LAYER 1: Dynamic Aurora Light Orbs    */}
      {/* ============================================================ */}
      <div 
        className="absolute top-1/4 -left-28 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full blur-[140px] opacity-45 pointer-events-none transition-all duration-1000 animate-float-slow"
        style={{ backgroundColor: currentColor.accent }}
      />
      <div 
        className="absolute bottom-1/4 -right-28 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full blur-[160px] opacity-35 pointer-events-none transition-all duration-1000 animate-pulse-glow"
        style={{ backgroundColor: '#ffffff' }}
      />

      {/* ============================================================ */}
      {/* HEAVYWEIGHT BACKGROUND LAYER 2: 3D Holographic Radar Rings   */}
      {/* ============================================================ */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-bgOffset.x * 0.8}px, ${-bgOffset.y * 0.8}px, 0)`,
        }}
      >
        <div className="w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full border border-black/15 flex items-center justify-center animate-spin" style={{ animationDuration: '45s' }}>
          <div className="w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-black/20 flex items-center justify-center animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
            <div className="w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] rounded-full border border-black/15" />
          </div>
        </div>

        {/* Radar Crosshairs & Compass Degrees */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-black/10 to-transparent" />
          
          <span className="absolute top-12 font-mono text-[10px] text-black/30 font-bold tracking-widest">NORTH // 000°</span>
          <span className="absolute bottom-12 font-mono text-[10px] text-black/30 font-bold tracking-widest">SOUTH // 180°</span>
          <span className="absolute left-8 font-mono text-[10px] text-black/30 font-bold tracking-widest -rotate-90">WEST // 270°</span>
          <span className="absolute right-8 font-mono text-[10px] text-black/30 font-bold tracking-widest rotate-90">EAST // 090°</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* HEAVYWEIGHT BACKGROUND LAYER 3: Animated Circuit PCB Traces  */}
      {/* ============================================================ */}
      <svg 
        ref={circuitRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Left Circuit Bus */}
        <path d="M 0 120 L 180 120 L 260 200 L 400 200" fill="none" stroke="black" strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx="400" cy="200" r="4" fill="black" />
        <path d="M 180 120 L 220 80 L 380 80" fill="none" stroke="black" strokeWidth="1" />
        <circle cx="380" cy="80" r="3" fill="black" />

        {/* Top Right Circuit Bus */}
        <path d="M 1200 140 L 980 140 L 900 220 L 780 220" fill="none" stroke="black" strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx="780" cy="220" r="4" fill="black" />
        
        {/* Bottom Left Circuit Bus */}
        <path d="M 0 680 L 220 680 L 300 600 L 440 600" fill="none" stroke="black" strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx="440" cy="600" r="4" fill="black" />

        {/* Bottom Right Circuit Bus */}
        <path d="M 1200 650 L 1020 650 L 920 550 L 800 550" fill="none" stroke="black" strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx="800" cy="550" r="4" fill="black" />
      </svg>

      {/* ============================================================ */}
      {/* HEAVYWEIGHT BACKGROUND LAYER 4: Microservice Blueprint Nodes  */}
      {/* ============================================================ */}
      <div 
        className="hidden xl:flex absolute inset-0 pointer-events-none z-0 items-center justify-between px-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${bgOffset.x * 0.6}px, ${bgOffset.y * 0.6}px, 0)`,
        }}
      >
        {/* Left Floating Architecture Topology Node */}
        <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-black/10 border border-black/15 backdrop-blur-sm text-black font-mono text-[10px] max-w-[210px]">
          <div className="flex items-center space-x-1.5 font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>SPRING BOOT CLUSTER</span>
          </div>
          <p className="text-black/70 text-[9px] leading-tight">
            Java 21 JVM Heap // 14ms Latency • Automated CI/CD Docker Container
          </p>
          <div className="flex items-center justify-between text-black/90 font-bold border-t border-black/10 pt-1">
            <span>PORT: 8080</span>
            <span className="text-emerald-800">● 99.99% UP</span>
          </div>
        </div>

        {/* Right Floating Architecture Topology Node */}
        <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-black/10 border border-black/15 backdrop-blur-sm text-black font-mono text-[10px] max-w-[210px]">
          <div className="flex items-center space-x-1.5 font-bold">
            <Cloud className="w-3.5 h-3.5" />
            <span>AWS CLOUD INFRA</span>
          </div>
          <p className="text-black/70 text-[9px] leading-tight">
            EC2 Instance • S3 Bucket Assets • MongoDB High-Throughput Sharding
          </p>
          <div className="flex items-center justify-between text-black/90 font-bold border-t border-black/10 pt-1">
            <span>REGION: AP-SOUTH-1</span>
            <span className="text-emerald-800">● HEALTHY</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* HEAVYWEIGHT BACKGROUND LAYER 5: 60fps Kinetic Equalizer Bars */}
      {/* ============================================================ */}
      <div className="absolute bottom-4 left-0 right-0 flex items-end justify-center gap-1 sm:gap-1.5 pointer-events-none z-0 h-16 opacity-30 px-6">
        {Array.from({ length: 48 }).map((_, i) => (
          <div 
            key={i}
            className="w-1 sm:w-1.5 bg-black rounded-t transition-all duration-300"
            style={{
              height: `${Math.sin(i * 0.4 + (coords.x / 40)) * 25 + 32}px`,
              opacity: (i % 2 === 0 ? 0.9 : 0.6),
            }}
          />
        ))}
      </div>

      {/* ============================================================ */}
      {/* BACKGROUND LAYER 6: Interactive Cyber Matrix Canvas          */}
      {/* ============================================================ */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
      />

      {/* ============================================================ */}
      {/* BACKGROUND LAYER 7: 18vw "PORTFOLIO" Typography              */}
      {/* ============================================================ */}
      <div 
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${bgOffset.x * 1.2}px, ${bgOffset.y * 1.2}px, 0)`,
        }}
      >
        <h1 className="text-[17vw] font-display font-black tracking-tighter uppercase leading-none opacity-20 text-black flex items-center select-none drop-shadow-sm">
          <span>P</span>
          <span className="text-stroke-black">O</span>
          <span>R</span>
          <span>T</span>
          <span>F</span>
          <span className="text-stroke-black">O</span>
          <span>L</span>
          <span>I</span>
          <span className="text-stroke-black">O</span>
        </h1>
      </div>

      {/* ============================================================ */}
      {/* TOP TELEMETRY HUD WITH AUTO-CYCLE BEACON                     */}
      {/* ============================================================ */}
      <div className="relative z-20 w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        
        {/* Left: Engine & Aperture Pill */}
        <div className="flex items-center space-x-2.5 bg-black/75 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-white shadow-2xl">
          <Scan className="w-4 h-4 text-blue-400 animate-spin" />
          <span className="font-bold text-yellow-400">PORTFOLIO SCANNER</span>
          <span className="text-zinc-500">|</span>
          <span className="text-zinc-300 font-bold">{apertureSize}PX APERTURE</span>
        </div>

        {/* Center: Autonomous Spectrum Pulse Beacon */}
        <button
          onClick={toggleAutoCycle}
          onMouseEnter={playHoverSound}
          title={isAutoCycling ? 'Pause Spectrum Auto-Shift' : 'Resume Spectrum Auto-Shift'}
          className="flex items-center space-x-2 bg-black/80 hover:bg-black backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono transition-all shadow-xl hover:scale-105 group"
        >
          <span className="relative flex h-2.5 w-2.5">
            {isAutoCycling && (
              <span 
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: currentColor.hex }}
              />
            )}
            <span 
              className="relative inline-flex rounded-full h-2.5 w-2.5 shadow-sm"
              style={{ backgroundColor: isAutoCycling ? '#22c55e' : '#eab308' }}
            />
          </span>

          <span className="text-white font-semibold">
            {isAutoCycling ? 'AUTO-SPECTRUM: ACTIVE' : 'SPECTRUM: PAUSED'}
          </span>
          <span className="text-zinc-500 font-normal">({currentColor.label})</span>

          {isAutoCycling ? (
            <Pause className="w-3 h-3 text-zinc-400 group-hover:text-white" />
          ) : (
            <Play className="w-3 h-3 text-zinc-400 group-hover:text-white" />
          )}
        </button>

        {/* Right: Coordinates & Telemetry */}
        <div className="hidden sm:flex items-center space-x-2 bg-black/75 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-white shadow-2xl">
          <Compass className="w-4 h-4 text-yellow-400" />
          <span className="text-zinc-400">COORDS:</span>
          <span className="text-blue-400 font-bold">X[{coords.x}] Y[{coords.y}]</span>
          <span className="text-zinc-500">|</span>
          <span className="text-emerald-400 font-semibold">{biometricStatus}</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN SCANNER STAGE CONTAINER                                 */}
      {/* ============================================================ */}
      <div 
        ref={stageRef}
        onMouseMove={handleStageMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={() => { setIsHovered(true); playScannerSound(); }}
        onMouseEnter={() => { setIsHovered(true); playScannerSound(); }}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 w-[300px] sm:w-[420px] h-[450px] sm:h-[560px] rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] border-2 border-black/30 bg-zinc-950 cursor-crosshair group transition-transform duration-300 hover:scale-[1.01]"
      >
        {/* ============================================================ */}
        {/* LAYER 1: BASE LAYER (Heavily Blurred, Dimmed, Frosted Glass) */}
        {/* ============================================================ */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={personalInfo.images.topAngle} 
            alt="Manan Mahajan Blurred Target" 
            className="w-full h-full object-cover filter blur-[9px] brightness-75 contrast-125 transition-all duration-300"
          />
          {/* Frosted Blueprint Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Idle Scanning Instructions when cursor is not active */}
          {!isHovered && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
              <div className="p-4 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-yellow-400 animate-bounce mb-3 shadow-lg">
                <Crosshair className="w-8 h-8" />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-yellow-400 font-bold bg-black/80 px-3.5 py-1 rounded-full mb-1">
                Move Cursor Over Frame to Scan
              </p>
              <p className="text-xs text-zinc-300 font-sans max-w-xs">
                The 280px high-tech lens will pierce through the blur to inspect photographic details
              </p>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* LAYER 2: SHARP REVEAL LAYER (Dynamic clipPath follow lens)    */}
        {/* ============================================================ */}
        <div 
          style={clipPathStyle}
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none transition-all duration-75"
        >
          <img 
            src={personalInfo.images.topAngle} 
            alt="Manan Mahajan Sharp Reveal" 
            className="w-full h-full object-cover filter brightness-105 contrast-110"
          />

          {/* Mode-specific filters */}
          {activeMode === 'cyber' && (
            <div className="absolute inset-0 bg-blue-500/15 mix-blend-color-dodge pointer-events-none" />
          )}

          {activeMode === 'biometric' && (
            <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay pointer-events-none" />
          )}

          {/* Precision Scan Grid inside the active lens */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.15)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        </div>

        {/* ============================================================ */}
        {/* LAYER 3: MARCHING ANTS FRAME & CORNER BRACKETS HUD           */}
        {/* ============================================================ */}
        <div 
          className="absolute z-20 pointer-events-none transition-opacity duration-200"
          style={{
            width: `${apertureSize}px`,
            height: `${apertureSize}px`,
            left: `${coords.x - halfAperture}px`,
            top: `${coords.y - halfAperture}px`,
            opacity: isHovered ? 1 : 0.45,
          }}
        >
          {/* Animated Marching Ants Border */}
          <div className="absolute inset-0 rounded-3xl marching-ants-border shadow-[0_0_35px_rgba(59,130,246,0.6)]" />

          {/* 4 Precision Corner Brackets */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-blue-400" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-blue-400" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-blue-400" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-blue-400" />

          {/* Center Target Reticle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border border-blue-400/40 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
            </div>
          </div>

          {/* Top Aperture Status Tag */}
          <div className="absolute top-2 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-blue-200 bg-black/80 px-2 py-0.5 rounded-md backdrop-blur-sm border border-blue-400/30">
            <span className="font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LENS: 100% SHARP
            </span>
            <span className="text-yellow-400 uppercase font-bold">{activeMode}</span>
          </div>

          {/* Bottom Aperture Metadata */}
          <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-zinc-300 bg-black/80 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
            <span>MAG: 1.05X</span>
            <span className="text-blue-400 font-bold truncate max-w-[120px]">{biometricStatus}</span>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* SCANNER CONTROL CONSOLE (Modes, Aperture Size & Colors)       */}
      {/* ============================================================ */}
      <div className="relative z-20 mt-8 flex flex-col items-center gap-4 max-w-2xl w-full">
        
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3 p-2.5 rounded-2xl bg-black/75 backdrop-blur-2xl border border-white/15 shadow-2xl">
          
          {/* Scan Mode Switchers */}
          <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-white/10">
            {SCAN_MODES.map((mode) => {
              const Icon = mode.icon;
              const isSelected = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => { playClickSound(); setActiveMode(mode.id); }}
                  onMouseEnter={playHoverSound}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                    isSelected 
                      ? 'bg-yellow-400 text-black shadow-md' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={mode.description}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Aperture Size Switchers */}
          <div className="flex items-center gap-1.5 bg-zinc-900/90 px-3 py-1 rounded-xl border border-white/10 text-xs font-mono text-zinc-300">
            <span className="text-zinc-500 font-bold uppercase text-[10px]">Aperture:</span>
            {[220, 280, 340].map((size) => (
              <button
                key={size}
                onClick={() => { playClickSound(); setApertureSize(size); }}
                onMouseEnter={playHoverSound}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  apertureSize === size 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {size}px
              </button>
            ))}
          </div>

        </div>

        {/* Color Spectrum Theme Switcher with Auto-Cycle Progress Indicator */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-mono uppercase tracking-widest text-black/80 font-bold bg-white/40 px-3.5 py-0.5 rounded-full backdrop-blur-md">
              Spectrum Theme // {currentColor.label} ({currentColor.wavelength})
            </p>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-full bg-black/75 backdrop-blur-xl border border-white/20 shadow-2xl">
            {PALETTE.map((p, idx) => {
              const isSelected = colorIndex === idx;
              return (
                <button
                  key={p.name}
                  onClick={() => handleManualColorSelect(idx)}
                  onMouseEnter={playHoverSound}
                  title={`${p.label} - Click to switch`}
                  className={`relative group w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 transform ${
                    isSelected ? 'scale-125 ring-2 ring-white shadow-xl z-20' : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: p.hex }}
                >
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white shadow-md animate-pulse" />
                  )}
                  <span className="absolute -bottom-8 px-2 py-0.5 bg-black/90 text-[10px] text-white font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
