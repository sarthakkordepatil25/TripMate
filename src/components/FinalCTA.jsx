import React, { useState } from 'react';
import { Compass, Sparkles, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinalCTA({ onStartPlan }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section id="cta" data-scene="cta" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 text-ivory">
      <div className="glass-card-luxury rounded-4xl p-8 sm:p-14 lg:p-16 border border-sand/20 shadow-luxury text-center max-w-4xl mx-auto relative overflow-hidden">
        {/* Subtle radial warmth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-terracotta/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight-dark/80 border border-sand/20 text-sunset text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready when you are</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-tight">
            Your next story is <span className="italic text-sand font-normal">waiting.</span>
          </h2>

          <p className="text-sm sm:text-base text-sand/85 max-w-xl mx-auto font-sans leading-relaxed">
            Start planning a journey worth remembering.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#explore"
              onClick={(e) => {
                if (onStartPlan) {
                  e.preventDefault();
                  onStartPlan();
                }
              }}
              className="btn-luxury-primary text-sm sm:text-base py-3.5 px-8 shadow-luxury uppercase tracking-wider font-semibold"
            >
              <Compass className="w-4 h-4 text-ivory" />
              <span>Plan Your Next Adventure</span>
            </a>

            <a
              href="/group"
              className="btn-luxury-outline text-sm sm:text-base py-3.5 px-8 uppercase tracking-wider font-semibold"
            >
              <span>Open Group Itinerary</span>
              <ArrowRight className="w-4 h-4 text-sunset" />
            </a>
          </div>

          {/* Minimalist Dispatch Subscription */}
          <div className="pt-10 max-w-md mx-auto">
            {isSubscribed ? (
              <div className="p-3 bg-forest/80 border border-forest/60 text-sand text-xs rounded-2xl">
                ✓ Welcome to the TripMate circle. You will receive private departure notes.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for private departure dispatches..."
                  className="flex-1 bg-midnight-dark/80 border border-sand/20 rounded-full px-4 py-2.5 text-xs text-ivory placeholder:text-sand/40 focus:outline-none focus:border-terracotta font-sans"
                  required
                />
                <button
                  type="submit"
                  className="btn-luxury-primary text-xs py-2.5 px-5 shrink-0"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
