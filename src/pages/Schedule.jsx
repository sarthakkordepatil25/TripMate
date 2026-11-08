import React from 'react';
import { useApp } from '../context/AppContext';
import Timeline from '../components/Timeline';
import confetti from 'canvas-confetti';
import {
  Download,
  CheckCircle2,
  Sparkles,
  MapPin,
  Calendar,
  ShieldCheck,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Schedule = () => {
  const {
    downloadForOfflineUse,
    isOfflineReady,
    activeDay,
    selectedBackupPlanId,
    backupPlans,
    resetItineraryToOriginal
  } = useApp();

  const handleDownloadClick = () => {
    downloadForOfflineUse();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#C66B4E', '#E9A45B', '#F2E8D8', '#FFFDF7']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const selectedPlan = backupPlans.find((p) => p.id === selectedBackupPlanId);

  return (
    <div id="schedule" data-scene="schedule" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn pb-24 z-10 relative text-ivory">
      {/* TRIP COVER BANNER WITH PHOTOGRAPHY */}
      <div className="relative rounded-4xl overflow-hidden shadow-luxury min-h-[300px] sm:min-h-[340px] flex flex-col justify-between p-6 sm:p-10 text-ivory bg-midnight-dark border border-sand/20">
        <img
          src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85"
          alt="Goa Getaway Itinerary Cover"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-800/60 to-black/30" />

        {/* Top Pills */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-terracotta text-ivory text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm font-mono">
              Active Expedition
            </span>
            <div className="flex items-center gap-1.5 bg-midnight-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-ivory border border-sand/20 font-num">
              <Calendar className="w-3.5 h-3.5 text-sunset" />
              <span>Nov 15 – Nov 19, 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-1.5 border font-mono ${
              isOfflineReady
                ? 'bg-forest/80 text-ivory border-forest/60'
                : 'bg-midnight-dark/60 text-sand/70 border-sand/20'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isOfflineReady ? 'Offline Synced' : 'Ready to Download'}</span>
            </span>
          </div>
        </div>

        {/* Bottom Banner Titles & Actions */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-8">
          <div>
            <span className="eyebrow text-sunset">Every day, a new story.</span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory tracking-tight leading-tight mt-1">
              Goa Getaway
            </h1>
            <div className="flex items-center gap-4 text-xs text-sand/80 font-medium mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                Candolim & Panaji, North Goa
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-num">
                <Users className="w-3.5 h-3.5 text-sunset" />
                4 Travelers
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadClick}
            className="btn-luxury-primary text-xs py-3 px-6 shadow-glow"
          >
            {isOfflineReady ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-ivory" />
                <span>Trip Saved Offline (Sync Again)</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-ivory" />
                <span>Download for Offline Use</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* DISRUPTION NOTICE BANNER IF REPLACED STOP IS ACTIVE */}
      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-3xl bg-sunset/15 border border-sunset/35 text-sand flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-luxury"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-full bg-sunset text-midnight-dark shrink-0 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-sunset block font-mono">
                Itinerary Updated • Disruption Mitigated
              </span>
              <p className="text-base font-serif font-bold text-ivory">
                "{selectedPlan.name}" active in Day 2 schedule
              </p>
              <p className="text-xs text-sand/80 font-sans">
                Fort Aguada was substituted due to rainfall advisory. All subsequent stops remain intact.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/alerts"
              className="btn-luxury-primary text-xs py-2 px-4"
            >
              Alert Details
            </Link>
            <button
              onClick={resetItineraryToOriginal}
              className="btn-luxury-outline text-xs py-2 px-4"
            >
              Reset to Fort Aguada
            </button>
          </div>
        </motion.div>
      )}

      {/* TIMELINE COMPONENT CONTAINER */}
      <div className="glass-card-luxury rounded-3xl border border-sand/20 shadow-luxury p-6 sm:p-8">
        <Timeline />
      </div>

      {/* OFFLINE PROTECTION INFORMATION CARD */}
      <div className="p-6 rounded-3xl bg-midnight-dark/80 border border-sand/15 flex items-start gap-4 text-xs text-sand/80">
        <div className="p-2.5 rounded-2xl bg-forest text-sand shrink-0 mt-0.5 border border-forest/60">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="space-y-1">
          <p className="font-serif font-bold text-ivory text-sm">
            Zero-Reception Offline Guarantee
          </p>
          <p className="leading-relaxed font-sans">
            All itinerary stops, GPS markers, confirmed e-passes, and group decisions are mirrored into your browser's persistent LocalStorage cache. Even without cellular reception across isolated beaches in Goa, your daily schedule remains 100% accessible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
