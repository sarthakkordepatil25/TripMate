import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ArrowDown, Users, ShieldCheck, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero({ onExploreClick, onGroupClick }) {
  const navigate = useNavigate();

  const stats = [
    { value: '6+', label: 'Curated Destinations', sub: 'Across India' },
    { value: '100%', label: 'Offline-Ready Planning', sub: 'Zero-connection access' },
    { value: 'Live', label: 'Group Collaboration', sub: 'Consensus & voting' },
    { value: 'Smart', label: 'Budget Tracking', sub: 'Multi-currency engine' },
  ];

  return (
    <section
      id="hero"
      data-scene="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 z-10"
      aria-label="TripMate Hero"
    >
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Upper Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight-dark/80 border border-sand/20 backdrop-blur-xl shadow-glow mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-sunset" />
          <span className="eyebrow text-xs tracking-[0.25em] text-sunset">
            YOUR NEXT ADVENTURE AWAITS
          </span>
        </motion.div>

        {/* Main Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-ivory tracking-tight leading-[1.08] max-w-4xl"
        >
          Some journeys <br className="hidden sm:inline" />
          stay with you <br className="hidden sm:inline" />
          <span className="italic font-normal text-terracotta">forever.</span>
        </motion.h1>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-sand/85 max-w-2xl leading-relaxed font-sans"
        >
          Discover extraordinary destinations, plan unforgettable experiences and make every journey count.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              if (onExploreClick) {
                onExploreClick();
              } else {
                navigate('/explore');
              }
            }}
            className="btn-luxury-primary text-sm sm:text-base py-3.5 px-8 shadow-luxury uppercase tracking-wider font-semibold"
          >
            <Compass className="w-4 h-4 text-ivory" />
            <span>Explore Destinations</span>
          </button>

          <button
            onClick={() => {
              if (onGroupClick) {
                onGroupClick();
              } else {
                navigate('/group');
              }
            }}
            className="btn-luxury-outline text-sm sm:text-base py-3.5 px-8 uppercase tracking-wider font-semibold"
          >
            <Users className="w-4 h-4 text-sunset" />
            <span>Plan A Trip</span>
          </button>
        </motion.div>

        {/* Editorial Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 sm:mt-20 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 glass-card-luxury rounded-3xl border border-sand/15 shadow-luxury"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-2">
              <span className="font-num text-2xl sm:text-3xl lg:text-4xl font-extrabold text-sunset tracking-tight">
                {stat.value}
              </span>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-ivory">
                {stat.label}
              </p>
              <p className="text-[11px] text-sand/60">
                {stat.sub}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-2 text-sand/60"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase font-mono">
            Scroll to discover
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-sunset" />
        </motion.div>
      </div>
    </section>
  );
}
