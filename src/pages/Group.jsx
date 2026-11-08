import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import VotingPanel from '../components/VotingPanel';
import ChatPanel from '../components/ChatPanel';
import { Users, UserPlus, Sparkles, MapPin, Calendar, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const Group = () => {
  const { groupMembers, showToast } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareInvite = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Invite Link Copied! 📋', 'Share with friends to collaborate on this Goa trip.', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div id="group" data-scene="group" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn pb-24 z-10 relative">
      {/* PAGE HEADER & TRIP TITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-sand/15">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="eyebrow text-sunset">
              Collaborative Planning
            </span>
            <div className="flex items-center gap-1.5 text-xs text-sand/70 font-semibold font-num">
              <Calendar className="w-3.5 h-3.5 text-terracotta" />
              <span>Nov 15 – Nov 19, 2026</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-ivory">
            Better journeys are <span className="italic text-sand font-normal">shared.</span>
          </h1>
          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-sand/80">
            <MapPin className="w-4 h-4 text-terracotta" />
            <strong className="text-ivory font-semibold">Goa Coastal Getaway — 4 Travelers</strong>
            <span className="text-sand/60">(Sam, Priya, Rohan, and You)</span>
          </div>
        </div>

        {/* MEMBER AVATAR STACK & INVITE ACTION */}
        <div className="flex items-center gap-4">
          <div className="flex items-center -space-x-3 overflow-hidden">
            {groupMembers.map((m) => (
              <span
                key={m.id}
                title={`${m.name} (${m.isCurrentUser ? 'You' : 'Member'})`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-midnight ring-2 ring-midnight-dark text-xs font-bold shadow-md text-ivory"
                style={{ backgroundColor: m.color + '40' }}
              >
                {m.name.charAt(0)}
              </span>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleShareInvite}
            className="btn-luxury-outline text-xs py-2 px-4 shadow-sm"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Link Copied</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 text-sunset" />
                <span>Invite Travelers</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* MODERN SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: TRIP CONTEXT & CHAT (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Group Trip Context Card */}
          <div className="glass-card-luxury rounded-3xl p-6 text-ivory border border-sand/20 shadow-luxury space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sunset font-mono">
                Active Expedition
              </span>
              <span className="text-xs bg-midnight-dark/80 px-3 py-1 rounded-full text-sand font-medium border border-sand/15">
                North & South Goa
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-ivory">
                Goa Getaway 2026
              </h3>
              <p className="text-xs text-sand/80 mt-1 leading-relaxed font-sans">
                4-day journey spanning Candolim shores, Mandovi River luxury catamaran sailing, and Old Goa historical cathedrals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 text-xs border-t border-sand/15 font-num">
              <div>
                <span className="text-[10px] text-sand/60 block uppercase font-mono">Consensus Rule</span>
                <span className="text-xs font-bold text-sunset">Simple Majority</span>
              </div>
              <div>
                <span className="text-[10px] text-sand/60 block uppercase font-mono">Group Budget</span>
                <span className="text-xs font-bold text-ivory">₹30,000 Allocated</span>
              </div>
            </div>
          </div>

          {/* Group Chat */}
          <ChatPanel />
        </div>

        {/* RIGHT COLUMN: VOTING PANEL & CONSENSUS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <VotingPanel />
        </div>
      </div>
    </div>
  );
};

export default Group;
