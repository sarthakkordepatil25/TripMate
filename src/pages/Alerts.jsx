import React from 'react';
import { useApp } from '../context/AppContext';
import DisruptionCard from '../components/DisruptionCard';
import BackupPlanCard from '../components/BackupPlanCard';
import {
  CloudLightning,
  RotateCcw,
  Info,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Alerts = () => {
  const { backupPlans, resetItineraryToOriginal, selectedBackupPlanId } = useApp();

  return (
    <div id="alerts" data-scene="alerts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn pb-24 z-10 relative text-ivory">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-sand/15">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="eyebrow text-sunset flex items-center gap-1.5">
              <CloudLightning className="w-3.5 h-3.5 text-sunset" />
              Dynamic Contingency Engine
            </span>
            <span className="text-xs text-sand/60 font-semibold font-mono">Real-Time Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory">
            Every plan deserves a <span className="italic text-sand font-normal">backup.</span>
          </h1>
          <p className="text-xs sm:text-sm text-sand/80 mt-1">
            Coastal squall and storm advisory detected in Candolim. Explore sheltered contingency plans for Day 2.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {selectedBackupPlanId && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={resetItineraryToOriginal}
              className="btn-luxury-outline text-xs py-2 px-4 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-sunset" />
              <span>Reset to Fort Aguada</span>
            </motion.button>
          )}

          <Link
            to="/schedule"
            className="btn-luxury-primary text-xs py-2 px-5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Check Day 2 Timeline</span>
          </Link>
        </div>
      </div>

      {/* DISRUPTION ALERT CARD */}
      <DisruptionCard />

      {/* CURATED BACKUP PLANS SECTION */}
      <div className="space-y-6">
        <div>
          <span className="eyebrow text-sunset">Sheltered Sanctuaries</span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-ivory mt-1">
            Curated Backup Plan Options
          </h3>
          <p className="text-xs sm:text-sm text-sand/75 mt-0.5">
            Select an indoor or covered sanctuary to seamlessly update Day 2 schedule or push to group voting.
          </p>
        </div>

        {/* 3 BACKUP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {backupPlans.map((plan, index) => (
            <BackupPlanCard key={plan.id} backupPlan={plan} index={index} />
          ))}
        </div>
      </div>

      {/* ACADEMIC DISCLAIMER BANNER */}
      <div className="p-5 rounded-3xl bg-midnight-dark/80 border border-sand/15 text-xs text-sand/70 space-y-1.5 font-sans">
        <div className="flex items-center gap-2 font-serif font-bold text-ivory">
          <Info className="w-4 h-4 text-sunset" />
          <span>Academic Simulation Notice</span>
        </div>
        <p className="leading-relaxed">
          These alerts and alternative venue options are simulated for the Semester III Software Prototyping academic demonstration. In production deployment, this system interfaces with state disaster management feeds, Doppler radar models, and partner venue ticketing APIs.
        </p>
      </div>
    </div>
  );
};

export default Alerts;
