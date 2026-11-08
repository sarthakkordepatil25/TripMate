import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import { formatINR } from '../utils/currency';
import { storage } from '../utils/storage';
import {
  User,
  Ticket,
  Bookmark,
  LogOut,
  RotateCcw,
  Sparkles,
  Heart,
  CheckCircle2,
  Trash2,
  Edit2,
  MapPin
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Profile = () => {
  const {
    user,
    logout,
    login,
    savedDestinations,
    toggleSaveDestination,
    bookings,
    isOfflineReady
  } = useApp();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'wishlist' | 'settings'
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || 'Alex Morgan');

  const savedList = INITIAL_DESTINATIONS.filter((d) =>
    savedDestinations.includes(d.id)
  );

  const handleUpdateName = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    login(nameInput.trim(), user?.email || 'alex.morgan@tripmate.io');
    setIsEditingName(false);
  };

  const handleClearDemoStorage = () => {
    if (window.confirm('Reset all demo state (itinerary overrides, votes, custom expenses) to factory defaults?')) {
      storage.clearAll();
      window.location.reload();
    }
  };

  return (
    <div id="profile" data-scene="profile" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn pb-24 z-10 relative text-ivory">
      {/* LUXURY TRAVELER PROFILE CARD */}
      <div className="glass-card-luxury rounded-4xl p-6 sm:p-10 border border-sand/20 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative z-10">
          <div className="relative">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={user?.name || 'Explorer'}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-terracotta/40 shadow-glow"
            />
            <span
              className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-midnight flex items-center justify-center text-xs text-white ${
                isOfflineReady ? 'bg-forest' : 'bg-terracotta'
              }`}
              title={isOfflineReady ? 'Offline cache active' : 'Online status'}
            >
              ✓
            </span>
          </div>

          <div className="space-y-1.5">
            {isEditingName ? (
              <form onSubmit={handleUpdateName} className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="px-3 py-1 text-lg font-serif font-bold rounded-xl border border-sand/30 bg-midnight text-ivory focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-terracotta text-ivory text-xs font-bold rounded-lg"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="px-2 py-1 text-sand/60 text-xs hover:underline"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ivory">
                  {user?.name || 'Guest Traveler'}
                </h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-sand/50 hover:text-sunset p-1 transition-colors"
                  title="Edit profile name"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <p className="text-xs text-sand/70 font-sans">{user?.email || 'demo@tripmate.io'}</p>
            <div className="flex items-center gap-2 pt-1 flex-wrap justify-center sm:justify-start">
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-sunset/20 text-sunset border border-sunset/30 font-mono">
                Goa Expedition Leader
              </span>
              <span className="text-[10px] font-medium px-3 py-1 rounded-full bg-midnight-dark/80 text-sand/60 border border-sand/15 font-mono">
                {isOfflineReady ? 'LocalStorage Sync: Active' : 'LocalStorage: Ready'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="relative z-10 btn-luxury-outline text-xs py-2 px-5 text-rose-300 hover:text-rose-200 border-rose-500/30"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* LUXURY TABS */}
      <div className="flex border-b border-sand/15 gap-6">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3.5 text-xs font-serif font-bold border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'bookings'
              ? 'border-sunset text-sunset'
              : 'border-transparent text-sand/60 hover:text-ivory'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Boarding Passes & Vouchers ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3.5 text-xs font-serif font-bold border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'wishlist'
              ? 'border-sunset text-sunset'
              : 'border-transparent text-sand/60 hover:text-ivory'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Wishlist ({savedList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3.5 text-xs font-serif font-bold border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'settings'
              ? 'border-sunset text-sunset'
              : 'border-transparent text-sand/60 hover:text-ivory'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Prototype Controls</span>
        </button>
      </div>

      {/* TAB CONTENT: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-ivory">
              Saved Travel Vouchers
            </h3>
            <span className="text-xs text-sand/60 font-mono">Available offline anywhere</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="glass-card-luxury rounded-3xl border border-sand/20 p-6 shadow-luxury flex flex-col justify-between space-y-5"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sunset/20 text-sunset uppercase font-mono">
                        {b.type}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-forest/80 px-2.5 py-0.5 rounded-full border border-forest/60 font-mono">
                        {b.status}
                      </span>
                    </div>

                    <h4 className="text-base font-serif font-bold text-ivory truncate">
                      {b.title}
                    </h4>
                    <p className="text-xs text-sand/70 mt-0.5">{b.location}</p>
                    <p className="text-[11px] text-sand mt-1 font-semibold">{b.guests}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-sand/15 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-sand/50 block uppercase font-mono">
                      CONFIRMATION PASS
                    </span>
                    <span className="font-mono font-bold text-sunset text-sm">
                      {b.confirmationCode || b.id}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-sand/50 block uppercase font-mono">
                      PACKAGE FARE
                    </span>
                    <span className="text-base font-num font-extrabold text-ivory">
                      {formatINR(b.amount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: SAVED WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-ivory">
              Saved Wishlist Destinations
            </h3>
            <Link to="/explore" className="text-xs font-semibold text-sunset hover:underline font-mono">
              Discover more destinations →
            </Link>
          </div>

          {savedList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedList.map((dest) => (
                <div
                  key={dest.id}
                  className="glass-card-luxury rounded-3xl border border-sand/20 overflow-hidden shadow-luxury p-4 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-ivory text-base">{dest.name}</h4>
                      <p className="text-xs text-sand/70 font-num">{dest.duration} • {formatINR(dest.estimatedCost)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-sand/15">
                    <Link
                      to="/explore"
                      className="text-xs font-semibold text-sunset hover:underline"
                    >
                      View in Explore
                    </Link>
                    <button
                      onClick={() => toggleSaveDestination(dest.id)}
                      className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-xl text-xs transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card-luxury p-10 rounded-3xl border border-sand/20 text-center text-xs text-sand/60 shadow-luxury">
              Your wishlist is currently empty. Visit Explore and click the heart icon on any card!
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="glass-card-luxury rounded-3xl border border-sand/20 p-8 space-y-4 max-w-xl text-xs shadow-luxury text-sand/80">
          <h3 className="text-lg font-serif font-bold text-ivory">
            Prototype LocalStorage State
          </h3>
          <p className="leading-relaxed font-sans">
            All voting tallies, chat logs, timeline modifications (such as backup replacements), and logged expenses are stored in your browser's persistent LocalStorage.
          </p>

          <div className="pt-2">
            <button
              onClick={handleClearDemoStorage}
              className="btn-luxury-primary text-xs py-2.5 px-6 shadow-glow"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Prototype Data to Initial Factory State</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
