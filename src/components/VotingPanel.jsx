import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, CheckCircle, Flame, Sparkles, Scale, Info, PlusCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const VotingPanel = () => {
  const { votingActivities, userVote, castVote } = useApp();

  // Calculate total votes
  const totalVotes = votingActivities.reduce((acc, curr) => acc + curr.votes, 0);

  // Determine top vote count
  const maxVotes = Math.max(...votingActivities.map((a) => a.votes), 0);

  // Find leader(s)
  const leaders = votingActivities.filter((a) => a.votes === maxVotes && a.votes > 0);
  const isTie = leaders.length > 1;
  const winner = leaders.length === 1 ? leaders[0] : null;

  return (
    <div className="glass-card-luxury rounded-3xl border border-sand/20 shadow-luxury p-6 sm:p-8 flex flex-col justify-between text-ivory">
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between pb-5 border-b border-sand/15 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sunset bg-sunset/15 px-3 py-0.5 rounded-full border border-sunset/30 font-mono">
                Consensus Engine
              </span>
              <span className="text-xs text-sand/70 font-semibold font-num">
                {totalVotes} total votes
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-ivory mt-1">
              Vote on Group Activities
            </h3>
          </div>

          <Link
            to="/alerts"
            className="btn-luxury-outline text-xs py-1.5 px-3.5"
            title="Browse contingency options"
          >
            <PlusCircle className="w-3.5 h-3.5 text-sunset" />
            <span>Add Backup</span>
          </Link>
        </div>

        {/* DECISION / WINNER BANNER */}
        <div className="mb-6">
          {winner && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-gradient-to-r from-midnight-dark via-midnight to-forest/40 border border-sand/20 text-ivory flex items-center justify-between gap-4 shadow-luxury"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-full bg-sunset text-midnight-dark shadow-goldGlow shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sunset font-mono">
                    Majority Choice • Confirmed
                  </span>
                  <p className="text-lg font-serif font-bold text-ivory leading-tight">
                    {winner.title}
                  </p>
                  <p className="text-xs text-sand/80 mt-0.5 font-num">
                    Leading with {winner.votes} out of {totalVotes} group votes.
                  </p>
                </div>
              </div>
              <span className="text-xs font-serif font-bold px-3 py-1 rounded-full bg-sunset/20 text-sunset border border-sunset/40 shrink-0 font-mono">
                Selected
              </span>
            </motion.div>
          )}

          {isTie && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-sunset/15 border border-sunset/30 text-sand flex items-center gap-3.5"
            >
              <div className="p-2.5 rounded-full bg-sunset text-midnight-dark shrink-0 shadow-md">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sunset font-mono">
                  Tie Alert • Decision Pending
                </span>
                <p className="text-xs font-semibold text-ivory">
                  Vote is currently tied between {leaders.map((l) => `"${l.title}"`).join(' and ')} ({maxVotes} votes each).
                </p>
              </div>
            </motion.div>
          )}

          {totalVotes === 0 && (
            <div className="p-4 rounded-2xl bg-midnight-dark/80 border border-sand/15 text-sand/70 flex items-center gap-2 text-xs">
              <Info className="w-4 h-4 text-sunset" />
              <span>No votes cast yet. Cast your ballot below to establish group consensus!</span>
            </div>
          )}
        </div>

        {/* ACTIVITIES LIST */}
        <div className="space-y-4">
          {votingActivities.map((activity, index) => {
            const isUserVoted = userVote === activity.id;
            const percentage = totalVotes > 0 ? Math.round((activity.votes / totalVotes) * 100) : 0;
            const isLeading = maxVotes > 0 && activity.votes === maxVotes;

            return (
              <motion.div
                key={activity.id}
                layout
                className={`p-5 rounded-2xl border transition-all duration-300 ${
                  isUserVoted
                    ? 'border-terracotta bg-midnight-dark/90 ring-2 ring-terracotta/30 shadow-luxury'
                    : 'border-sand/15 bg-midnight-dark/60 hover:border-sand/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-sand/50 font-mono">#{index + 1}</span>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-ivory tracking-tight">
                        {activity.title}
                      </h4>
                      {activity.isCustom && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sunset/20 text-sunset border border-sunset/30 font-mono">
                          Backup Pick
                        </span>
                      )}
                      {isLeading && !isTie && activity.votes > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest/80 text-sand flex items-center gap-1 font-mono">
                          <Flame className="w-3 h-3 text-sunset fill-sunset" /> Leading
                        </span>
                      )}
                    </div>
                    {activity.subtitle && (
                      <p className="text-xs text-sand/75 mt-0.5 leading-snug font-sans">
                        {activity.subtitle}
                      </p>
                    )}
                  </div>

                  {/* VOTE BUTTON */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => castVote(activity.id)}
                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
                      isUserVoted
                        ? 'bg-terracotta text-ivory shadow-glow hover:bg-terracotta-hover'
                        : 'bg-transparent border border-sand/30 text-sand hover:text-ivory hover:border-sand/60'
                    }`}
                  >
                    {isUserVoted ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Voted</span>
                      </>
                    ) : (
                      <span>Vote</span>
                    )}
                  </motion.button>
                </div>

                {/* ANIMATED PROGRESS BAR */}
                <div className="space-y-1.5 pt-1">
                  <div className="w-full bg-midnight-600 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        isLeading ? 'bg-gradient-to-r from-terracotta to-sunset' : 'bg-sand/40'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-sand/70 font-num">
                    <span className="font-semibold text-ivory">
                      {activity.votes} {activity.votes === 1 ? 'vote' : 'votes'} ({percentage}%)
                    </span>
                    {activity.voters && activity.voters.length > 0 && (
                      <span className="text-[11px] text-sand/60 truncate max-w-[220px]">
                        Voted by: <strong className="text-ivory font-medium">{activity.voters.join(', ')}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="mt-6 pt-4 border-t border-sand/15 text-[11px] text-sand/60 flex items-center justify-between font-mono">
        <span>Rule: 1 active vote per traveler. Switching vote transfers counts automatically.</span>
      </div>
    </div>
  );
};

export default VotingPanel;
