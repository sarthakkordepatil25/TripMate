import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import BackgroundScene from './components/BackgroundScene';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Group from './pages/Group';
import Schedule from './pages/Schedule';
import Budget from './pages/Budget';
import Alerts from './pages/Alerts';
import Profile from './pages/Profile';

// Automatic Router detection: file:// requires HashRouter, http/https uses BrowserRouter
const Router = typeof window !== 'undefined' && window.location.protocol === 'file:' ? HashRouter : BrowserRouter;

export function App() {
  return (
    <AppProvider>
      <Router>
        {/* Fixed cinematic background — renders behind everything */}
        <BackgroundScene />

        <div className="min-h-screen flex flex-col bg-transparent text-[#FFFDF7] selection:bg-[#C66B4E] selection:text-[#FFFDF7] relative z-10">
          {/* Floating Glass Navigation */}
          <Navbar />

          {/* Main View Area */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/group" element={<Group />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Luxury Dark Footer */}
          <Footer />

          {/* Toast Notification Container */}
          <ToastContainer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
