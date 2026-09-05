import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { playHoverSound, playClickSound, playSuccessChime } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  Copy,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon, LinkedinIcon, GithubIcon, InstagramIcon } from './Icons';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    playClickSound();

    // Create formatted WhatsApp inquiry message
    const formattedText = `Hi Manan!%0A%0A*Name:* ${encodeURIComponent(name.trim())}%0A*Email:* ${encodeURIComponent(email.trim() || 'Not provided')}%0A%0A*Message:*%0A${encodeURIComponent(message.trim())}%0A%0A_Sent via Portfolio Website_`;
    const whatsappUrl = `https://wa.me/916364533214?text=${formattedText}`;

    // Trigger celebration
    playSuccessChime();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });

    setStatus('Redirecting to WhatsApp with your inquiry...');

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setName('');
      setEmail('');
      setMessage('');
      setStatus('Inquiry initiated via WhatsApp! You can also reach Manan directly at mananmahajan31@gmail.com.');
    }, 500);
  };

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    playClickSound();
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const socialPlatforms = [
    { name: 'WhatsApp', href: personalInfo.socials.whatsapp, icon: WhatsAppIcon, label: 'Chat' },
    { name: 'LinkedIn', href: personalInfo.socials.linkedin, icon: LinkedinIcon, label: 'Connect' },
    { name: 'GitHub', href: personalInfo.socials.github, icon: GithubIcon, label: 'Code' },
    { name: 'Instagram', href: personalInfo.socials.instagram, icon: InstagramIcon, label: 'Follow' },
  ];

  return (
    <section 
      id="contact"
      className="relative min-h-screen w-full bg-[#0a0a0a] rounded-t-[40px] text-white overflow-hidden flex flex-col items-center justify-center py-24 px-6 sm:px-12 select-none border-t border-white/10"
    >
      {/* Massive Background Typography: "CONNECT" 25vw */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h2 className="text-[25vw] font-display font-black tracking-tighter uppercase leading-none text-white opacity-[0.03] select-none">
          CONNECT
        </h2>
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center space-y-10">
        
        {/* Top Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-yellow-400 font-mono text-xs uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Transmission Portal</span>
        </div>

        {/* Main Heading: "LET'S TALK" */}
        <div className="text-center space-y-2">
          <h2 className="text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-tight uppercase leading-none text-white">
            LET'S <span className="text-stroke-white">TALK</span>
          </h2>
          <p className="text-zinc-400 font-sans text-sm sm:text-base max-w-md mx-auto">
            Ready to build next-generation scalable backends, full-stack systems, or discuss new software opportunities.
          </p>
        </div>

        {/* Direct Contact Pills */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-xs font-mono">
          <button
            onClick={handleCopyEmail}
            onMouseEnter={playHoverSound}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 hover:border-yellow-400/50 text-zinc-300 hover:text-white transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-yellow-400" />
            <span>{personalInfo.email}</span>
            {copiedEmail ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
          </button>

          <button
            onClick={handleCopyPhone}
            onMouseEnter={playHoverSound}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 hover:border-yellow-400/50 text-zinc-300 hover:text-white transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{personalInfo.phone}</span>
            {copiedPhone ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
          </button>

          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* Circular Glowing Social Icons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2">
          {socialPlatforms.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                onClick={() => playClickSound()}
                title={p.name}
                className="w-14 h-14 rounded-full border-2 border-white bg-transparent flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] group"
              >
                <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
              </a>
            );
          })}
        </div>

        {/* Glassmorphism Dark Contact Form */}
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-2xl p-8 sm:p-10 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-5 text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3.5 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-all font-sans text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-all font-sans text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
              Your Message *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Your Message (Project scope, collaboration inquiry, or feedback)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-5 py-3.5 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-all font-sans text-sm resize-none"
            />
          </div>

          {status && (
            <p className="text-xs font-mono text-yellow-400 bg-yellow-400/10 p-3 rounded-xl border border-yellow-400/20">
              {status}
            </p>
          )}

          <button
            type="submit"
            onMouseEnter={playHoverSound}
            className="w-full py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            <span>SEND VIA WHATSAPP & EMAIL</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </section>
  );
}
