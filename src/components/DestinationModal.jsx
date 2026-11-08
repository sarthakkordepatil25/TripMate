import React, { useState } from 'react';
import {
  X,
  Star,
  Clock,
  Compass,
  CheckCircle2,
  Heart,
  Hotel,
  SunMedium,
  Sparkles,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatINR } from '../utils/currency';
import { useApp } from '../context/AppContext';

export const DestinationModal = ({ destination, isOpen, onClose, onBookSimulated }) => {
  const { isDestinationSaved, toggleSaveDestination } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'itinerary' | 'stays'

  if (!isOpen || !destination) return null;

  const isSaved = isDestinationSaved(destination.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-midnight-900/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="glass-card-luxury rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-luxury flex flex-col border border-sand/25 text-ivory"
          onClick={(e) => e.stopPropagation()}
        >
          {/* MODAL HERO HEADER */}
          <div className="relative h-64 sm:h-72 w-full bg-midnight-dark shrink-0">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-800/60 to-black/30" />

            {/* Top Close & Save Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={() => toggleSaveDestination(destination.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all border ${
                  isSaved
                    ? 'bg-terracotta border-terracotta text-ivory shadow-glow'
                    : 'bg-midnight/70 border-sand/25 text-sand hover:text-terracotta'
                }`}
                title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-midnight/70 border border-sand/25 text-sand hover:text-ivory hover:bg-midnight transition-all backdrop-blur-md"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Badges */}
            <div className="absolute bottom-4 left-5 right-5 text-ivory z-10">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="bg-terracotta text-ivory text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider font-mono">
                  {destination.state}
                </span>
                <div className="flex items-center gap-1 bg-midnight/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-bold text-sunset font-num border border-sand/20">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{destination.rating}</span>
                  <span className="text-sand/70 font-normal">({destination.reviewsCount || 1400}+ reviews)</span>
                </div>
              </div>

              <h2 className="text-3xl font-serif font-bold tracking-tight text-ivory">{destination.name}</h2>
              <p className="text-xs sm:text-sm text-sand/85 line-clamp-1 italic mt-0.5 font-sans">
                {destination.tagline || destination.description}
              </p>
            </div>
          </div>

          {/* LUXURY TABS */}
          <div className="flex border-b border-sand/15 px-6 bg-midnight-dark/60">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 px-4 text-xs font-serif font-bold tracking-wide border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-sunset text-sunset'
                  : 'border-transparent text-sand/60 hover:text-ivory'
              }`}
            >
              Overview & Highlights
            </button>
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`py-3.5 px-4 text-xs font-serif font-bold tracking-wide border-b-2 transition-all ${
                activeTab === 'itinerary'
                  ? 'border-sunset text-sunset'
                  : 'border-transparent text-sand/60 hover:text-ivory'
              }`}
            >
              Sample {destination.duration} Itinerary
            </button>
            <button
              onClick={() => setActiveTab('stays')}
              className={`py-3.5 px-4 text-xs font-serif font-bold tracking-wide border-b-2 transition-all ${
                activeTab === 'stays'
                  ? 'border-sunset text-sunset'
                  : 'border-transparent text-sand/60 hover:text-ivory'
              }`}
            >
              Recommended Hotel
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 overflow-y-auto space-y-5 text-xs text-sand/80">
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-3 gap-3 bg-midnight-dark/80 p-4 rounded-2xl border border-sand/15">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-sand/60 font-mono">Total Estimate</span>
                    <span className="text-base font-num font-extrabold text-sunset">
                      {formatINR(destination.estimatedCost)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-sand/60 font-mono">Duration</span>
                    <span className="text-base font-num font-extrabold text-ivory">
                      {destination.duration}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-sand/60 font-mono">Ideal Climate</span>
                    <span className="text-base font-num font-extrabold text-ivory">
                      {destination.averageTemp || '26°C'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sunset mb-1.5">
                    About This Experience
                  </h4>
                  <p className="text-xs text-sand/85 leading-relaxed font-sans">
                    {destination.longDescription || destination.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sunset mb-2">
                    Experience Highlights
                  </h4>
                  <ul className="space-y-2">
                    {destination.highlights ? (
                      destination.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-sand">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-sand/60">Curated attractions and guided trails included.</li>
                    )}
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-3">
                <p className="text-xs text-sand/70">
                  Recommended step-by-step route tailored for a {destination.duration} journey:
                </p>
                <div className="space-y-2.5">
                  {[1, 2, 3, 4].slice(0, destination.daysCount || 4).map((d) => (
                    <div key={d} className="p-3.5 rounded-2xl bg-midnight-dark/80 border border-sand/15 flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-terracotta text-ivory flex items-center justify-center font-bold text-xs shrink-0 font-num">
                        D{d}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-ivory">
                          {d === 1 && 'Arrival, luxury resort check-in & coastal sunset exploration'}
                          {d === 2 && 'Heritage architecture, fort viewpoints & water sports'}
                          {d === 3 && 'Spice plantations, local culinary trails & artisan shopping'}
                          {d === 4 && 'Leisure sunrise, souvenir market & departure transfer'}
                        </p>
                        <p className="text-[11px] text-sand/60 mt-0.5">
                          Includes verified routes, navigation markers, and offline itinerary caching.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stays' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-sand/20 bg-midnight-dark/80 flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={destination.recommendedHotel?.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'}
                    alt={destination.recommendedHotel?.name}
                    className="w-full sm:w-36 h-28 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sunset bg-sunset/15 px-2 py-0.5 rounded-full inline-block mb-1 font-mono">
                      Partner Property
                    </span>
                    <h4 className="text-sm font-serif font-bold text-ivory">
                      {destination.recommendedHotel?.name || 'Heritage Beach Villa & Resort'}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-amber-300 font-semibold mt-1 font-num">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{destination.recommendedHotel?.rating || 4.8} / 5.0</span>
                      <span className="text-sand/60 font-normal">· Free Breakfast & Infinity Pool</span>
                    </div>
                    <p className="text-xs font-num font-extrabold text-sunset mt-2">
                      {formatINR(destination.recommendedHotel?.pricePerNight || 4200)}{' '}
                      <span className="text-sand/60 font-normal text-[11px]">/ night</span>
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-midnight/90 border border-sand/20 rounded-2xl text-xs text-sand flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-sunset shrink-0 mt-0.5" />
                  <span>
                    Direct partnership reservation guarantees early check-in and 100% offline ticket verification.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="p-4 sm:p-5 bg-midnight-dark/90 border-t border-sand/15 flex items-center justify-between gap-3 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-medium text-sand/60 block font-mono">Trip Package Total</span>
              <span className="text-lg font-num font-extrabold text-sunset">
                {formatINR(destination.estimatedCost)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="btn-luxury-outline text-xs py-2 px-4"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onBookSimulated) onBookSimulated(destination);
                }}
                className="btn-luxury-primary text-xs py-2 px-5"
              >
                <Hotel className="w-3.5 h-3.5" />
                <span>Reserve Stay & Transport</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DestinationModal;
