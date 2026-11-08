export const INITIAL_ITINERARY = {
  1: [
    {
      id: 'day1-1',
      time: '09:30',
      title: 'Check in at hotel',
      subtitle: 'Taj Fort Aguada Resort & Spa, Candolim',
      category: 'Accommodation',
      duration: '45 mins',
      route: 'Dabolim Airport (GOI) ➔ Candolim (38 km, 45 min cab)',
      bookingStatus: 'Confirmed',
      bookingRef: 'TAJ-GOA-7821',
      notes: 'Early check-in requested. Luggage drop and welcome coconut drink included.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
      isUpdated: false
    },
    {
      id: 'day1-2',
      time: '12:00',
      title: 'Calangute Beach',
      subtitle: 'Queen of Goan Beaches',
      category: 'Beach & Leisure',
      duration: '3 hours',
      route: 'Hotel ➔ Calangute Beach (4.2 km, 12 min scooter ride)',
      bookingStatus: 'Open Access',
      bookingRef: null,
      notes: 'Water scooter trials, beach beds available, fresh tender coconut by the shack.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      isUpdated: false
    },
    {
      id: 'day1-3',
      time: '17:00',
      title: 'Local market',
      subtitle: 'Calangute Market Square & Tibetan Bazaar',
      category: 'Shopping & Culture',
      duration: '2.5 hours',
      route: 'Calangute Beach ➔ Market Square (0.8 km walk)',
      bookingStatus: 'Free Entry',
      bookingRef: null,
      notes: 'Handmade cashew wine (Feni), boho beach apparel, spices, and wooden handicrafts.',
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=400&q=80',
      isUpdated: false
    }
  ],
  2: [
    {
      id: 'day2-1',
      time: '09:00',
      title: 'Fort Aguada',
      subtitle: '17th-Century Portuguese Coastal Stronghold & Lighthouse',
      category: 'Historical Landmark',
      duration: '2 hours',
      route: 'Candolim ➔ Aguada Fort Road (2.5 km, 8 mins)',
      bookingStatus: 'Pre-booked Ticket',
      bookingRef: 'ASI-AGU-4419',
      notes: 'Panoramic view of Sinquerim Beach & the Arabian Sea horizon.',
      image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=400&q=80',
      isUpdated: false
    },
    {
      id: 'day2-2',
      time: '11:30',
      title: 'Baga Beach',
      subtitle: 'Vibrant shoreline, water sports & dolphin sightings',
      category: 'Beach & Adventure',
      duration: '2 hours',
      route: 'Fort Aguada ➔ Baga Beach (7.5 km, 20 mins)',
      bookingStatus: 'Open Access',
      bookingRef: null,
      notes: 'Meet up for banana boat rides and group jet ski sessions.',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80',
      isUpdated: false
    },
    {
      id: 'day2-3',
      time: '14:00',
      title: "Lunch at Britto's",
      subtitle: 'Legendary beachside seafood shack since 1965',
      category: 'Dining',
      duration: '1.5 hours',
      route: 'Baga Beach end ➔ Britto’s (Direct walk on sand)',
      bookingStatus: 'Reserved',
      bookingRef: 'BRT-TABLE-09',
      notes: 'Famous Goan fish curry thali, butter garlic prawns, and warm bebinca.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
      isUpdated: false
    },
    {
      id: 'day2-4',
      time: '16:30',
      title: 'Sunset cruise',
      subtitle: 'Mandovi River Luxury Catamaran with Goan Folk Dance',
      category: 'Cruise & Entertainment',
      duration: '2 hours',
      route: 'Baga ➔ Panaji Jetty (16 km, 35 mins)',
      bookingStatus: 'Confirmed e-Pass',
      bookingRef: 'MNDV-CRU-8820',
      notes: 'Boarding starts at 16:15. Includes welcome Goan punch and sunset viewing deck.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80',
      isUpdated: false
    }
  ],
  3: [
    {
      id: 'day3-1',
      time: '10:00',
      title: 'Old Goa churches',
      subtitle: 'Basilica of Bom Jesus & Se Cathedral (UNESCO World Heritage)',
      category: 'Heritage',
      duration: '2.5 hours',
      route: 'Candolim ➔ Old Goa (22 km, 40 mins)',
      bookingStatus: 'Free Entry',
      bookingRef: null,
      notes: 'Baroque architecture preserving the relics of St. Francis Xavier.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=400&q=80',
      isUpdated: false
    },
    {
      id: 'day3-2',
      time: '13:00',
      title: 'Lunch in Panaji',
      subtitle: 'Fontainhas Latin Quarter - Viva Panjim / Verandah Cafe',
      category: 'Dining & Heritage',
      duration: '1.5 hours',
      route: 'Old Goa ➔ Fontainhas Panaji (9 km, 18 mins)',
      bookingStatus: 'Walk-in Expected',
      bookingRef: null,
      notes: 'Pork Vindaloo, Goan Poi bread, and photography walk across colorful Portuguese villas.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
      isUpdated: false
    },
    {
      id: 'day3-3',
      time: '16:00',
      title: 'Departure',
      subtitle: 'Check out & Transfer to Goa International Airport / Railway',
      category: 'Transit',
      duration: '1.5 hours',
      route: 'Panaji ➔ Dabolim Airport (GOI) (28 km, 38 mins)',
      bookingStatus: 'Cab Confirmed',
      bookingRef: 'GOA-CAB-9011',
      notes: 'Driver arrives 15 minutes before scheduled pick-up time.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80',
      isUpdated: false
    }
  ]
};
