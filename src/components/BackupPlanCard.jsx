import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, CheckCircle2, Navigation, Clock, Users, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const BackupPlanCard = ({ backupPlan, index }) => {
  const {
    replaceItineraryStop,
    selectedBackupPlanId,
    addCustomVotingActivity,
    votingActivities
  } = useApp();

  const navigate = useNavigate();

  const isSelected = selectedBackupPlanId === backupPlan.id;
  const isAlreadyInVote = votingActivities.some(
    (a) => a.title.toLowerCase() === backupPlan.name.toLowerCase()
  );

  const handlePick = () => {
    replaceItineraryStop(2, '09:00', backupPlan);
  };

  const handleAddToGroupVote = () => {
    addCustomVotingActivity({
      id: `vote-${backupPlan.id}`,
      title: backupPlan.name,
      subtitle: `${backupPlan.type} alternative · ${backupPlan.distance} away · ${backupPlan.openingHours}`
    });
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`group glass-card-luxury rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden text-ivory ${
        isSelected
          ? 'border-terracotta ring-2 ring-terracotta/40 shadow-luxury'
          : 'border-sand/15 hover:border-sand/30 shadow-card'
      }`}
    >
      {/* LARGE PHOTOGRAPH */}
      <div className="relative h-52 w-full bg-midnight-dark overflow-hidden">
        <img
          src={backupPlan.image}
          alt={backupPlan.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=600&q=80';
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/90 via-midnight-800/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <span className="bg-terracotta text-ivory text-[10px] font-mono font-bold px-3 py-1 rounded-full shadow-sm">
            Alternative #{index + 1}
          </span>
          <span className="bg-midnight/80 backdrop-blur-md text-ivory text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-sand/15">
            <Building2 className="w-3 h-3 text-sunset" />
            {backupPlan.type}
          </span>
        </div>

        {isSelected && (
          <div className="absolute top-3.5 right-3.5 bg-forest text-ivory text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 z-10 font-mono border border-forest/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Currently Applied</span>
          </div>
        )}

        {/* Distance & Hours overlay at bottom of photo */}
        <div className="absolute bottom-3 left-3.5 flex items-center gap-2 z-10 font-num">
          <span className="bg-midnight-dark/80 backdrop-blur-md text-sand text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-sand/15">
            <Navigation className="w-3 h-3 text-sunset" />
            {backupPlan.distance}
          </span>
          <span className="bg-midnight-dark/80 backdrop-blur-md text-sand text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-sand/15">
            <Clock className="w-3 h-3 text-sunset" />
            {backupPlan.openingHours}
          </span>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="p-6 flex-1 flex flex-col justify-between text-xs space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="text-xl font-serif font-bold text-ivory tracking-tight group-hover:text-sunset transition-colors">
              {backupPlan.name}
            </h4>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sand/60 shrink-0 bg-midnight-dark px-2 py-0.5 rounded-md font-mono">
              {backupPlan.category}
            </span>
          </div>

          <p className="text-xs text-sand/75 leading-relaxed line-clamp-2 mb-3 font-sans">
            {backupPlan.description}
          </p>

          <div className="p-3 rounded-2xl bg-midnight-dark/80 border border-sand/15 text-xs text-sand font-medium">
            💡 <strong>Why it fits:</strong> {backupPlan.whyChoose}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="pt-3 border-t border-sand/15 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            {/* PICK BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handlePick}
              className={`py-2.5 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                isSelected
                  ? 'bg-forest text-ivory hover:bg-forest-light'
                  : 'btn-luxury-primary'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Selected</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pick Plan</span>
                </>
              )}
            </motion.button>

            {/* ADD TO GROUP VOTE BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToGroupVote}
              disabled={isAlreadyInVote}
              className={`py-2.5 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border shadow-2xs ${
                isAlreadyInVote
                  ? 'bg-midnight-dark/40 border-sand/10 text-sand/40 cursor-not-allowed'
                  : 'btn-luxury-outline'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-sunset" />
              <span>{isAlreadyInVote ? 'In Vote' : 'Add to Vote'}</span>
            </motion.button>
          </div>

          {isSelected && (
            <button
              onClick={() => navigate('/schedule')}
              className="w-full text-center text-[11px] font-bold text-sunset hover:underline flex items-center justify-center gap-1 pt-1 font-sans"
            >
              <span>View Day 2 schedule with this contingency</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BackupPlanCard;
