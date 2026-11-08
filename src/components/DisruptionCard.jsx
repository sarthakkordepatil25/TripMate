import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, MapPin, CloudRain, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const DisruptionCard = () => {
  const { disruption, resetItineraryToOriginal, selectedBackupPlanId, backupPlans } = useApp();

  const selectedPlan = backupPlans.find((p) => p.id === selectedBackupPlanId);

  return (
    <div className="glass-card-luxury rounded-4xl overflow-hidden shadow-luxury border border-sand/20 text-ivory relative">
      {/* ATMOSPHERIC BACKGROUND WITH DRAMATIC WEATHER OVERLAY */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80"
          alt="Stormy Weather Alert"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-900 via-midnight-800/90 to-midnight-dark/80" />
      </div>

      <div className="relative z-10 p-6 sm:p-10 space-y-6">
        {/* TOP STATUS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-sunset/20 text-sunset border border-sunset/30">
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-sunset font-mono">
                Active Weather Advisory
              </span>
              <p className="text-xs text-sand/70">
                Automated contingency protocol engaged
              </p>
            </div>
          </div>

          <span className="text-[11px] font-extrabold uppercase px-3 py-1 rounded-full bg-sunset text-midnight-dark shadow-goldGlow font-mono">
            Priority Advisory
          </span>
        </div>

        {/* HEADLINE & DETAILS */}
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ivory tracking-tight leading-tight">
            {disruption.title}
          </h2>
          <p className="text-sm sm:text-base text-sand font-medium">
            {disruption.subtitle}
          </p>
          <p className="text-xs text-sand/70 leading-relaxed pt-1 font-sans">
            {disruption.affectedStop.reason}
          </p>
        </div>

        {/* METADATA CHIPS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 bg-midnight-dark/80 border border-sand/15 p-4 rounded-2xl text-xs backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-sunset shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-sand/60 block font-mono">Last Checked</span>
              <span className="font-bold text-ivory font-num">{disruption.lastChecked}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-terracotta shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-sand/60 block font-mono">Location Detected</span>
              <span className="font-bold text-ivory truncate">{disruption.currentLocation}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-sunset shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-sand/60 block font-mono">Schedule Impact</span>
              <span className="font-bold text-sunset font-num">Day 2 • 09:00 Stop</span>
            </div>
          </div>
        </div>

        {/* IF A BACKUP PLAN IS ACTIVELY SELECTED */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-5 rounded-2xl bg-forest/40 border border-sand/20 text-ivory flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-luxury"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sunset text-midnight-dark shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-serif font-bold text-ivory text-sm block">
                  Contingency Applied: "{selectedPlan.name}"
                </span>
                <p className="text-sand/80">
                  Day 2 schedule updated with this sheltered venue. Remaining stops are preserved.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/schedule"
                className="btn-luxury-primary text-xs py-2 px-4"
              >
                View Timeline
              </Link>
              <button
                onClick={resetItineraryToOriginal}
                className="btn-luxury-outline text-xs py-2 px-4"
              >
                Rebuild Schedule
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DisruptionCard;
