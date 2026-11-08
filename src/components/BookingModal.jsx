import React, { useState } from 'react';
import {
  X,
  Hotel,
  Plane,
  Calendar,
  Users,
  CheckCircle2,
  ShieldAlert,
  Ticket,
  MapPin,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/currency';

export const BookingModal = ({ destination, isOpen, onClose }) => {
  const { addBooking } = useApp();
  const [bookingType, setBookingType] = useState('hotel'); // 'hotel' | 'flight'
  const [dates, setDates] = useState({
    start: '2026-11-15',
    end: '2026-11-19'
  });
  const [guestsCount, setGuestsCount] = useState(4);
  const [roomType, setRoomType] = useState('Deluxe Sea View Villa');
  const [selectedFlight, setSelectedFlight] = useState('IndiGo Morning Express (6E-512)');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  if (!isOpen) return null;

  const destName = destination ? destination.name : 'Goa';
  const hotelPricePerNight = destination?.recommendedHotel?.pricePerNight || 4800;
  const nights = 4;
  const totalHotelEst = hotelPricePerNight * nights;
  const flightPricePerPerson = 4200;
  const totalFlightEst = flightPricePerPerson * guestsCount;

  const handleSimulatedConfirm = (e) => {
    e.preventDefault();

    const newBooking = {
      type: bookingType === 'hotel' ? 'Hotel' : 'Flight',
      title:
        bookingType === 'hotel'
          ? destination?.recommendedHotel?.name || `${destName} Heritage Luxury Stay`
          : selectedFlight,
      location: `${destName}, India`,
      checkIn: dates.start,
      checkOut: dates.end,
      guests: `${guestsCount} Guests · ${bookingType === 'hotel' ? roomType : 'Economy Class'}`,
      amount: bookingType === 'hotel' ? totalHotelEst : totalFlightEst,
      image:
        bookingType === 'hotel'
          ? destination?.recommendedHotel?.image || destination?.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80'
    };

    addBooking(newBooking);
    setConfirmedBookingData(newBooking);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setConfirmedBookingData(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-midnight-900/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="glass-card-luxury rounded-3xl max-w-lg w-full max-h-[92vh] overflow-hidden shadow-luxury flex flex-col border border-sand/25 text-ivory"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-sand/15 bg-midnight-dark/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-terracotta/20 text-sunset border border-terracotta/30">
                <Ticket className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-ivory">
                  Reservation Concierge
                </h3>
                <p className="text-[11px] text-sand/60">Destination: {destName}</p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-full text-sand/60 hover:text-ivory hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 overflow-y-auto space-y-5 text-xs text-sand/80">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-950/60 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/20 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sunset bg-sunset/15 px-3 py-1 rounded-full font-mono border border-sunset/30">
                    Simulation Confirmed
                  </span>
                  <h3 className="text-xl font-serif font-bold text-ivory mt-2">
                    E-Pass Successfully Issued!
                  </h3>
                  <p className="text-xs text-sand/70 mt-1 max-w-xs mx-auto font-sans">
                    Your reservation voucher is now cached for offline access and saved to your passport.
                  </p>
                </div>

                {/* VOUCHER PREVIEW */}
                <div className="p-4 rounded-2xl bg-midnight-dark/80 border border-sand/15 text-left space-y-2.5 shadow-md">
                  <div className="flex items-center justify-between border-b border-sand/15 pb-2">
                    <span className="font-serif font-bold text-ivory">
                      {confirmedBookingData?.title}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-terracotta text-ivory px-2.5 py-0.5 rounded-full">
                      CONFIRMED
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-sand/50 block text-[10px] uppercase font-bold font-mono">DATES</span>
                      <span className="font-semibold text-ivory font-num">
                        {confirmedBookingData?.checkIn} to {confirmedBookingData?.checkOut}
                      </span>
                    </div>
                    <div>
                      <span className="text-sand/50 block text-[10px] uppercase font-bold font-mono">TOTAL ESTIMATED</span>
                      <span className="font-num font-extrabold text-sunset">
                        {formatINR(confirmedBookingData?.amount)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-center gap-2">
                  <button
                    onClick={handleClose}
                    className="btn-luxury-primary text-xs py-2 px-6"
                  >
                    Done & View Itinerary
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSimulatedConfirm} className="space-y-4">
                {/* Switcher */}
                <div className="grid grid-cols-2 gap-2 bg-midnight-dark/80 p-1.5 rounded-2xl border border-sand/15">
                  <button
                    type="button"
                    onClick={() => setBookingType('hotel')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      bookingType === 'hotel'
                        ? 'bg-terracotta text-ivory shadow-glow'
                        : 'text-sand/60 hover:text-ivory'
                    }`}
                  >
                    <Hotel className="w-3.5 h-3.5" />
                    <span>Hotel & Villa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('flight')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      bookingType === 'flight'
                        ? 'bg-terracotta text-ivory shadow-glow'
                        : 'text-sand/60 hover:text-ivory'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5" />
                    <span>Flight / Transit</span>
                  </button>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset mb-1 font-mono">
                      Check-in / Departure
                    </label>
                    <input
                      type="date"
                      value={dates.start}
                      onChange={(e) => setDates({ ...dates, start: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-sand/15 text-xs focus:ring-2 focus:ring-terracotta focus:outline-none bg-midnight-dark/80 text-ivory font-num"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset mb-1 font-mono">
                      Check-out / Return
                    </label>
                    <input
                      type="date"
                      value={dates.end}
                      onChange={(e) => setDates({ ...dates, end: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-sand/15 text-xs focus:ring-2 focus:ring-terracotta focus:outline-none bg-midnight-dark/80 text-ivory font-num"
                    />
                  </div>
                </div>

                {/* Travelers Count */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset mb-1 font-mono">
                    Travelers / Party Size
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-sand/15 text-xs focus:ring-2 focus:ring-terracotta focus:outline-none bg-midnight-dark/80 font-semibold text-ivory"
                  >
                    <option value={1} className="bg-midnight text-ivory">1 Solo Explorer</option>
                    <option value={2} className="bg-midnight text-ivory">2 Adults (Duo)</option>
                    <option value={4} className="bg-midnight text-ivory">4 Travelers (Goa Group Plan)</option>
                    <option value={6} className="bg-midnight text-ivory">6 Travelers (Expedition Group)</option>
                  </select>
                </div>

                {/* Type specific options */}
                {bookingType === 'hotel' ? (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset mb-1 font-mono">
                      Room Archetype
                    </label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-sand/15 text-xs focus:ring-2 focus:ring-terracotta focus:outline-none bg-midnight-dark/80 text-ivory"
                    >
                      <option value="Deluxe Sea View Villa" className="bg-midnight text-ivory">Deluxe Sea View Villa (Infinity Pool Access)</option>
                      <option value="Portuguese Heritage Suite" className="bg-midnight text-ivory">Portuguese Heritage Suite (Private Balcony)</option>
                      <option value="Executive Beach Chalet" className="bg-midnight text-ivory">Executive Beach Chalet (Sunrise Deck)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-sunset mb-1 font-mono">
                      Flight Schedule
                    </label>
                    <select
                      value={selectedFlight}
                      onChange={(e) => setSelectedFlight(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-sand/15 text-xs focus:ring-2 focus:ring-terracotta focus:outline-none bg-midnight-dark/80 text-ivory"
                    >
                      <option value="IndiGo Morning Express (6E-512)" className="bg-midnight text-ivory">IndiGo 6E-512 · 06:45 AM (Non-stop)</option>
                      <option value="Air India Direct (AI-883)" className="bg-midnight text-ivory">Air India AI-883 · 01:15 PM (Direct)</option>
                      <option value="Vistara Premium (UK-819)" className="bg-midnight text-ivory">Vistara UK-819 · 05:40 PM (Premium)</option>
                    </select>
                  </div>
                )}

                {/* Simulation note */}
                <div className="p-3.5 bg-sunset/10 rounded-2xl border border-sunset/25 text-sand space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[11px] text-sunset">
                    <ShieldAlert className="w-3.5 h-3.5 text-sunset" />
                    <span>Academic Prototype Pass</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-sand/80">
                    This interactive prototype issues simulated reservation documents. Zero credit card or payment data is required.
                  </p>
                </div>

                {/* Pricing Summary */}
                <div className="pt-3 border-t border-sand/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-sand/60 uppercase font-mono block">Estimated Total</span>
                    <span className="text-xl font-num font-extrabold text-sunset">
                      {formatINR(bookingType === 'hotel' ? totalHotelEst : totalFlightEst)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="btn-luxury-outline text-xs py-2 px-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-luxury-primary text-xs py-2 px-5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Issue Simulated Pass</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
