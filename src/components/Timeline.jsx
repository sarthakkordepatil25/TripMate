import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  MapPin,
  Navigation,
  CheckCircle2,
  Hotel,
  Sun,
  ShoppingBag,
  Landmark,
  Compass,
  Utensils,
  Ship,
  Sparkles,
  Ticket
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Timeline = () => {
  const { itinerary, activeDay, setActiveDay } = useApp();

  const dayStops = itinerary[activeDay] || [];

  const getCategoryIcon = (category = '') => {
    const c = category.toLowerCase();
    if (c.includes('hotel') || c.includes('accommodation')) return Hotel;
    if (c.includes('beach')) return Sun;
    if (c.includes('shopping') || c.includes('market')) return ShoppingBag;
    if (c.includes('dining') || c.includes('food') || c.includes('lunch')) return Utensils;
    if (c.includes('cruise') || c.includes('boat')) return Ship;
    if (c.includes('heritage') || c.includes('historical') || c.includes('landmark') || c.includes('art')) return Landmark;
    return Compass;
  };

  return (
    <div className="space-y-8 text-ivory">
      {/* LUXURY DAY SELECTOR TABS */}
      <div className="flex items-center gap-3 border-b border-sand/15 pb-4 overflow-x-auto no-scrollbar">
        {[1, 2, 3].map((dayNum) => {
          const isActive = activeDay === dayNum;
          const stopsCount = (itinerary[dayNum] || []).length;
          const hasUpdatedStop = (itinerary[dayNum] || []).some((s) => s.isUpdated);

          return (
            <motion.button
              key={dayNum}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveDay(dayNum)}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all shrink-0 font-sans ${
                isActive
                  ? 'bg-terracotta text-ivory shadow-glow'
                  : 'bg-midnight-dark/70 border border-sand/15 text-sand/70 hover:text-ivory hover:bg-midnight-dark'
              }`}
            >
              <span className="font-serif text-sm font-bold">Day {dayNum}</span>
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-num ${
                  isActive ? 'bg-midnight-dark text-sunset' : 'bg-midnight-600 text-sand'
                }`}
              >
                {stopsCount} Stops
              </span>
              {hasUpdatedStop && (
                <span className="w-2 h-2 rounded-full bg-sunset animate-pulse" title="Updated stop inside"></span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ROUTE PROGRESSION SUMMARY BAR */}
      <div className="bg-midnight-dark/80 p-4 rounded-2xl border border-sand/15 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-sunset font-mono font-bold">
          <Navigation className="w-4 h-4" />
          <span>Day {activeDay} Sequence:</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-sand/80 flex-wrap">
          {dayStops.map((stop, i) => (
            <React.Fragment key={stop.id || i}>
              <span className={`px-2.5 py-0.5 rounded-md font-sans ${stop.isUpdated ? 'bg-sunset/20 text-sunset font-bold border border-sunset/30' : 'bg-midnight border border-sand/15 text-sand'}`}>
                {stop.title}
              </span>
              {i < dayStops.length - 1 && <span className="text-sand/40">➔</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* VERTICAL TIMELINE LIST */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-sand/20 ml-4 sm:ml-6 space-y-8 py-2">
        {dayStops.map((stop, index) => {
          const Icon = getCategoryIcon(stop.category);
          const isUpdated = stop.isUpdated;

          return (
            <motion.div
              key={stop.id || index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative group"
            >
              {/* TIMELINE BULLET MARKER */}
              <div
                className={`absolute -left-[37px] sm:-left-[53px] top-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-4 border-midnight flex items-center justify-center text-ivory shadow-md transition-transform duration-300 group-hover:scale-110 ${
                  isUpdated ? 'bg-sunset ring-4 ring-sunset/30' : 'bg-terracotta ring-4 ring-terracotta/20'
                }`}
              >
                <Icon className="w-4 h-4 text-ivory" />
              </div>

              {/* TIMELINE CARD */}
              <div
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isUpdated
                    ? 'bg-midnight-dark/95 border-sunset/40 ring-1 ring-sunset/30 shadow-luxury'
                    : 'glass-card-luxury border-sand/15 hover:border-sand/30 shadow-card'
                }`}
              >
                <div className="p-5 sm:p-6 flex flex-col md:flex-row gap-5">
                  {/* Photo preview if present */}
                  {stop.image && (
                    <div className="w-full md:w-44 h-32 md:h-auto rounded-2xl overflow-hidden shrink-0 bg-midnight-dark">
                      <img
                        src={stop.image}
                        alt={stop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-3">
                    {/* Header Row: Time, Title & Badges */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-bold px-3 py-1 rounded-full bg-sunset/20 text-sunset border border-sunset/30">
                            <Clock className="w-3 h-3 text-sunset" />
                            {stop.time}
                          </span>

                          {isUpdated && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-sunset text-midnight-dark shadow-sm animate-pulse font-mono">
                              <Sparkles className="w-3 h-3" /> Updated Alternative
                            </span>
                          )}

                          {stop.bookingStatus && (
                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-midnight-600 text-sand border border-sand/10">
                              {stop.bookingStatus}
                            </span>
                          )}
                        </div>

                        <span className="text-xs text-sand/60 font-medium font-num">
                          Duration: <strong className="text-ivory">{stop.duration}</strong>
                        </span>
                      </div>

                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-ivory tracking-tight">
                        {stop.title}
                      </h4>

                      {stop.subtitle && (
                        <p className="text-xs text-sand/75 mt-0.5 font-sans italic">
                          {stop.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Notice if updated stop */}
                    {isUpdated && (
                      <div className="p-3 rounded-2xl bg-sunset/15 border border-sunset/30 text-xs text-sand flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span>
                          Replaced original stop: <strong className="line-through text-sand/60">{stop.originalTitle || 'Fort Aguada'}</strong> due to coastal storm advisory.
                        </span>
                        <span className="text-[10px] font-mono font-bold text-sunset bg-midnight-dark/80 px-2 py-0.5 rounded border border-sunset/30">
                          Updated at {stop.replacedAt || 'Today'}
                        </span>
                      </div>
                    )}

                    {/* Route Details */}
                    {stop.route && (
                      <div className="flex items-center gap-2 text-xs text-sand bg-midnight-dark/80 px-3.5 py-2 rounded-xl border border-sand/15 font-mono">
                        <Navigation className="w-3.5 h-3.5 text-sunset shrink-0" />
                        <span className="truncate">{stop.route}</span>
                      </div>
                    )}

                    {/* Notes */}
                    {stop.notes && (
                      <p className="text-xs text-sand/70 leading-relaxed font-sans">
                        {stop.notes}
                      </p>
                    )}

                    {/* Booking E-Pass Reference */}
                    {stop.bookingRef && (
                      <div className="pt-2 border-t border-sand/15 flex items-center justify-between text-xs text-sand/60">
                        <span className="flex items-center gap-1 font-mono text-[11px] font-bold text-sunset">
                          <Ticket className="w-3.5 h-3.5" />
                          Pass: {stop.bookingRef}
                        </span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
