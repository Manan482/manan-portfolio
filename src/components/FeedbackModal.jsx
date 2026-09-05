import React, { useState } from 'react';
import { X, Star, Send, Sparkles, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playSuccessChime } from '../utils/soundEffects';

export default function FeedbackModal({ isOpen, onClose, onAddTestimonial }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    playClickSound();

    setTimeout(() => {
      const newTestimonial = {
        id: `test-${Date.now()}`,
        name: name.trim(),
        role: role.trim() || 'Collaborator / Peer',
        message: message.trim(),
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
        verified: true,
        rating: rating,
      };

      onAddTestimonial(newTestimonial);
      playSuccessChime();
      
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f4c400', '#facc15', '#3b82f6', '#ffffff']
      });

      setName('');
      setRole('');
      setMessage('');
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg p-8 rounded-3xl bg-zinc-900/90 border border-white/15 shadow-2xl backdrop-blur-2xl text-white transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={() => { playClickSound(); onClose(); }}
          className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl text-yellow-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-display tracking-tight text-white flex items-center gap-2">
              Add Testimonial <Sparkles className="w-4 h-4 text-yellow-400 inline" />
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Share your experience collaborating with Manan</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Your Name *
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. Alex Rivera"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800/80 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Your Role / Company
            </label>
            <input 
              type="text" 
              placeholder="e.g. Tech Lead @ Meta or Peer @ VIT"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800/80 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Rating
            </label>
            <div className="flex items-center space-x-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => { playClickSound(); setRating(star); }}
                  className="p-1 text-yellow-400 hover:scale-125 transition-transform"
                >
                  <Star className={`w-6 h-6 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-600'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Your Feedback / Endorsement *
            </label>
            <textarea 
              required
              rows={4}
              placeholder="How was your experience working with Manan on architecture, code quality, and delivery?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800/80 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold uppercase tracking-wider text-sm rounded-xl transition-all duration-300 shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
          >
            <span>{isSubmitting ? 'Posting Feedback...' : 'Post Testimonial'}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
