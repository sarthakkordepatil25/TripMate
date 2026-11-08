import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import NotificationDropdown from './NotificationDropdown';
import {
  Compass,
  MapPin,
  Users,
  Calendar,
  Wallet,
  AlertCircle,
  LogIn,
  Wifi,
  WifiOff,
  CheckCircle,
  User,
  Bookmark,
  LogOut,
  Sparkles,
  Heart
} from 'lucide-react';

export const Navbar = () => {
  const {
    user,
    logout,
    isOfflineReady,
    isSimulatedOffline,
    toggleSimulatedOffline,
    savedDestinations
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: Compass, exact: true },
    { to: '/explore', label: 'Explore', icon: MapPin },
    { to: '/group', label: 'Group', icon: Users },
    { to: '/schedule', label: 'Schedule', icon: Calendar },
    { to: '/budget', label: 'Budget', icon: Wallet },
    { to: '/alerts', label: 'Alerts', icon: AlertCircle, hasBadge: true },
  ];

  return (
    <>
      {/* SIMULATED OFFLINE LUXURY BANNER */}
      {isSimulatedOffline && (
        <div className="bg-forest text-ivory text-xs font-medium py-1.5 px-4 text-center sticky top-0 z-50 flex items-center justify-center gap-2 border-b border-sand/15 shadow-md animate-fadeIn">
          <WifiOff className="w-3.5 h-3.5 text-sunset" />
          <span>Offline Intelligence Active — Reading local itinerary cache and stored bookings.</span>
          <button
            onClick={toggleSimulatedOffline}
            className="ml-2 underline hover:text-sunset font-semibold text-[11px]"
          >
            Re-enable Online
          </button>
        </div>
      )}

      {/* FLOATING PILL NAVBAR CONTAINER */}
      <header className="sticky top-3 sm:top-5 z-40 px-3 sm:px-6 max-w-7xl mx-auto w-full transition-all duration-300">
        <div
          className={`rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border transition-all duration-500 ${
            scrolled
              ? 'bg-midnight/92 backdrop-blur-2xl shadow-luxury border-sand/25'
              : 'bg-midnight/65 backdrop-blur-xl shadow-card border-sand/15'
          }`}
        >
          {/* BRAND LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="TripMate Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-terracotta to-sunset flex items-center justify-center text-ivory shadow-glow group-hover:scale-105 transition-all duration-300 ring-1 ring-sand/30">
              <Compass className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45 text-ivory" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.22em] text-base sm:text-lg uppercase font-bold text-ivory group-hover:text-sand transition-colors">
                Trip<span className="text-terracotta">Mate</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-sunset/90 font-mono -mt-1 hidden sm:block">
                The Art of Travelling
              </span>
            </div>
          </Link>

          {/* CENTRE: EDITORIAL PILL NAVIGATION */}
          <nav className="hidden md:flex items-center gap-1 bg-midnight-dark/80 p-1.5 rounded-full border border-sand/10 shadow-inner">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 z-10 ${
                    isActive
                      ? 'text-ivory'
                      : 'text-ivory/65 hover:text-ivory hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-terracotta rounded-full shadow-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-ivory' : 'text-sand/65'}`} />
                  <span className="relative z-10 font-medium">{item.label}</span>
                  {item.hasBadge && (
                    <span className="relative z-10 w-2 h-2 rounded-full bg-sunset ring-2 ring-midnight animate-pulse"></span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT: CONTROLS & PROFILE */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Counter Pill */}
            <Link
              to="/explore?filter=saved"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-midnight-dark/60 text-sand hover:text-ivory border border-sand/15 hover:border-sand/40 transition-all"
              title="View Saved Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${savedDestinations.length > 0 ? 'text-terracotta fill-terracotta' : 'text-sand/50'}`} />
              <span className="font-num text-[11px] font-bold">{savedDestinations.length}</span>
            </Link>

            {/* Offline Status Badge */}
            <button
              onClick={toggleSimulatedOffline}
              title={
                isOfflineReady
                  ? 'Offline storage ready — Click to simulate offline mode'
                  : 'Online mode'
              }
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                isOfflineReady
                  ? 'bg-forest/50 text-ivory border-forest/60 hover:bg-forest/70 shadow-sm'
                  : 'bg-midnight-dark/50 text-sand/60 border-sand/10 hover:bg-midnight-dark'
              }`}
            >
              {isOfflineReady ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Offline</span> Ready
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-sand/40" />
                  <span className="hidden sm:inline">Online</span>
                </>
              )}
            </button>

            {/* Notification Dropdown */}
            <NotificationDropdown />

            {/* User Profile Avatar with Luxury Dropdown */}
            <div className="relative">
              {user?.isLoggedIn ? (
                <div>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 sm:pl-2.5 rounded-full hover:bg-midnight-dark/60 border border-transparent hover:border-sand/20 transition-all focus:outline-none"
                    aria-label="User profile menu"
                  >
                    <span className="text-xs font-semibold text-ivory hidden lg:block max-w-[90px] truncate">
                      {user.name}
                    </span>
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-terracotta/50 shadow-md"
                    />
                  </button>

                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-64 glass-card-luxury rounded-2xl border border-sand/20 shadow-luxury py-2 z-50 text-ivory"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <div className="px-4 py-3 border-b border-sand/15 bg-midnight-dark/60 rounded-t-2xl">
                          <p className="text-xs font-bold text-ivory truncate font-serif tracking-wide">{user.name}</p>
                          <p className="text-[11px] text-sand/70 truncate">{user.email}</p>
                        </div>

                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-sand hover:text-ivory hover:bg-terracotta/20 transition-colors"
                          >
                            <User className="w-4 h-4 text-terracotta" />
                            Passport & Vouchers
                          </Link>

                          <Link
                            to="/explore?filter=saved"
                            className="flex items-center justify-between px-4 py-2.5 text-xs font-medium text-sand hover:text-ivory hover:bg-terracotta/20 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Bookmark className="w-4 h-4 text-sunset" />
                              Saved Wishlist
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-terracotta text-ivory font-num">
                              {savedDestinations.length}
                            </span>
                          </Link>

                          <Link
                            to="/login"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-sand hover:text-ivory hover:bg-terracotta/20 transition-colors"
                          >
                            <LogIn className="w-4 h-4 text-sunset" />
                            Switch Demo Account
                          </Link>
                        </div>

                        <div className="border-t border-sand/15 my-1"></div>

                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn-luxury-primary text-xs py-1.5 px-3.5 rounded-full shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE FLOATING BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <div className="glass-nav-luxury border border-sand/20 shadow-2xl rounded-full py-2 px-3 flex items-center justify-around text-ivory">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`relative flex flex-col items-center py-1 px-3 rounded-full text-[10px] font-medium transition-all ${
                  isActive ? 'text-sunset font-bold' : 'text-sand/60 hover:text-ivory'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sunset scale-110' : ''}`} />
                <span className="mt-0.5">{item.label}</span>
                {item.hasBadge && (
                  <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-sunset animate-pulse"></span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
