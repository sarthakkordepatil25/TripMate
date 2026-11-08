import React from 'react';
import { Star, Clock, Heart, ArrowUpRight, MapPin, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatINR } from '../utils/currency';
import { useApp } from '../context/AppContext';

export const DestinationCard = ({ destination, onViewDetails, onSelect }) => {
  const { isDestinationSaved, toggleSaveDestination } = useApp();
  const isSaved = isDestinationSaved(destination.id);

  const handleClick = () => {
    if (onViewDetails) onViewDetails(destination);
    else if (onSelect) onSelect(destination);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden glass-card-luxury border border-sand/20 shadow-card hover:shadow-cardHover flex flex-col cursor-pointer transition-all duration-500"
      onClick={handleClick}
    >
      {/* FULL-BLEED PHOTOGRAPHIC WRAPPER */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-midnight-dark">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* LUXURY GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/95 via-midnight-800/40 to-transparent group-hover:from-midnight-900/90 transition-all duration-500" />

        {/* TOP BAR: State Pill, Rating & Heart Wishlist */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="bg-midnight/80 backdrop-blur-md text-ivory text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-sand/20">
              <MapPin className="w-3 h-3 text-terracotta" />
              {destination.state}
            </span>
            {destination.badge && (
              <span className="hidden sm:inline-flex bg-terracotta/90 backdrop-blur-md text-ivory text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-sand/20">
                {destination.badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Rating pill */}
            <div className="flex items-center gap-1 bg-midnight/80 backdrop-blur-md text-ivory text-xs font-bold px-2.5 py-1 rounded-full border border-sand/20 shadow-sm font-num">
              <Star className="w-3.5 h-3.5 fill-sunset text-sunset" />
              <span>{destination.rating}</span>
            </div>

            {/* Heart Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveDestination(destination.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm border ${
                isSaved
                  ? 'bg-terracotta border-terracotta text-ivory shadow-glow'
                  : 'bg-midnight/70 border-sand/25 text-sand hover:text-terracotta hover:bg-midnight'
              }`}
              title={isSaved ? 'Remove from wishlist' : 'Save destination'}
              aria-label={isSaved ? 'Unsave destination' : 'Save destination'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* BOTTOM METADATA ON CARD OVERLAY */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-ivory z-10 flex flex-col justify-end">
          {/* Activity Tags & Duration */}
          <div className="flex items-center gap-1.5 flex-wrap mb-2">
            {destination.interests.map((interest) => (
              <span
                key={interest}
                className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-midnight/70 backdrop-blur-md text-sand border border-sand/15 font-mono"
              >
                {interest}
              </span>
            ))}
            <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-forest/80 backdrop-blur-md text-sand flex items-center gap-1 font-num">
              <Clock className="w-2.5 h-2.5" />
              {destination.duration}
            </span>
          </div>

          {/* Destination Title & Tagline */}
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-ivory group-hover:text-sunset transition-colors">
                {destination.name}
              </h3>
              {destination.tagline && (
                <p className="text-xs text-sand/80 line-clamp-1 mt-0.5 font-sans italic">
                  "{destination.tagline}"
                </p>
              )}
            </div>

            {/* Action pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-terracotta/80 group-hover:bg-sunset group-hover:text-midnight-dark text-ivory text-xs font-semibold backdrop-blur-md transition-all duration-300 shrink-0 shadow-md">
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>

          {/* Pricing & Season Footer */}
          <div className="pt-3 mt-3 border-t border-sand/15 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-sand/70 uppercase tracking-widest block font-medium font-mono">
                Est. Budget
              </span>
              <span className="text-lg font-num font-extrabold text-sunset">
                {formatINR(destination.estimatedCost)}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-sand/70 uppercase tracking-widest block font-medium font-mono">
                Best Season
              </span>
              <span className="text-xs font-semibold text-ivory">
                {destination.bestTimeToVisit || 'Oct — Mar'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
