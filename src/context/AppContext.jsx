import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import { INITIAL_ITINERARY } from '../data/itinerary';
import { INITIAL_EXPENSES, DEFAULT_BUDGET } from '../data/expenses';
import { INITIAL_VOTING_ACTIVITIES, INITIAL_CHAT_MESSAGES, INITIAL_GROUP_MEMBERS } from '../data/group';
import { DISRUPTION_SCENARIO, BACKUP_PLANS } from '../data/alerts';
import { storage } from '../utils/storage';
import { convertToINR } from '../utils/currency';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. Toast Notification System
  const [toasts, setToasts] = useState([]);

  const showToast = (title, message = '', type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 2. Authentication & User State
  const [user, setUser] = useState(() => {
    const stored = storage.get('user', null);
    if (stored) return stored;
    // Default logged in user for immediate demo exploration if not set
    return {
      isLoggedIn: true,
      name: 'Alex Morgan',
      email: 'alex.morgan@tripmate.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
  });

  const login = (name, email) => {
    const newUser = {
      isLoggedIn: true,
      name: name || 'Demo Explorer',
      email: email || 'demo@tripmate.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setUser(newUser);
    storage.set('user', newUser);
    showToast(`Welcome to TripMate, ${newUser.name}!`, 'Explore smart travel planning & group collaboration.', 'success');
  };

  const logout = () => {
    const loggedOutUser = { isLoggedIn: false, name: '', email: '', avatar: null };
    setUser(loggedOutUser);
    storage.set('user', loggedOutUser);
    showToast('Signed Out', 'You have been safely signed out.', 'info');
  };

  // 3. Saved Destinations
  const [savedDestinations, setSavedDestinations] = useState(() => {
    return storage.get('saved_destinations', ['goa']);
  });

  const toggleSaveDestination = (destId) => {
    const isSaved = savedDestinations.includes(destId);
    let updated;
    const dest = INITIAL_DESTINATIONS.find((d) => d.id === destId);
    const destName = dest ? dest.name : 'Destination';

    if (isSaved) {
      updated = savedDestinations.filter((id) => id !== destId);
      showToast('Removed from Saved', `${destName} was removed from your wishlist.`, 'info');
    } else {
      updated = [...savedDestinations, destId];
      showToast('Destination Saved! ❤️', `${destName} was added to your saved wishlist.`, 'success');
    }
    setSavedDestinations(updated);
    storage.set('saved_destinations', updated);
  };

  const isDestinationSaved = (destId) => savedDestinations.includes(destId);

  // 4. Group Planning State (Voting & Chat)
  const [votingActivities, setVotingActivities] = useState(() => {
    return storage.get('voting_activities', INITIAL_VOTING_ACTIVITIES);
  });

  const [userVote, setUserVote] = useState(() => {
    return storage.get('user_vote', null);
  });

  const [chatMessages, setChatMessages] = useState(() => {
    return storage.get('chat_messages', INITIAL_CHAT_MESSAGES);
  });

  const castVote = (activityId) => {
    setVotingActivities((prevActivities) => {
      let updatedActivities = prevActivities.map((act) => {
        let newVotes = act.votes;
        let newVoters = [...act.voters];

        // If user is deselecting their current vote
        if (userVote === activityId && act.id === activityId) {
          newVotes = Math.max(0, newVotes - 1);
          newVoters = newVoters.filter((v) => v !== (user?.name || 'You'));
          return { ...act, votes: newVotes, voters: newVoters };
        }

        // If user already voted for another option previously, remove vote from it
        if (userVote && act.id === userVote && act.id !== activityId) {
          newVotes = Math.max(0, newVotes - 1);
          newVoters = newVoters.filter((v) => v !== (user?.name || 'You'));
        }

        // If this is the newly voted option
        if (act.id === activityId && userVote !== activityId) {
          newVotes = newVotes + 1;
          if (!newVoters.includes(user?.name || 'You')) {
            newVoters.push(user?.name || 'You');
          }
        }

        return { ...act, votes: newVotes, voters: newVoters };
      });

      storage.set('voting_activities', updatedActivities);
      return updatedActivities;
    });

    const isRemoving = userVote === activityId;
    const newVoteState = isRemoving ? null : activityId;
    setUserVote(newVoteState);
    storage.set('user_vote', newVoteState);

    const targetActivity = votingActivities.find((a) => a.id === activityId);
    if (isRemoving) {
      showToast('Vote Withdrawn', `Removed your vote for "${targetActivity?.title}".`, 'info');
    } else {
      showToast('Vote Recorded! 👍', `You voted for "${targetActivity?.title}".`, 'success');
    }
  };

  const addCustomVotingActivity = (activity) => {
    const exists = votingActivities.some(
      (a) => a.title.toLowerCase() === activity.title.toLowerCase() || a.id === activity.id
    );
    if (exists) {
      showToast('Already in Voting', `"${activity.title}" is already in the voting list.`, 'warning');
      return;
    }

    const newActivity = {
      id: activity.id || `custom-vote-${Date.now()}`,
      title: activity.title || activity.name,
      subtitle: activity.subtitle || `${activity.type || 'Indoor'} alternative · ${activity.distance || ''}`,
      votes: 0,
      voters: [],
      isCustom: true
    };

    const updated = [...votingActivities, newActivity];
    setVotingActivities(updated);
    storage.set('voting_activities', updated);
    showToast('Added to Group Vote! 🗳️', `"${newActivity.title}" was added to Group Planning.`, 'success');
  };

  const sendChatMessage = (text) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: user?.name || 'You',
      senderId: 'user-you',
      isCurrentUser: true,
      text: text.trim(),
      time: timeStr,
      avatar: '👤'
    };

    const updated = [...chatMessages, newMsg];
    setChatMessages(updated);
    storage.set('chat_messages', updated);
  };

  // 5. Itinerary & Schedule State
  const [itinerary, setItinerary] = useState(() => {
    return storage.get('itinerary', INITIAL_ITINERARY);
  });

  const [activeDay, setActiveDay] = useState(1);
  const [selectedBackupPlanId, setSelectedBackupPlanId] = useState(() => {
    return storage.get('selected_backup_plan', null);
  });

  const replaceItineraryStop = (day, time, newStopDetails) => {
    setItinerary((prevItinerary) => {
      const dayStops = prevItinerary[day] || [];
      const updatedDayStops = dayStops.map((stop) => {
        if (stop.time === time) {
          return {
            ...stop,
            originalTitle: stop.originalTitle || stop.title,
            title: newStopDetails.name,
            subtitle: `${newStopDetails.type} Activity · ${newStopDetails.category}`,
            category: newStopDetails.category,
            duration: newStopDetails.duration || '2 hours',
            route: `Candolim ➔ ${newStopDetails.name} (${newStopDetails.distance})`,
            bookingStatus: 'Backup Selected',
            notes: newStopDetails.whyChoose || newStopDetails.description,
            image: newStopDetails.image,
            isUpdated: true,
            replacedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return stop;
      });

      const updated = {
        ...prevItinerary,
        [day]: updatedDayStops
      };

      storage.set('itinerary', updated);
      return updated;
    });

    setSelectedBackupPlanId(newStopDetails.id);
    storage.set('selected_backup_plan', newStopDetails.id);
    showToast(
      'Schedule Updated! ⚡',
      `Day 2 09:00 stop replaced with "${newStopDetails.name}".`,
      'success'
    );
  };

  const resetItineraryToOriginal = () => {
    setItinerary(INITIAL_ITINERARY);
    setSelectedBackupPlanId(null);
    storage.set('itinerary', INITIAL_ITINERARY);
    storage.remove('selected_backup_plan');
    showToast('Schedule Restored', 'Rebuilt Day 2 schedule back to original Fort Aguada stop.', 'info');
  };

  // 6. Offline Mode & Simulation State
  const [isOfflineReady, setIsOfflineReady] = useState(() => {
    return storage.get('is_offline_ready', false);
  });

  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);

  const downloadForOfflineUse = () => {
    // Save snapshot of all critical data
    const offlinePackage = {
      destinations: INITIAL_DESTINATIONS,
      itinerary,
      votingActivities,
      chatMessages,
      savedDestinations,
      downloadedAt: new Date().toISOString()
    };
    storage.set('offline_package', offlinePackage);
    storage.set('is_offline_ready', true);
    setIsOfflineReady(true);

    showToast(
      'Offline Ready! 💾',
      'Itinerary, tickets, routes, and emergency info cached locally.',
      'success',
      5000
    );
  };

  const toggleSimulatedOffline = () => {
    setIsSimulatedOffline((prev) => {
      const next = !prev;
      if (next) {
        showToast('Offline Mode Enabled', 'TripMate is now demonstrating cached local storage.', 'warning');
      } else {
        showToast('Back Online', 'Local changes synchronized with demo server.', 'success');
      }
      return next;
    });
  };

  // 7. Budget & Expenses State
  const [tripBudget, setTripBudget] = useState(() => {
    return storage.get('trip_budget', DEFAULT_BUDGET);
  });

  const [expenses, setExpenses] = useState(() => {
    return storage.get('expenses', INITIAL_EXPENSES);
  });

  const totalSpentINR = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + convertToINR(curr.amount, curr.currency), 0);
  }, [expenses]);

  const remainingBalanceINR = useMemo(() => {
    return tripBudget - totalSpentINR;
  }, [tripBudget, totalSpentINR]);

  const budgetUsedPercent = useMemo(() => {
    if (!tripBudget || tripBudget <= 0) return 0;
    return Math.round((totalSpentINR / tripBudget) * 100);
  }, [tripBudget, totalSpentINR]);

  const isBudgetWarning = budgetUsedPercent >= 70 && budgetUsedPercent <= 100;
  const isBudgetDanger = totalSpentINR > tripBudget;

  const addExpense = (newExp) => {
    const expenseItem = {
      id: `exp-${Date.now()}`,
      name: newExp.name.trim(),
      category: newExp.category || 'Miscellaneous',
      amount: Number(newExp.amount),
      currency: newExp.currency || 'INR',
      date: newExp.date || new Date().toISOString().split('T')[0],
      notes: newExp.notes || ''
    };

    const updated = [expenseItem, ...expenses];
    setExpenses(updated);
    storage.set('expenses', updated);

    const convertedAmount = convertToINR(expenseItem.amount, expenseItem.currency);
    const newTotal = totalSpentINR + convertedAmount;

    if (newTotal > tripBudget) {
      showToast(
        'Expense Added – Budget Exceeded! ⚠️',
        `₹${Math.round(convertedAmount).toLocaleString('en-IN')} added. Total spending is over budget.`,
        'danger',
        5000
      );
    } else if (newTotal >= tripBudget * 0.7) {
      showToast(
        'Expense Added – 70% Budget Used! ⚡',
        `₹${Math.round(convertedAmount).toLocaleString('en-IN')} added. You have reached 70%+ of your budget.`,
        'warning',
        5000
      );
    } else {
      showToast(
        'Expense Recorded! 💳',
        `Added "${expenseItem.name}" for ${expenseItem.currency === 'INR' ? '₹' : expenseItem.currency + ' '}${expenseItem.amount.toLocaleString()}.`,
        'success'
      );
    }
  };

  const deleteExpense = (expenseId) => {
    const target = expenses.find((e) => e.id === expenseId);
    const updated = expenses.filter((e) => e.id !== expenseId);
    setExpenses(updated);
    storage.set('expenses', updated);
    showToast('Expense Removed', `"${target?.name}" removed from expense tracker.`, 'info');
  };

  // 8. Bookings & Travel Documents
  const [bookings, setBookings] = useState(() => {
    return storage.get('bookings', [
      {
        id: 'BKG-TAJ-9921',
        type: 'Hotel',
        title: 'Taj Fort Aguada Resort & Spa',
        location: 'Candolim, North Goa',
        checkIn: '2026-11-15',
        checkOut: '2026-11-19',
        guests: '4 Adults · 2 Deluxe Sea View Rooms',
        amount: 20800,
        status: 'Confirmed',
        confirmationCode: 'TAJ-RES-44182',
        downloadUrl: '#',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'BKG-AIR-3302',
        type: 'Flight',
        title: 'IndiGo 6E-512 (DEL ➔ GOI)',
        location: 'Dabolim Airport, Goa',
        checkIn: '2026-11-15 06:45 AM',
        checkOut: '2026-11-15 09:15 AM',
        guests: '4 Passengers · Seats 12A-12D',
        amount: 14800,
        status: 'Confirmed',
        confirmationCode: '6E-PNR-8893A',
        downloadUrl: '#',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80'
      }
    ]);
  });

  const addBooking = (bookingData) => {
    const newBkg = {
      id: `BKG-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      status: 'Confirmed',
      confirmationCode: `TMP-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    const updated = [newBkg, ...bookings];
    setBookings(updated);
    storage.set('bookings', updated);
    showToast('Booking Confirmed! 🎫', `Reservation for "${newBkg.title}" saved to your Travel Documents.`, 'success');
  };

  // 9. Notifications List
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Disruption: Fort Aguada is Closed',
      message: 'Coastal storm surge & rain expected. 3 backup plans ready.',
      time: '15m ago',
      type: 'warning',
      read: false,
      link: '/alerts'
    },
    {
      id: 'notif-2',
      title: 'Sam voted for Water Sports',
      message: 'Water sports is currently leading with 2 group votes.',
      time: '35m ago',
      type: 'info',
      read: false,
      link: '/group'
    },
    {
      id: 'notif-3',
      title: 'Offline Sync Ready',
      message: 'Goa itinerary snapshot is ready for offline navigation.',
      time: '1h ago',
      type: 'success',
      read: true,
      link: '/schedule'
    }
  ]);

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All caught up!', 'All travel notifications marked as read.', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        // Toast
        toasts,
        showToast,
        removeToast,
        // Auth
        user,
        login,
        logout,
        // Saved Destinations
        savedDestinations,
        toggleSaveDestination,
        isDestinationSaved,
        // Group
        votingActivities,
        userVote,
        castVote,
        addCustomVotingActivity,
        chatMessages,
        sendChatMessage,
        groupMembers: INITIAL_GROUP_MEMBERS,
        // Itinerary
        itinerary,
        activeDay,
        setActiveDay,
        replaceItineraryStop,
        resetItineraryToOriginal,
        selectedBackupPlanId,
        // Offline
        isOfflineReady,
        isSimulatedOffline,
        downloadForOfflineUse,
        toggleSimulatedOffline,
        // Budget
        tripBudget,
        setTripBudget,
        expenses,
        addExpense,
        deleteExpense,
        totalSpentINR,
        remainingBalanceINR,
        budgetUsedPercent,
        isBudgetWarning,
        isBudgetDanger,
        // Bookings
        bookings,
        addBooking,
        // Notifications
        notifications,
        unreadNotificationsCount,
        markAllNotificationsRead,
        // Alerts
        disruption: DISRUPTION_SCENARIO,
        backupPlans: BACKUP_PLANS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
