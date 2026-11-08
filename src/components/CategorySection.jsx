import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Star, MapPin, Sparkles, Calendar, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CATEGORIES = [
  {
    id: 'Beaches',
    title: 'Beach Escapes',
    subtitle: 'Sun-drenched bays, palm fronds & azure waves',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    count: 'Goa & Gokarna',
    accent: '#E9A45B',
  },
  {
    id: 'Mountains',
    title: 'Mountain Retreats',
    subtitle: 'Misty pine valleys, glacial passes & cedar sanctuaries',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    count: 'Manali & Munnar',
    accent: '#314C42',
  },
  {
    id: 'Culture',
    title: 'Cultural Journeys',
    subtitle: 'Sandstone bastions, desert dynasties & sacred ghats',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    count: 'Jaipur & Varanasi',
    accent: '#C66B4E',
  },
  {
    id: 'Adventure',
    title: 'Adventure',
    subtitle: 'Coastal cliff treks, river rapids & high-altitude trails',
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1200&q=80',
    count: 'Rishikesh & Ladakh',
    accent: '#E9A45B',
  },
  {
    id: 'Food',
    title: 'Food & Culture',
    subtitle: 'Seafood shacks, royal thalis & fragrant spice estates',
    image: 'https://images.unsplash.com/photo-1505253758473-96b3015f21c9?auto=format&fit=crop&w=1200&q=80',
    count: 'Goa & Coorg',
    accent: '#C66B4E',
  },
];

export const COLLECTIONS = CATEGORIES;

export default function CategorySection({ onSelectCategory, onExploreDestination }) {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    } else {
      navigate(`/explore?category=${categoryId}`);
    }
  };

  return (
    <section
      id="categories"
      data-scene="categories"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative"
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <span className="eyebrow mb-2">Curated Escapes</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ivory tracking-tight">
            Made for the way you <span className="italic text-sand font-normal">travel.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-sand/80 max-w-xl font-sans">
            Whether you seek secluded shores, royal heritage corridors, or crisp mountain air, each collection is carefully assembled for deep discovery.
          </p>
        </div>

        <button
          onClick={() => navigate('/explore')}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-sunset hover:text-ivory uppercase font-mono transition-colors group self-start md:self-auto"
        >
          <span>View All 14 Destinations</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 5 Photographic Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
        {CATEGORIES.map((col) => (
          <motion.div
            key={col.id}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => handleCategoryClick(col.id)}
            className="group relative h-80 rounded-3xl overflow-hidden glass-card-luxury border border-sand/20 shadow-card hover:shadow-cardHover cursor-pointer flex flex-col justify-end p-5"
          >
            {/* Background Image with Zoom */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: `url(${col.image})` }}
            />
            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/50 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

            {/* Content */}
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sunset font-mono block mb-1">
                {col.count}
              </span>
              <h3 className="text-xl font-serif font-bold text-ivory group-hover:text-sunset transition-colors leading-tight">
                {col.title}
              </h3>
              <p className="text-xs text-sand/75 mt-1 line-clamp-2 font-sans italic">
                {col.subtitle}
              </p>

              <div className="mt-3 pt-2.5 border-t border-sand/15 flex items-center justify-between text-xs text-sand/90">
                <span className="font-semibold text-[10px] font-mono uppercase tracking-wider">
                  Explore
                </span>
                <span className="w-6 h-6 rounded-full bg-terracotta/80 text-ivory flex items-center justify-center group-hover:bg-sunset group-hover:text-midnight transition-colors">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FEATURED DESTINATION SPOTLIGHT — Magazine-Style Editorial Card */}
      <div className="glass-card-luxury rounded-4xl border border-sand/20 overflow-hidden shadow-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Large Photographic Half */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[460px] overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-midnight/90 via-midnight/40 to-transparent" />

            <div className="absolute top-6 left-6 z-10 flex gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-terracotta text-ivory font-mono shadow-sm">
                Curator's Pick
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-midnight-dark/80 backdrop-blur-md text-sunset border border-sand/15 font-mono">
                Goa Getaway
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex items-center gap-1.5 text-sunset mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-sunset text-sunset" />
                ))}
                <span className="text-xs font-num font-bold text-ivory ml-1">4.6 / 5.0</span>
                <span className="text-xs text-sand/60">(340 reviews)</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-ivory tracking-tight drop-shadow-md">
                Goa — Coastal Sanctuaries & Portuguese Echoes
              </h3>
            </div>
          </div>

          {/* Editorial Content Half */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-midnight-dark/80 backdrop-blur-xl">
            <div>
              <span className="eyebrow mb-2">Destination Spotlight</span>
              <h4 className="text-2xl font-serif font-bold text-ivory mt-1">
                Where sun-drenched sands meet centuries of heritage.
              </h4>
              <p className="text-sm text-sand/80 mt-3 font-sans leading-relaxed">
                From morning walks along the ramparts of Fort Aguada to slow sunset river cruises on the Mandovi, Goa balances serene relaxation with electric group energy.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-sand/15">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sand/60 block">Est. Budget</span>
                  <span className="font-num text-lg font-bold text-sunset">₹18,500</span>
                  <span className="text-[11px] text-sand/60 block">per wanderer / 4 days</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sand/60 block">Best Season</span>
                  <span className="font-sans text-sm font-bold text-ivory">Nov — March</span>
                  <span className="text-[11px] text-sand/60 block">Mild breeze & clear seas</span>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sand/60 block">Highlights</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Fort Aguada Bastion', 'Calangute Beach Watersports', 'Old Goa Basilicas', 'Mandovi Twilight Cruise'].map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-sand/10 text-sand border border-sand/10"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 flex items-center gap-3">
              <button
                onClick={() => {
                  if (onExploreDestination) {
                    onExploreDestination('goa');
                  } else {
                    navigate('/explore');
                  }
                }}
                className="btn-luxury-primary flex-1 text-xs sm:text-sm py-3 px-5 text-center justify-center"
              >
                <Compass className="w-4 h-4 text-ivory" />
                <span>Explore Goa Itinerary</span>
              </button>
              <button
                onClick={() => navigate('/group')}
                className="btn-luxury-outline text-xs sm:text-sm py-3 px-5"
              >
                <span>Group Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
