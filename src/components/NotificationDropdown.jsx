import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, AlertTriangle, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const NotificationDropdown = () => {
  const { notifications, unreadNotificationsCount, markAllNotificationsRead } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (link) => {
    setIsOpen(false);
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-sand/80 hover:text-ivory hover:bg-white/10 rounded-full transition-colors focus:outline-none"
        aria-label="View notifications"
        title="Travel alerts and group updates"
      >
        <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sunset text-[9px] font-extrabold text-midnight-dark shadow-sm ring-2 ring-midnight animate-pulse font-num">
            {unreadNotificationsCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-80 sm:w-96 glass-card-luxury rounded-3xl border border-sand/20 shadow-luxury z-50 overflow-hidden text-ivory"
          >
            <div className="flex items-center justify-between px-5 py-3.5 bg-midnight-dark/80 border-b border-sand/15">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sunset font-mono">
                  Advisories & Updates
                </span>
                {unreadNotificationsCount > 0 && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sunset/20 text-sunset border border-sunset/30 font-num">
                    {unreadNotificationsCount} unread
                  </span>
                )}
              </div>
              {unreadNotificationsCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs text-sand hover:text-ivory hover:underline font-semibold"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="divide-y divide-sand/10 max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-sand/60 text-xs">
                  No new travel alerts.
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item.link)}
                    className={`p-4 hover:bg-white/5 transition-colors cursor-pointer flex items-start gap-3 ${
                      !item.read ? 'bg-terracotta/10' : ''
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.type === 'warning' && (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sunset/20 text-sunset border border-sunset/30">
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {item.type === 'info' && (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-900/40 text-blue-300 border border-blue-700/40">
                          <Users className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {item.type === 'success' && (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-700/40">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className={`text-xs font-serif font-bold ${!item.read ? 'text-ivory' : 'text-sand/80'}`}>
                          {item.title}
                        </p>
                        <span className="text-[10px] text-sand/50 shrink-0 font-num">{item.time}</span>
                      </div>
                      <p className="text-xs text-sand/70 mt-0.5 leading-snug line-clamp-2">
                        {item.message}
                      </p>
                      {item.link && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sunset mt-1.5 hover:underline">
                          Review action <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
