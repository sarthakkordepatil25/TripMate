export const INITIAL_GROUP_MEMBERS = [
  { id: 'user-you', name: 'You', isCurrentUser: true, avatar: '👤', color: '#0F766E' },
  { id: 'user-sam', name: 'Sam', isCurrentUser: false, avatar: '🏄', color: '#2563EB' },
  { id: 'user-priya', name: 'Priya', isCurrentUser: false, avatar: '🎨', color: '#DB2777' },
  { id: 'user-rohan', name: 'Rohan', isCurrentUser: false, avatar: '🥾', color: '#D97706' }
];

export const INITIAL_VOTING_ACTIVITIES = [
  {
    id: 'vote-water-sports',
    title: 'Water sports',
    subtitle: 'Parasailing, Jet Ski & Banana Ride at Calangute',
    votes: 2,
    voters: ['Sam', 'Rohan'],
    isCustom: false
  },
  {
    id: 'vote-heritage-walk',
    title: 'Old Goa heritage walk',
    subtitle: 'Colonial Portuguese churches, museum & Latin Quarter',
    votes: 1,
    voters: ['Priya'],
    isCustom: false
  },
  {
    id: 'vote-spice-farm',
    title: 'Spice farm tour',
    subtitle: 'Organic spice plantation tour with traditional lunch buffet',
    votes: 0,
    voters: [],
    isCustom: false
  }
];

export const INITIAL_CHAT_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'Sam',
    senderId: 'user-sam',
    isCurrentUser: false,
    text: 'I vote water sports!',
    time: '10:14 AM',
    avatar: '🏄'
  },
  {
    id: 'msg-2',
    sender: 'You',
    senderId: 'user-you',
    isCurrentUser: true,
    text: 'Agreed, I will book tonight.',
    time: '10:18 AM',
    avatar: '👤'
  }
];
