import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Wifi, ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { isOfflineReady } = useApp();

  return (
    <footer className="bg-midnight-dark text-ivory border-t border-sand/15 mt-auto relative overflow-hidden z-10">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* BRAND COLUMN */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-terracotta to-sunset flex items-center justify-center text-ivory shadow-glow">
                <Compass className="w-5 h-5 text-ivory" />
              </div>
              <span className="text-xl font-serif font-bold text-ivory uppercase tracking-widest">
                Trip<span className="text-terracotta">Mate</span>
              </span>
            </Link>
            <p className="text-xs text-sand/80 leading-relaxed font-sans italic">
              "Every journey has a story. Plan together. Travel anywhere, even offline."
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-sunset font-mono font-bold bg-midnight/80 px-3 py-1.5 rounded-full border border-sand/15">
              <Wifi className="w-3.5 h-3.5" />
              <span>{isOfflineReady ? 'Offline cache synchronized' : 'Offline ready storage active'}</span>
            </div>
          </div>

          {/* APPLICATION MODULES / NAVIGATION */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-sunset mb-4">
              Navigation & Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-sand/80 font-sans">
              <li>
                <Link to="/" className="hover:text-ivory hover:underline transition-colors flex items-center gap-1">
                  Home — Editorial Journey
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-ivory hover:underline transition-colors flex items-center gap-1">
                  Explore — Curated Indian Escapes
                </Link>
              </li>
              <li>
                <Link to="/group" className="hover:text-ivory hover:underline transition-colors flex items-center gap-1">
                  Group — Real-Time Consensus & Chat
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-ivory hover:underline transition-colors flex items-center gap-1">
                  Schedule — Connected Daily Itinerary
                </Link>
              </li>
              <li>
                <Link to="/budget" className="hover:text-ivory hover:underline transition-colors flex items-center gap-1">
                  Budget — Multi-Currency Ledger
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-ivory hover:underline transition-colors flex items-center gap-1">
                  Alerts — Travel Disruption Contingency
                </Link>
              </li>
            </ul>
          </div>

          {/* FEATURES & CONTEXT */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-sunset mb-4">
              Platform Features
            </h4>
            <div className="text-xs text-sand/80 space-y-2 leading-relaxed font-sans">
              <p className="font-serif font-bold text-ivory text-sm">The Art of Travelling</p>
              <p>GSAP ScrollTrigger background crossfades, offline caching, and group voting.</p>
              <div className="flex items-center gap-2 text-sunset bg-midnight/80 px-3 py-1.5 rounded-xl border border-sand/15 mt-2 font-mono text-[11px]">
                <ShieldCheck className="w-4 h-4 text-sunset shrink-0" />
                <span>Zero-Backend LocalStorage Persistence</span>
              </div>
            </div>
          </div>

          {/* ACTIVE EXPEDITION PANEL & CONTACT */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-sunset mb-4">
              Active Demonstration & Contact
            </h4>
            <div className="glass-card-luxury p-4 rounded-2xl border border-sand/15 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-ivory">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span>Goa Getaway (4 Travelers • 4 Days)</span>
              </div>
              <p className="text-[11px] text-sand/70 leading-relaxed font-sans">
                Budget ₹1,30,000 • Day 2 Fort Aguada rain alert ready for testing.
              </p>
              <Link
                to="/alerts"
                className="inline-flex items-center gap-1 text-xs font-semibold text-sunset hover:text-ivory transition-colors font-mono"
              >
                <span>Trigger Weather Contingency</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-sand/60">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-terracotta" />
                concierge@tripmate.io
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-sand/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sand/50 font-mono">
          <p>© 2026 TripMate Travel-Tech Platform. All rights reserved.</p>
          <p className="flex items-center gap-1 text-sand/60">
            Crafted with React, Tailwind CSS, Playfair Display, Inter & Manrope
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
