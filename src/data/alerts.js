export const DISRUPTION_SCENARIO = {
  id: 'alert-aguada-rain-01',
  title: 'Fort Aguada is closed today.',
  subtitle: 'Rain is expected from 3 PM, so your 09:00 stop is affected.',
  affectedStop: {
    day: 2,
    time: '09:00',
    originalTitle: 'Fort Aguada',
    reason: 'Archaeological Survey of India advisory: Coastal storm surge warning & slippery bastion pathways.'
  },
  lastChecked: 'Today, 08:15 AM',
  currentLocation: 'Candolim, Goa (15.5187° N, 73.7634° E)',
  alertSeverity: 'high',
  weatherSummary: 'Heavy coastal squall expected between 15:00 and 19:00 IST. High humidity 88%, gusty winds 40 km/h.'
};

export const BACKUP_PLANS = [
  {
    id: 'backup-museum-goa',
    name: 'Museum of Goa',
    type: 'Indoor',
    distance: '1.2 km',
    distanceKm: 1.2,
    openingHours: 'Open till 6 PM',
    category: 'Art & Culture',
    duration: '2 hours',
    costEstimate: '₹300 / person',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=600&q=80',
    description: 'Contemporary multi-storey art center celebrating Goan history, indoor sculpture displays, air-conditioned galleries, and an artisan cafe.',
    whyChoose: '100% sheltered indoor museum, directly along your Candolim travel route. Perfect during rain.'
  },
  {
    id: 'backup-spice-farm',
    name: 'Spice farm tour',
    type: 'Covered',
    distance: '3.5 km',
    distanceKm: 3.5,
    openingHours: 'Open till 5 PM',
    category: 'Nature & Food',
    duration: '2.5 hours',
    costEstimate: '₹500 / person (Includes buffet)',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    description: 'Covered forest canopy pathways with organic vanilla, cardamom, and cinnamon cultivation tours, followed by traditional banana-leaf Goan lunch.',
    whyChoose: 'Sheltered walkways beneath broad tropical foliage with hearty Goan lunch buffets.'
  },
  {
    id: 'backup-cafe-crafts',
    name: 'Cafe and craft market',
    type: 'Indoor',
    distance: '0.8 km',
    distanceKm: 0.8,
    openingHours: 'Open till 9 PM',
    category: 'Shopping & Dining',
    duration: '1.5 hours',
    costEstimate: 'Free entry · Food as per order',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    description: 'Indoor bohemian craft pavilion with resident potter workshops, local roasted Goan coffee, fresh French-Goan bakeries, and live acoustic lounge music.',
    whyChoose: 'Only 800m away in Candolim, sheltered seating, great WiFi, and delicious monsoon snacks.'
  }
];
