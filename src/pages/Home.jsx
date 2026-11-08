import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Compass, Sparkles, ArrowDown, Users, MapPin, ArrowRight,
  Star, Shield, Wifi, Globe, TrendingUp, Heart, Zap, Camera
} from 'lucide-react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import FinalCTA from '../components/FinalCTA';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';
import BookingModal from '../components/BookingModal';

gsap.registerPlugin(ScrollTrigger);

/* ─── Feature strip data ─────────────────────────────────── */
const FEATURES = [
  {
    icon: Globe,
    title: 'Discover India',
    body: "14+ curated escapes across India's most spectacular terrain — coastal, heritage, mountain, and spiritual.",
    accent: '#E9A45B',
  },
  {
    icon: Users,
    title: 'Plan Together',
    body: 'Real-time group consensus, collaborative voting, and shared itineraries. No more endless WhatsApp threads.',
    accent: '#C66B4E',
  },
  {
    icon: Wifi,
    title: 'Zero Connectivity Fears',
    body: 'Full offline access to your itinerary, maps, and bookings. Even in the most remote corner of the Himalayas.',
    accent: '#314C42',
  },
  {
    icon: TrendingUp,
    title: 'Smart Budget Engine',
    body: 'Live expense tracking, per-person splits, and instant alerts when you approach your budget ceiling.',
    accent: '#E9A45B',
  },
  {
    icon: Zap,
    title: 'Disruption Intelligence',
    body: 'Real-time alerts for weather, flight changes, and local disruptions — plus curated backup plans, instantly.',
    accent: '#C66B4E',
  },
  {
    icon: Shield,
    title: 'Zero Hidden Markups',
    body: 'Transparent pricing direct from hotels and transport providers. What you see is exactly what you pay.',
    accent: '#314C42',
  },
];

/* ─── Testimonials ───────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "TripMate turned our chaotic group Goa trip into a masterpiece. The offline mode saved us when our mobile data died on NH66.",
    author: "Priya Nair",
    role: "Travel Photographer, Mumbai",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    quote: "The budget tracking with real currency conversion meant zero bill-splitting arguments at the end. Revolutionary for group travel.",
    author: "Arjun Mehta",
    role: "Product Designer, Bangalore",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    quote: "We discovered Coorg through TripMate's curated picks. The disruption alerts rerouted us perfectly when a landslide closed our original route.",
    author: "Sneha Krishnamurthy",
    role: "Software Engineer, Hyderabad",
    avatar: "https://i.pravatar.cc/80?img=29",
  },
];

/* ─── Home Page ──────────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate();
  const sectionsRef = useRef([]);
  const revealRefs = useRef([]);

  /* Destination modal state */
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [bookingModalDestination, setBookingModalDestination] = useState(null);

  /* Featured destinations — first 6 */
  const featuredDestinations = useMemo(
    () => INITIAL_DESTINATIONS.slice(0, 6),
    []
  );

  /* ── GSAP scroll-reveal setup ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Reveal up — batch for performance */
      ScrollTrigger.batch('.gsap-reveal', {
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
          }),
        start: 'top 88%',
      });

      gsap.set('.gsap-reveal', { opacity: 0, y: 44 });

      /* Parallax for section divider photos */
      gsap.utils.toArray('.parallax-img').forEach((el) => {
        gsap.to(el, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative z-10">
      {/* ══════════════════════════════════════════════════════
          1. HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <Hero
        onExploreClick={() => {
          document.getElementById('featured-destinations')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onGroupClick={() => navigate('/group')}
      />

      {/* ══════════════════════════════════════════════════════
          2. EDITORIAL MARQUEE STRIP
          ══════════════════════════════════════════════════════ */}
      <div className="overflow-hidden border-y border-sand/15 py-3.5 bg-midnight-dark/60 backdrop-blur-sm">
        <div
          className="flex gap-10 w-max animate-marquee"
          style={{ animation: 'marquee 28s linear infinite' }}
        >
          {[...Array(3)].flatMap(() =>
            [
              '✦ Goa — Coastal Bliss',
              '✦ Manali — Glacial Peaks',
              '✦ Jaipur — Royal Heritage',
              '✦ Varanasi — Sacred Ghats',
              '✦ Coorg — Misty Spice Estates',
              '✦ Ladakh — High Altitude Desert',
              '✦ Munnar — Emerald Tea Hills',
              '✦ Rishikesh — Rapids & Yogashrams',
            ].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="text-[11px] font-mono tracking-[0.22em] text-sand/60 uppercase whitespace-nowrap"
              >
                {item}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. FEATURES GRID — What makes TripMate different
          ══════════════════════════════════════════════════════ */}
      <section data-scene="hero" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14 gsap-reveal">
          <span className="eyebrow">Why TripMate</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-serif font-bold text-ivory tracking-tight">
            Travel the way <span className="italic text-sand font-normal">it was meant to be.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-sand/75 max-w-xl mx-auto font-sans leading-relaxed">
            Every feature exists for one reason — to give you a journey that feels effortless, connected, and deeply personal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => (
            <div
              key={feat.title}
              className="gsap-reveal group glass-card-luxury rounded-3xl p-7 border border-sand/15 shadow-card hover:border-sand/30 hover:shadow-cardHover transition-all duration-500"
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${feat.accent}22` }}
              >
                <feat.icon className="w-5 h-5" style={{ color: feat.accent }} />
              </div>
              <h3 className="text-base font-bold text-ivory mb-2 font-sans">{feat.title}</h3>
              <p className="text-sm text-sand/70 leading-relaxed font-sans">{feat.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. CINEMATIC DIVIDER — Full-bleed editorial photo
          ══════════════════════════════════════════════════════ */}
      <div data-scene="explore" className="relative h-[42vh] overflow-hidden my-4">
        <div
          className="parallax-img absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/60 to-midnight/30" />
        <div className="relative z-10 h-full flex items-center px-8 sm:px-16 max-w-2xl">
          <div className="gsap-reveal">
            <span className="eyebrow mb-3">The Coast Awaits</span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-ivory leading-tight">
              Sun. Sand. <span className="italic text-sand font-normal">Zero worries.</span>
            </h3>
            <p className="mt-4 text-sm text-sand/80 font-sans leading-relaxed max-w-sm">
              India's coastline stretches 7,500 km. TripMate puts every sunlit bay, hidden cove and coconut grove at your fingertips.
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="btn-luxury-primary mt-6 text-sm py-3 px-7"
            >
              <Compass className="w-4 h-4 text-ivory" />
              <span>Explore Coastal Destinations</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          5. DESTINATION COLLECTIONS (CategorySection)
          ══════════════════════════════════════════════════════ */}
      <CategorySection
        onSelectCategory={(category) => {
          navigate(`/explore?category=${category}`);
        }}
      />

      {/* ══════════════════════════════════════════════════════
          6. FEATURED DESTINATIONS PREVIEW
          ══════════════════════════════════════════════════════ */}
      <section id="featured-destinations" data-scene="explore" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="gsap-reveal">
            <span className="eyebrow">Featured Escapes</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-serif font-bold text-ivory tracking-tight">
              Where will you <span className="italic text-sand font-normal">wander next?</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-sand/75 max-w-xl font-sans leading-relaxed">
              Handpicked destinations across India — each with curated itineraries, real-time availability and transparent pricing.
            </p>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="gsap-reveal inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-sunset hover:text-ivory uppercase font-mono transition-colors whitespace-nowrap"
          >
            <span>View All 14 Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map((dest) => (
            <div key={dest.id} className="gsap-reveal">
              <DestinationCard
                destination={dest}
                onSelect={setSelectedDestination}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center gsap-reveal">
          <button
            onClick={() => navigate('/explore')}
            className="btn-luxury-outline text-sm py-3.5 px-10"
          >
            <Compass className="w-4 h-4 text-sunset" />
            <span>Explore Full Collection</span>
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. CINEMATIC DIVIDER 2 — Mountains
          ══════════════════════════════════════════════════════ */}
      <div data-scene="alerts" className="relative h-[40vh] overflow-hidden my-4">
        <div
          className="parallax-img absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2400&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-midnight/95 via-midnight/55 to-midnight/20" />
        <div className="relative z-10 h-full flex items-center justify-end px-8 sm:px-16">
          <div className="max-w-lg text-right gsap-reveal">
            <span className="eyebrow mb-3">The Mountain Calling</span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-ivory leading-tight">
              Plan for the <span className="italic text-sand font-normal">peaks.</span>
            </h3>
            <p className="mt-4 text-sm text-sand/80 font-sans leading-relaxed max-w-sm ml-auto">
              Manali, Ladakh, Munnar, Ooty — TripMate's offline mode and contingency intelligence keep you safe at altitude.
            </p>
            <button
              onClick={() => navigate('/alerts')}
              className="btn-luxury-primary mt-6 text-sm py-3 px-7 ml-auto"
            >
              <Zap className="w-4 h-4 text-ivory" />
              <span>See Disruption Alerts</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          8. HOW IT WORKS — 3-step editorial flow
          ══════════════════════════════════════════════════════ */}
      <section data-scene="schedule" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14 gsap-reveal">
          <span className="eyebrow">Your Journey Begins</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-serif font-bold text-ivory tracking-tight">
            Three steps to your <span className="italic text-sand font-normal">perfect trip.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              icon: Compass,
              title: 'Discover',
              body: 'Browse 14+ curated Indian destinations. Filter by budget, dates and interests. Find the place that speaks to you.',
              accent: '#E9A45B',
              action: () => navigate('/explore'),
              cta: 'Browse Destinations',
            },
            {
              step: '02',
              icon: Users,
              title: 'Plan Together',
              body: 'Invite your travel circle, vote on activities, and build a shared itinerary with real-time collaboration.',
              accent: '#C66B4E',
              action: () => navigate('/group'),
              cta: 'Open Group Hub',
            },
            {
              step: '03',
              icon: Globe,
              title: 'Travel Freely',
              body: 'Download your trip offline, track expenses live, and receive instant disruption alerts with smart backup plans.',
              accent: '#314C42',
              action: () => navigate('/schedule'),
              cta: 'View Itinerary',
            },
          ].map((step) => (
            <div
              key={step.step}
              className="gsap-reveal glass-card-luxury rounded-3xl p-8 border border-sand/15 shadow-card text-center group hover:border-sand/25 transition-all duration-500 cursor-pointer"
              onClick={step.action}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${step.accent}25` }}
              >
                <step.icon className="w-6 h-6" style={{ color: step.accent }} />
              </div>
              <div
                className="font-num text-5xl font-extrabold mb-3 tracking-tighter leading-none"
                style={{ color: `${step.accent}50` }}
              >
                {step.step}
              </div>
              <h3 className="text-xl font-serif font-bold text-ivory mb-3">{step.title}</h3>
              <p className="text-sm text-sand/70 font-sans leading-relaxed mb-6">{step.body}</p>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
                style={{ color: step.accent }}
              >
                {step.cta}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. TESTIMONIALS
          ══════════════════════════════════════════════════════ */}
      <section data-scene="group" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 gsap-reveal">
          <span className="eyebrow">Traveler Stories</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-serif font-bold text-ivory tracking-tight">
            Real journeys. <span className="italic text-sand font-normal">Real memories.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="gsap-reveal glass-card-luxury rounded-3xl p-7 border border-sand/15 shadow-card flex flex-col gap-5"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-sunset fill-sunset" />
                ))}
              </div>
              <blockquote className="text-sm text-sand/85 font-sans leading-relaxed italic flex-1">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3 pt-3 border-t border-sand/15">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-terracotta/40"
                />
                <div>
                  <p className="text-xs font-bold text-ivory">{t.author}</p>
                  <p className="text-[11px] text-sand/55">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. FINAL CTA
          ══════════════════════════════════════════════════════ */}
      <FinalCTA
        onStartPlan={() => navigate('/explore')}
      />

      {/* Destination Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onBook={(dest) => {
            setSelectedDestination(null);
            setBookingModalDestination(dest);
          }}
        />
      )}

      {/* Booking Modal */}
      {bookingModalDestination && (
        <BookingModal
          destination={bookingModalDestination}
          onClose={() => setBookingModalDestination(null)}
        />
      )}

      {/* Marquee CSS */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
