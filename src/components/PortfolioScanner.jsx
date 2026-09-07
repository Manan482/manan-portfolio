import React, { useState, useEffect, useRef } from 'react';
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
  Cpu, 
  Cloud, 
  Radio,
  Layers,
  Zap,
  ShieldCheck
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
  { id: 'cyber', label: 'Cyber Matrix', icon: Activity, description: 'High-contrast chromatic HUD & scanlines' },
  { id: 'biometric', label: 'Neural Mesh', icon: Crosshair, description: 'Biometric telemetry & feature detection' },
];

export default function PortfolioScanner() {
  const [colorIndex, setColorIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [activeMode, setActiveMode] = useState('hd');
  const [apertureSize, setApertureSize] = useState(280);
  const [isHovered, setIsHovered] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState('AUTONOMOUS SCAN // DIAGNOSTIC ACTIVE');
  const [coordsDisplay, setCoordsDisplay] = useState({ x: 210, y: 240 });
  const [stageSize, setStageSize] = useState({ width: 420, height: 560 });

  const currentColor = PALETTE[colorIndex];

  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const lensRef = useRef(null);
  const innerImgRef = useRef(null);
  const canvasRef = useRef(null);
  const bgTextRef = useRef(null);
  const circuitRef = useRef(null);

  // Parallax background mouse tracking
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });

  // Smooth position tracking & Autonomous scan state
  const isInteracting = useRef(false);
  const idleTimer = useRef(null);
  const currentPos = useRef({ x: 210, y: 240 });
  const targetPos = useRef({ x: 210, y: 240 });
  const stageDimensions = useRef({ width: 420, height: 560 });
  const animFrameId = useRef(null);

  // 1. Autonomous Spectrum Transition Timer (Cycles every 4.2 seconds)
  useEffect(() => {
    if (!isAutoCycling) return;

    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % PALETTE.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isAutoCycling]);

  // 2. Measure stage dimensions dynamically with ResizeObserver
  useEffect(() => {
    if (!stageRef.current) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          stageDimensions.current = { width, height };
          setStageSize({ width, height });
        }
      }
    });

    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // 3. High-Performance GPU-Driven Animation Loop with Autonomous Patrol
  useEffect(() => {
    let patrolAngle = 0;
    let frameCount = 0;

    const render = () => {
      const stageW = stageDimensions.current.width || 420;
      const stageH = stageDimensions.current.height || 560;

      // Autonomous Patrol when user is not directly interacting
      if (!isInteracting.current) {
        patrolAngle += 0.022;
        targetPos.current = {
          x: stageW * 0.5 + Math.sin(patrolAngle * 0.7) * (stageW * 0.16),
          y: stageH * 0.44 + Math.sin(patrolAngle) * (stageH * 0.28),
        };
      }

      // Responsive lerp: fast & crisp (0.28) on cursor, smooth & graceful (0.05) on auto
      const lerp = isInteracting.current ? 0.28 : 0.05;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;

      const curX = currentPos.current.x;
      const curY = currentPos.current.y;
      const half = apertureSize / 2;

      // Calculate lens top-left relative to stage
      const lensX = curX - half;
      const lensY = curY - half;

      // Direct GPU transform update on DOM nodes (bypasses React re-render overhead!)
      if (lensRef.current) {
        lensRef.current.style.transform = `translate3d(${lensX}px, ${lensY}px, 0)`;
      }
      if (innerImgRef.current) {
        // Counter-translate the sharp image so it precisely matches the background image
        innerImgRef.current.style.transform = `translate3d(${-lensX}px, ${-lensY}px, 0)`;
      }

      // Throttle telemetry text & coordinates update to ~15fps for maximum performance
      frameCount++;
      if (frameCount % 4 === 0) {
        setCoordsDisplay({
          x: Math.round(curX),
          y: Math.round(curY),
        });

        if (isInteracting.current) {
          if (curY < stageH * 0.35) {
            setBiometricStatus('OPTIC_RECOGNISED // VIT CSE 27');
          } else if (curY < stageH * 0.65) {
            setBiometricStatus('CORE_ENGINE // JAVA • SPRING • AWS');
          } else {
            setBiometricStatus('SDE ARCHITECT // 99.99% SYSTEM HEALTH');
          }
        } else {
          if (curY < stageH * 0.35) {
            setBiometricStatus('AUTONOMOUS SCAN // FACIAL RECOGNITION');
          } else if (curY < stageH * 0.65) {
            setBiometricStatus('AUTONOMOUS SCAN // ARCHITECTURE STACK');
          } else {
            setBiometricStatus('AUTONOMOUS SCAN // SDE PROFILE TELEMETRY');
          }
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [apertureSize]);

  // 4. Background Cyber Radar & Particle Sweep Canvas
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
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.2,
      pulse: Math.random() * Math.PI,
    }));

    let radarAngle = 0;

    const renderCanvas = () => {
      ctx.clearRect(0, 0, width, height);

      // Sweeping radar cone from center
      radarAngle += 0.014;
      const centerX = width / 2;
      const centerY = height / 2;
      const radarRadius = Math.max(width, height) * 0.55;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radarRadius, radarAngle - 0.32, radarAngle);
      ctx.closePath();
      const radarGrad = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, radarRadius);
      radarGrad.addColorStop(0, 'rgba(0, 0, 0, 0.07)');
      radarGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radarGrad;
      ctx.fill();
      ctx.restore();

      // Particle connection links
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.pulse += 0.025;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.14 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Particle nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        const r = p.radius + Math.sin(p.pulse) * 0.4;
        ctx.arc(p.x, p.y, Math.max(0.5, r), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fill();
      });

      animationId = requestAnimationFrame(renderCanvas);
    };

    renderCanvas();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 5. Pointer Event Handlers
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

  const handlePointerEnter = () => {
    isInteracting.current = true;
    setIsHovered(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    playScannerSound();
  };

  const handlePointerMove = (e) => {
    isInteracting.current = true;
    setIsHovered(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    updateTargetFromPointer(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    // Smoothly settle and return to autonomous scanning patrol after 1.2s
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      isInteracting.current = false;
    }, 1200);
  };

  const handleTouchStart = (e) => {
    isInteracting.current = true;
    setIsHovered(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (e.touches[0]) {
      updateTargetFromPointer(e.touches[0].clientX, e.touches[0].clientY);
    }
    playScannerSound();
  };

  const handleTouchMove = (e) => {
    isInteracting.current = true;
    setIsHovered(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (e.touches[0]) {
      updateTargetFromPointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleGlobalMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 35;
    const y = (e.clientY - innerHeight / 2) / 35;
    setBgOffset({ x, y });
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
        className="absolute top-1/4 -left-28 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full blur-[140px] opacity-40 pointer-events-none transition-all duration-1000 animate-float-slow"
        style={{ backgroundColor: currentColor.accent }}
      />
      <div 
        className="absolute bottom-1/4 -right-28 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full blur-[160px] opacity-30 pointer-events-none transition-all duration-1000 animate-pulse-glow"
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
        <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-black/10 border border-black/15 backdrop-blur-sm text-black font-mono text-[10px] max-w-[210px] shadow-sm">
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
        <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-black/10 border border-black/15 backdrop-blur-sm text-black font-mono text-[10px] max-w-[210px] shadow-sm">
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
      {/* HEAVYWEIGHT BACKGROUND LAYER 5: Interactive Cyber Canvas     */}
      {/* ============================================================ */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
      />

      {/* ============================================================ */}
      {/* BACKGROUND LAYER 6: 18vw "PORTFOLIO" Typography              */}
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
      <div className="relative z-20 w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        
        {/* Left: Engine & Aperture Pill */}
        <div className="flex items-center space-x-2.5 bg-black/80 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-white shadow-2xl">
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
          className="flex items-center space-x-2 bg-black/80 hover:bg-black backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-xs font-mono transition-all shadow-xl hover:scale-105 group"
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
        <div className="hidden sm:flex items-center space-x-2 bg-black/80 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-white shadow-2xl">
          <Compass className="w-4 h-4 text-yellow-400" />
          <span className="text-zinc-400">COORDS:</span>
          <span className="text-blue-400 font-bold">X[{coordsDisplay.x}] Y[{coordsDisplay.y}]</span>
          <span className="text-zinc-500">|</span>
          <span className="text-emerald-400 font-semibold">{biometricStatus}</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN SCANNER STAGE CONTAINER (Precision Optical Viewport)     */}
      {/* ============================================================ */}
      <div 
        ref={stageRef}
        onMouseEnter={handlePointerEnter}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handlePointerLeave}
        className="relative z-10 w-[300px] sm:w-[420px] h-[450px] sm:h-[560px] rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] border-2 border-black/30 bg-zinc-950 cursor-crosshair group touch-none select-none"
      >
        {/* ============================================================ */}
        {/* LAYER 1: BASE LAYER (Atmospheric 8px Gaussian Blur & Overlay) */}
        {/* ============================================================ */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src={personalInfo.images.topAngle} 
            alt="Manan Mahajan Target" 
            className="w-full h-full object-cover filter blur-[8px] brightness-[0.78] contrast-125 select-none"
          />
          {/* Frosted Blueprint Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        </div>

        {/* ============================================================ */}
        {/* LAYER 2: THE MOVING APERTURE LENS BOX (GPU-Translated)       */}
        {/* ============================================================ */}
        <div 
          ref={lensRef}
          className="absolute top-0 left-0 z-10 pointer-events-none rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(59,130,246,0.25)] will-change-transform"
          style={{
            width: `${apertureSize}px`,
            height: `${apertureSize}px`,
            transform: `translate3d(70px, 140px, 0)`,
          }}
        >
          {/* The Sharp Reveal Image (Counter-translated to align 1:1 with base image) */}
          <div 
            ref={innerImgRef}
            className="absolute top-0 left-0 pointer-events-none will-change-transform"
            style={{
              width: `${stageSize.width}px`,
              height: `${stageSize.height}px`,
              transform: `translate3d(-70px, -140px, 0)`,
            }}
          >
            <img 
              src={personalInfo.images.topAngle} 
              alt="Manan Mahajan Sharp Reveal" 
              className="w-full h-full object-cover filter brightness-105 contrast-110 select-none max-w-none"
            />
          </div>

          {/* Mode-Specific Optical HUD Filters */}
          {activeMode === 'cyber' && (
            <>
              <div className="absolute inset-0 bg-blue-500/15 mix-blend-color-dodge pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.2)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
            </>
          )}

          {activeMode === 'biometric' && (
            <>
              <div className="absolute inset-0 bg-emerald-500/12 mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.18)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            </>
          )}

          {/* Animated Marching Ants Border around the lens */}
          <div className="absolute inset-0 rounded-3xl marching-ants-border pointer-events-none shadow-[0_0_25px_rgba(59,130,246,0.6)]" />

          {/* 4 Precision Corner Brackets */}
          <div className="absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 border-blue-400 pointer-events-none" />
          <div className="absolute top-1 right-1 w-5 h-5 border-t-2 border-r-2 border-blue-400 pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-5 h-5 border-b-2 border-l-2 border-blue-400 pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-5 h-5 border-b-2 border-r-2 border-blue-400 pointer-events-none" />

          {/* Center Target Reticle Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 border border-blue-400/40 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
            </div>
            <div className="absolute w-12 h-[1px] bg-blue-400/35" />
            <div className="absolute h-12 w-[1px] bg-blue-400/35" />
          </div>

          {/* Top Aperture Status Tag */}
          <div className="absolute top-2 left-2.5 right-2.5 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-blue-200 bg-black/85 px-2 py-0.5 rounded-md backdrop-blur-sm border border-blue-400/30 pointer-events-none">
            <span className="font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isHovered ? 'MANUAL LOCK' : 'AUTO-DIAGNOSTIC'}
            </span>
            <span className="text-yellow-400 uppercase font-bold">{activeMode}</span>
          </div>

          {/* Bottom Aperture Metadata Tag */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-zinc-300 bg-black/85 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10 pointer-events-none">
            <span className="text-zinc-400">APERTURE: {apertureSize}PX</span>
            <span className="text-blue-400 font-bold truncate max-w-[130px]">{biometricStatus}</span>
          </div>
        </div>

        {/* Bottom Interactive Hover Prompt Pill */}
        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-0' : 'opacity-90'
        }`}>
          <div className="flex items-center space-x-1.5 bg-black/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-mono text-yellow-400 shadow-xl">
            <ShieldCheck className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>TOUCH OR HOVER TO CONTROL LENS</span>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* SCANNER CONTROL CONSOLE (Modes, Aperture Size & Colors)       */}
      {/* ============================================================ */}
      <div className="relative z-20 mt-8 flex flex-col items-center gap-4 max-w-2xl w-full">
        
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3 p-2.5 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/15 shadow-2xl">
          
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
            {[200, 260, 320].map((size) => (
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

        {/* Color Spectrum Theme Switcher with Active Progress Indicator */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-mono uppercase tracking-widest text-black/80 font-bold bg-white/40 px-3.5 py-0.5 rounded-full backdrop-blur-md shadow-sm">
              Spectrum Theme // {currentColor.label} ({currentColor.wavelength})
            </p>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl">
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
