import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  INITIAL_DESTINATIONS,
  AVAILABLE_INTERESTS,
  DESTINATION_CATEGORIES
} from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';
import BookingModal from '../components/BookingModal';
import { formatINR } from '../utils/currency';
import {
  Search,
  Calendar,
  RotateCcw,
  Sparkles,
  MapPin,
  Compass,
  ArrowRight,
  FilterX,
  Star,
  Clock,
  Waves,
  Mountain,
  Landmark,
  UtensilsCrossed
} from 'lucide-react';

export const Explore = ({ showHero = true }) => {
  // Filters state
  const [maxBudget, setMaxBudget] = useState(25000);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [startDate, setStartDate] = useState('2026-11-15');
  const [endDate, setEndDate] = useState('2026-11-19');
  const [searchQuery, setSearchQuery] = useState('');

  // Applied filter state
  const [appliedFilters, setAppliedFilters] = useState({
    budget: 25000,
    interests: [],
    query: ''
  });

  // Modal states
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [bookingModalDestination, setBookingModalDestination] = useState(null);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) => {
      const next = prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest];
      setAppliedFilters((af) => ({ ...af, interests: next }));
      return next;
    });
  };

  const handleCategoryClick = (categoryId) => {
    if (selectedInterests.includes(categoryId)) {
      setSelectedInterests([]);
      setAppliedFilters((af) => ({ ...af, interests: [] }));
    } else {
      setSelectedInterests([categoryId]);
      setAppliedFilters((af) => ({ ...af, interests: [categoryId] }));
    }
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    setAppliedFilters({
      budget: maxBudget,
      interests: selectedInterests,
      query: searchQuery.trim().toLowerCase()
    });
  };

  const handleResetFilters = () => {
    setMaxBudget(25000);
    setSelectedInterests([]);
    setSearchQuery('');
    setAppliedFilters({
      budget: 25000,
      interests: [],
      query: ''
    });
  };

  // Filtered destinations calculation
  const filteredDestinations = useMemo(() => {
    return INITIAL_DESTINATIONS.filter((dest) => {
      if (dest.estimatedCost > appliedFilters.budget) return false;

      if (appliedFilters.interests.length > 0) {
        const matchesInterest = dest.interests.some((i) =>
          appliedFilters.interests.includes(i)
        );
        if (!matchesInterest) return false;
      }

      if (appliedFilters.query) {
        const q = appliedFilters.query;
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesState = dest.state.toLowerCase().includes(q);
        const matchesDesc = dest.description.toLowerCase().includes(q);
        if (!matchesName && !matchesState && !matchesDesc) return false;
      }

      return true;
    });
  }, [appliedFilters]);

  const featuredGoa = INITIAL_DESTINATIONS.find((d) => d.id === 'goa') || INITIAL_DESTINATIONS[0];

  const getCategoryIconComponent = (iconName) => {
    switch (iconName) {
      case 'Waves': return Waves;
      case 'Mountain': return Mountain;
      case 'Landmark': return Landmark;
      case 'Compass': return Compass;
      case 'UtensilsCrossed': return UtensilsCrossed;
      default: return Compass;
    }
  };

  return (
    <div id="explore" data-scene="explore" className="space-y-16 pb-20 z-10 relative">
      {/* ========================================================
          A. EDITORIAL HEADER & FLOATING SEARCH EXPERIENCE
          ======================================================== */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 sm:pt-10">
        {showHero && (
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <span className="eyebrow mb-2">Curated Escapes</span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight">
              Find your <span className="italic text-sand font-normal">somewhere.</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-sand/85 font-sans leading-relaxed">
              Discover places that match your mood, interests and budget.
            </p>
          </div>
        )}

        {/* FLOATING SEARCH CARD */}
        <div className="glass-card-luxury rounded-3xl p-5 sm:p-8 border border-sand/20 shadow-luxury text-ivory">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* 1. Keyword / Destination Input (4 cols) */}
              <div className="md:col-span-4 bg-midnight-dark/80 p-3.5 rounded-2xl border border-sand/15 focus-within:border-terracotta focus-within:ring-2 focus-within:ring-terracotta/20 transition-all">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-sunset mb-1 font-mono">
                  Where to wander?
                </label>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-terracotta shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Goa, Jaipur, beaches, palaces..."
                    className="w-full bg-transparent text-xs font-medium text-ivory placeholder:text-sand/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* 2. Date Pickers (4 cols) */}
              <div className="md:col-span-4 grid grid-cols-2 gap-2 bg-midnight-dark/80 p-3.5 rounded-2xl border border-sand/15">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-sunset mb-1 font-mono">
                    Departure
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-num font-semibold text-ivory focus:outline-none"
                  />
                </div>
                <div className="border-l border-sand/20 pl-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-sunset mb-1 font-mono">
                    Return
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-num font-semibold text-ivory focus:outline-none"
                  />
                </div>
              </div>

              {/* 3. Budget Slider (4 cols) */}
              <div className="md:col-span-4 bg-midnight-dark/80 p-3.5 rounded-2xl border border-sand/15">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-sunset font-mono">
                    Budget Ceiling
                  </label>
                  <span className="text-xs font-num font-extrabold text-sunset">
                    Up to {formatINR(maxBudget)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="25000"
                  step="500"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full accent-terracotta cursor-pointer h-1.5 bg-midnight-600 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-sand/60 font-num font-medium mt-1">
                  <span>₹10,000</span>
                  <span>₹25,000</span>
                </div>
              </div>
            </div>

            {/* Interest Filter Chips & Action Row */}
            <div className="pt-4 border-t border-sand/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sand/70 mr-1 font-mono">
                  Interests:
                </span>
                {AVAILABLE_INTERESTS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border font-sans ${
                        isSelected
                          ? 'bg-terracotta border-terracotta text-ivory shadow-glow'
                          : 'bg-midnight-dark/60 border-sand/20 text-sand hover:border-sand/40 hover:text-ivory'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                {(appliedFilters.query || appliedFilters.interests.length > 0 || appliedFilters.budget !== 25000) && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="btn-luxury-outline text-xs py-2 px-4"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}

                <button
                  type="submit"
                  className="btn-luxury-primary text-xs py-2 px-6"
                >
                  <Search className="w-3.5 h-3.5 text-ivory" />
                  <span>Explore Places</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ========================================================
          B. DESTINATION DISCOVERY GRID
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-sand/15 pb-4">
          <div>
            <span className="eyebrow mb-1">Curated Escapes</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ivory tracking-tight">
              Destinations Across India
            </h2>
            <p className="text-xs sm:text-sm text-sand/70 mt-1">
              Handcrafted packages with live budgets, verified stays, and real-time contingency backups.
            </p>
          </div>

          <span className="text-xs font-semibold text-sunset bg-sunset/15 px-3 py-1 rounded-full border border-sunset/30 font-num">
            Showing {filteredDestinations.length} of {INITIAL_DESTINATIONS.length} places
          </span>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onViewDetails={(d) => setSelectedDestination(d)}
              />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="glass-card-luxury rounded-3xl border border-sand/20 p-12 text-center max-w-lg mx-auto space-y-4 shadow-luxury text-ivory">
            <div className="w-16 h-16 rounded-full bg-midnight-dark text-sunset flex items-center justify-center mx-auto ring-4 ring-terracotta/20">
              <FilterX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ivory">
              No escapes match your criteria
            </h3>
            <p className="text-xs text-sand/70 leading-relaxed font-sans">
              Try adjusting your maximum budget ceiling or clearing interest filters to discover more places.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn-luxury-primary text-xs py-2 px-5 mx-auto"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* ========================================================
          C. EDITORIAL SPOTLIGHT (GOA)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card-luxury rounded-4xl overflow-hidden shadow-luxury border border-sand/20 text-ivory grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT: EDITORIAL COPY & HIGHLIGHTS (6 cols) */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-terracotta/25 text-sunset border border-terracotta/40 font-mono">
                  Featured Spotlight
                </span>
                <div className="flex items-center gap-1 text-xs text-sunset font-bold font-num">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>4.6</span>
                  <span className="text-sand/60 font-normal">({featuredGoa.reviewsCount}+ travelers)</span>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-ivory leading-tight">
                Discover the magic of <span className="italic text-sand font-normal">Goa.</span>
              </h2>

              <p className="text-sm text-sand/85 leading-relaxed font-sans">
                {featuredGoa.longDescription}
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-midnight-dark/80 border border-sand/15 rounded-2xl p-3.5 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sunset shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sand/60 block font-mono">Recommended</span>
                    <span className="text-xs font-bold text-ivory font-num">{featuredGoa.duration}</span>
                  </div>
                </div>

                <div className="bg-midnight-dark/80 border border-sand/15 rounded-2xl p-3.5 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sand/60 block font-mono">Best Season</span>
                    <span className="text-xs font-bold text-ivory font-num">{featuredGoa.bestTimeToVisit} ({featuredGoa.averageTemp})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sand/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-sand/60 block font-medium font-mono">
                  Est. 4-Day Group Budget
                </span>
                <span className="text-2xl font-num font-extrabold text-sunset">
                  {formatINR(featuredGoa.estimatedCost)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedDestination(featuredGoa)}
                  className="btn-luxury-primary text-xs py-2.5 px-6"
                >
                  <span>Explore Goa Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: FULL PHOTO WITH LUXURY OVERLAY (6 cols) */}
          <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-full overflow-hidden">
            <img
              src={featuredGoa.image}
              alt="Discover the magic of Goa"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent via-transparent to-midnight-900/80" />
            <div className="absolute bottom-6 right-6 bg-midnight-dark/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-sand/20 text-xs text-ivory">
              <span className="font-bold text-sunset">Fort Aguada & Coastal Trail</span>
              <p className="text-[10px] text-sand/70">Interactive offline group schedule ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATION DETAILS MODAL */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={Boolean(selectedDestination)}
        onClose={() => setSelectedDestination(null)}
        onBookSimulated={(dest) => setBookingModalDestination(dest)}
      />

      {/* BOOKING MODAL */}
      <BookingModal
        destination={bookingModalDestination}
        isOpen={Boolean(bookingModalDestination)}
        onClose={() => setBookingModalDestination(null)}
      />
    </div>
  );
};

export default Explore;
