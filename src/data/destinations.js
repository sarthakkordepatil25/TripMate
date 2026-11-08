export const DESTINATION_CATEGORIES = [
  {
    id: 'Beaches',
    name: 'Beach Escapes',
    subtitle: 'Sun, sand & ocean waves',
    icon: 'Waves',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    count: 'Goa, Gokarna'
  },
  {
    id: 'Mountains',
    name: 'Mountain Retreats',
    subtitle: 'Peaks, mist & fresh pine',
    icon: 'Mountain',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80',
    count: 'Manali, Munnar'
  },
  {
    id: 'Culture',
    name: 'Cultural Journeys',
    subtitle: 'Palaces, ghats & timeless rituals',
    icon: 'Landmark',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=300&q=80',
    count: 'Jaipur, Varanasi'
  },
  {
    id: 'Adventure',
    name: 'Adventure Trails',
    subtitle: 'Cliff treks, paragliding & rapids',
    icon: 'Compass',
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=300&q=80',
    count: 'Manali, Gokarna'
  },
  {
    id: 'Food',
    name: 'Culinary Trails',
    subtitle: 'Seafood shacks, royal thalis & chaat',
    icon: 'UtensilsCrossed',
    image: 'https://images.unsplash.com/photo-1505253758473-96b3015f21c9?auto=format&fit=crop&w=300&q=80',
    count: 'Goa, Jaipur, Varanasi'
  }
];

export const INITIAL_DESTINATIONS = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa, India',
    tagline: 'Sun-drenched shores & Portuguese villas',
    rating: 4.6,
    reviewsCount: 1420,
    interests: ['Beaches', 'Food'],
    estimatedCost: 18500,
    duration: '4 days',
    daysCount: 4,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#087F78',
    description: 'Golden sun-drenched coastlines, historic Portuguese architecture, vibrant beach shacks, and world-renowned seafood.',
    longDescription: 'Goa is India’s premier coastal sanctuary, blending Portuguese colonial elegance with laid-back Arabian Sea charm. From historic ramparts of Fort Aguada to the azure waters of Calangute and Baga, every sunset offers a new story.',
    bestTimeToVisit: 'Nov – Feb',
    averageTemp: '28°C',
    badge: 'Trending Sanctuary',
    activities: ['Water Sports & Scuba', 'Portuguese Fort Heritage Walk', 'Sunset Mandovi River Cruise', 'Seafood Tasting Trail'],
    highlights: [
      'Fort Aguada 17th-century lighthouse overlooking the Arabian Sea',
      'Water sports & dolphin sighting at Calangute and Baga beach',
      'Iconic dining at Britto’s and Curlies beach shacks',
      'UNESCO heritage churches in Old Goa including Basilica of Bom Jesus'
    ],
    recommendedHotel: {
      name: 'Taj Fort Aguada Resort & Spa',
      rating: 4.8,
      pricePerNight: 5200,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan, India',
    tagline: 'Pink sandstone palaces & royal majesty',
    rating: 4.5,
    reviewsCount: 1180,
    interests: ['Culture', 'Food'],
    estimatedCost: 14200,
    duration: '4 days',
    daysCount: 4,
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#C2410C',
    description: 'The regal Pink City with majestic hilltop forts, vibrant bazaars, palaces, and royal Rajasthani thalis.',
    longDescription: 'Jaipur is a living tapestry of Rajput royalty. Immerse yourself in the honeycomb facade of Hawa Mahal, the astronomical marvels of Jantar Mantar, and the grandeur of Amer Fort perched high on the Aravalli hills.',
    bestTimeToVisit: 'Oct – Mar',
    averageTemp: '24°C',
    badge: 'Royal Heritage',
    activities: ['Amer Fort Elephant / Jeep Safari', 'Hawa Mahal Photo Walk', 'Johari Bazaar Gemstone Shopping', 'Chokhi Dhani Heritage Village'],
    highlights: [
      'Amer Fort mirror palace (Sheesh Mahal)',
      'Hawa Mahal’s 953 ornate sandstone windows',
      'Authentic Dal Baati Churma at LMB Sweet Shop',
      'Panoramic sunset view from Nahargarh Fort'
    ],
    recommendedHotel: {
      name: 'Heritage Haveli Palace',
      rating: 4.7,
      pricePerNight: 3800,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'gokarna',
    name: 'Gokarna',
    state: 'Karnataka, India',
    tagline: 'Pristine cliffs, sacred waves & secluded trails',
    rating: 4.4,
    reviewsCount: 890,
    interests: ['Beaches', 'Adventure'],
    estimatedCost: 12800,
    duration: '4 days',
    daysCount: 4,
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#0284C7',
    description: 'Rustic cliff-side beaches, sacred temple traditions, and picturesque trekking trails along the Arabian Sea.',
    longDescription: 'Gokarna harmonizes ancient spirituality with rugged coastal serenity. Famous for its five sacred beaches shaped like Om, it offers cliff trekking between Kudle and Half Moon Beach away from commercial crowds.',
    bestTimeToVisit: 'Oct – Mar',
    averageTemp: '27°C',
    badge: 'Untamed Coast',
    activities: ['5-Beach Cliff Trekking', 'Camping under stars at Paradise Beach', 'Surfing lessons at Main Beach', 'Mahabaleshwar Temple visit'],
    highlights: [
      'Scenic cliff walk from Kudle Beach to Om Beach',
      'Secluded camping & bonfire at Paradise Beach',
      'Traditional South Indian banana leaf meals at Namaste Cafe',
      'Yana Rocks limestone monolith adventure nearby'
    ],
    recommendedHotel: {
      name: 'Kahani Paradise Luxury Retreat',
      rating: 4.6,
      pricePerNight: 3200,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh, India',
    tagline: 'Snow-capped peaks, cedar forests & alpine spirit',
    rating: 4.7,
    reviewsCount: 2310,
    interests: ['Mountains', 'Adventure'],
    estimatedCost: 21000,
    duration: '5 days',
    daysCount: 5,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#047857',
    description: 'Snow-capped Himalayan peaks, pine forests, high-altitude mountain passes, and thrilling alpine adventure.',
    longDescription: 'Nestled in the Beas River Valley, Manali is India’s alpine escape in the western Himalayas. From paragliding high above Solang Valley to experiencing snow drifts at Atal Tunnel and Rohtang Pass, Manali delivers pure mountain ecstasy.',
    bestTimeToVisit: 'Dec – Jun',
    averageTemp: '12°C',
    badge: 'Alpine Adventure',
    activities: ['Paragliding in Solang Valley', 'River rafting on Beas River', 'Trek to Jogini Waterfall', 'Old Manali cafe exploration'],
    highlights: [
      'Atal Tunnel drive to Sissu waterfall and Lahaul valley',
      'Centuries-old wooden architecture of Hadimba Devi Temple',
      'Hot sulfur springs at Vashisht village',
      'Trout fish tasting and live indie music in Old Manali'
    ],
    recommendedHotel: {
      name: 'The Himalayan Riverside Lodge',
      rating: 4.8,
      pricePerNight: 4500,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh, India',
    tagline: 'Sacred riverbanks, golden aartis & eternal time',
    rating: 4.5,
    reviewsCount: 1650,
    interests: ['Culture', 'Food'],
    estimatedCost: 11500,
    duration: '3 days',
    daysCount: 3,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#B45309',
    description: 'The ancient spiritual heart of India along the sacred Ganges, timeless ghats, and mesmerizing evening aartis.',
    longDescription: 'One of the oldest continuously inhabited cities in human history, Varanasi is a hypnotic symphony of devotion, sound, and color. Glide along the Ganges at daybreak and witness the grand brass-lamp rituals of evening aarti.',
    bestTimeToVisit: 'Oct – Mar',
    averageTemp: '21°C',
    badge: 'Spiritual Wonder',
    activities: ['Dawn Ganga Boat Ride', 'Dashashwamedh Ghat Evening Aarti', 'Silk Weavers Colony Walk', 'Kachori Gali Street Food Trail'],
    highlights: [
      'Grand evening Maha Aarti with synchronized brass lamps',
      'Sublime dawn rowboat journey across all 84 ghats',
      'Sampling famous Banarasi Paan, Malaiyo, and Blue Lassi',
      'Excursion to Sarnath where Lord Buddha gave his first sermon'
    ],
    recommendedHotel: {
      name: 'BrijRama Palace Heritage Grand',
      rating: 4.9,
      pricePerNight: 4100,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'munnar',
    name: 'Munnar',
    state: 'Kerala, India',
    tagline: 'Emerald tea terraces, misted valleys & cool breezes',
    rating: 4.6,
    reviewsCount: 1240,
    interests: ['Mountains', 'Culture'],
    estimatedCost: 16800,
    duration: '4 days',
    daysCount: 4,
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#107E54',
    description: 'Endless rolling emerald tea plantations, mist-covered mountain valleys, waterfalls, and spice scented trails.',
    longDescription: 'Perched high in the Western Ghats of Kerala, Munnar is a haven of lush tea estates, rolling clouds, waterfalls, and rare mountain wildlife. Wake to tea aroma and cool mountain mist.',
    bestTimeToVisit: 'Sep – Mar',
    averageTemp: '19°C',
    badge: 'Nature & Tea Haven',
    activities: ['Tea Museum & Tasting Tour', 'Trek to Top Station Viewpoint', 'Speedboating at Mattupetty Dam', 'Eravikulam National Park Safari'],
    highlights: [
      'Spotting the endangered Nilgiri Tahr mountain goat',
      'Panoramic tea estates stretching into the clouds at Lockhart Gap',
      'Fresh cardamom and homemade chocolate workshops',
      'Boating amidst eucalyptus forests at Kundala Lake'
    ],
    recommendedHotel: {
      name: 'Fragrant Nature Munnar Resort',
      rating: 4.7,
      pricePerNight: 4200,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80'
    }
  }
];

export const AVAILABLE_INTERESTS = ['Beaches', 'Culture', 'Adventure', 'Food', 'Mountains'];
