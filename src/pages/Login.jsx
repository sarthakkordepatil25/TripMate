import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Login = () => {
  const { login, user } = useApp();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@tripmate.io');
  const [password, setPassword] = useState('secret123');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [resetSentEmail, setResetSentEmail] = useState('');

  const validateEmail = (val) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (isRegister && (!name || !name.trim())) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!email || !validateEmail(email)) {
      newErrors.email = 'Please provide a valid email address (e.g. name@example.com).';
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    login(isRegister ? name.trim() : (name || 'Alex Morgan'), email.trim());
    navigate('/explore');
  };

  const handleGoogleDemoClick = () => {
    login('Alex Morgan', 'alex.google@tripmate.io');
    navigate('/explore');
  };

  const handleSendReset = (e) => {
    e.preventDefault();
    if (!resetSentEmail || !validateEmail(resetSentEmail)) {
      alert('Please enter a valid email for simulated password reset instructions.');
      return;
    }
    alert(`Simulated reset instructions sent to: ${resetSentEmail}`);
    setForgotPasswordModal(false);
    setResetSentEmail('');
  };

  return (
    <div id="login" data-scene="login" className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-4xl overflow-hidden shadow-luxury border border-sand/20 glass-card-luxury text-ivory">
        {/* LEFT COLUMN: EDITORIAL TRAVEL STORY (5 cols) */}
        <div className="lg:col-span-5 relative bg-midnight-dark text-ivory p-8 sm:p-10 flex flex-col justify-between min-h-[380px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80"
            alt="Travel inspiration"
            className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-800/80 to-transparent" />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-terracotta text-ivory flex items-center justify-center font-bold shadow-glow">
              <Compass className="w-5 h-5 text-ivory" />
            </div>
            <div>
              <span className="text-xl font-serif font-bold tracking-tight text-ivory">
                Trip<span className="text-terracotta">Mate</span>
              </span>
              <p className="text-[10px] text-sunset font-mono uppercase tracking-widest">The Art of Travelling</p>
            </div>
          </div>

          {/* Editorial quote */}
          <div className="relative z-10 space-y-3 my-8">
            <span className="eyebrow text-sunset">
              Passport Sanctuary
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold leading-snug">
              Every journey begins with a single <span className="italic text-sand font-normal">decision.</span>
            </h3>
            <p className="text-xs text-sand/80 leading-relaxed font-sans">
              Sign in to access your offline itineraries, collaborative group voting, and contingency alerts.
            </p>
          </div>

          {/* Footer note */}
          <div className="relative z-10 text-[11px] text-sand/60 font-mono">
            <span>Goa Getaway 2026 • Demo Session Ready</span>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE FORM (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-serif font-bold text-ivory">
                {isRegister ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setErrors({});
                }}
                className="text-xs font-semibold text-sunset hover:underline font-mono"
              >
                {isRegister ? 'Already registered? Sign In' : 'New here? Register'}
              </button>
            </div>

            {/* Quick Demo Fill Buttons */}
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => {
                  setName('Alex Morgan');
                  setEmail('alex.morgan@tripmate.io');
                  setPassword('secret123');
                }}
                className="text-[11px] px-3 py-1 rounded-full bg-midnight-dark border border-sand/15 text-sand hover:text-ivory font-mono transition-colors"
              >
                Fill Alex (Leader)
              </button>
              <button
                type="button"
                onClick={handleGoogleDemoClick}
                className="text-[11px] px-3 py-1 rounded-full bg-terracotta/20 border border-terracotta/40 text-sunset hover:bg-terracotta/30 font-mono transition-colors"
              >
                ⚡ 1-Click Demo Sign-in
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {isRegister && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset mb-1 font-mono">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-sand/50 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-sand/15 bg-midnight-dark/80 text-ivory text-xs focus:ring-2 focus:ring-terracotta focus:outline-none"
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset mb-1 font-mono">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-sand/50 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-sand/15 bg-midnight-dark/80 text-ivory text-xs focus:ring-2 focus:ring-terracotta focus:outline-none"
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset font-mono">
                    Password <span className="text-rose-400">*</span>
                  </label>
                  {!isRegister && (
                    <button
                      type="button"
                      onClick={() => setForgotPasswordModal(true)}
                      className="text-[11px] text-sand/60 hover:text-sunset underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-sand/50 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-sand/15 bg-midnight-dark/80 text-ivory text-xs focus:ring-2 focus:ring-terracotta focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-sand/50 hover:text-ivory"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-rose-400 mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                className="w-full btn-luxury-primary text-xs py-3 rounded-2xl shadow-glow font-bold mt-2"
              >
                <span>{isRegister ? 'Create Explorer Account' : 'Sign In to TripMate'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="text-[11px] text-center text-sand/60 font-sans">
            By signing in, you agree to access local simulated prototype data. No payment or live charges ever apply.
          </div>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      <AnimatePresence>
        {forgotPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-900/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card-luxury rounded-3xl p-6 sm:p-7 max-w-sm w-full border border-sand/25 shadow-luxury text-ivory space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-ivory">Password Recovery</h3>
                <button
                  onClick={() => setForgotPasswordModal(false)}
                  className="p-1 rounded-full text-sand/60 hover:text-ivory"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-sand/70">
                Enter your registered email address to receive prototype password reset instructions.
              </p>

              <form onSubmit={handleSendReset} className="space-y-3">
                <input
                  type="email"
                  value={resetSentEmail}
                  onChange={(e) => setResetSentEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand/20 bg-midnight-dark text-xs text-ivory focus:outline-none focus:border-terracotta"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setForgotPasswordModal(false)}
                    className="btn-luxury-outline text-xs py-2 px-3.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-luxury-primary text-xs py-2 px-4"
                  >
                    Send Instructions
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
