import React, { createContext, useContext, useState, useEffect } from 'react';
import * as defaultData from '../data/travelData';
import { isFirebaseConfigured, db } from '../firebase/config';
import { 
  getCreatorProfileFromDb, 
  saveCreatorProfileToDb,
  getPromoCodesFromDb,
  savePromoCodeToDb,
  deletePromoCodeFromDb,
  getDestinationsFromDb,
  saveDestinationToDb,
  deleteDestinationFromDb,
  getItinerariesFromDb,
  saveItineraryToDb,
  deleteItineraryFromDb,
  getReelsFromDb,
  saveReelToDb,
  deleteReelFromDb,
  saveSubscriberLead,
  getSubscriberLeads,
  seedFirestoreWithDefaults
} from '../firebase/firestoreService';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [isFirebaseLive, setIsFirebaseLive] = useState(isFirebaseConfigured());
  const [isLoading, setIsLoading] = useState(true);

  // Core App States
  const [creatorProfile, setCreatorProfile] = useState(defaultData.creatorProfile || {});
  const [promoCodes, setPromoCodes] = useState(defaultData.promoCodesData || []);
  const [destinations, setDestinations] = useState(defaultData.destinationsData || []);
  const [itineraries, setItineraries] = useState(defaultData.destinationsData || []);
  const [reels, setReels] = useState(defaultData.videoReelsData || []);
  const [leads, setLeads] = useState([]);

  // Load Initial Data (Firestore or LocalStorage overrides or Defaults)
  const refreshData = async () => {
    setIsLoading(true);
    const hasFirebase = isFirebaseConfigured();
    setIsFirebaseLive(hasFirebase);

    if (hasFirebase) {
      try {
        const [prof, promos, dests, itins, rls, lds] = await Promise.all([
          getCreatorProfileFromDb(),
          getPromoCodesFromDb(),
          getDestinationsFromDb(),
          getItinerariesFromDb(),
          getReelsFromDb(),
          getSubscriberLeads()
        ]);

        if (prof) setCreatorProfile(prof);
        if (promos && promos.length > 0) setPromoCodes(promos);
        if (dests && dests.length > 0) setDestinations(dests);
        if (itins && itins.length > 0) setItineraries(itins);
        if (rls && rls.length > 0) setReels(rls);
        if (lds) setLeads(lds);
      } catch (err) {
        console.warn('Firestore fetch failed, using local/default state', err);
        loadLocalFallback();
      }
    } else {
      loadLocalFallback();
    }
    setIsLoading(false);
  };

  const loadLocalFallback = () => {
    const local = localStorage.getItem('tineskie_cms_overrides');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.creatorProfile) setCreatorProfile(parsed.creatorProfile);
        if (parsed.promoCodes) setPromoCodes(parsed.promoCodes);
        if (parsed.destinations) setDestinations(parsed.destinations);
        if (parsed.itineraries) setItineraries(parsed.itineraries);
        if (parsed.reels) setReels(parsed.reels);
      } catch (e) {
        console.error('Error loading local CMS overrides', e);
      }
    }
    const localLeads = JSON.parse(localStorage.getItem('tineskie_local_leads') || '[]');
    setLeads(localLeads);
  };

  const saveLocalFallback = (newData) => {
    localStorage.setItem('tineskie_cms_overrides', JSON.stringify({
      creatorProfile: newData.creatorProfile || creatorProfile,
      promoCodes: newData.promoCodes || promoCodes,
      destinations: newData.destinations || destinations,
      itineraries: newData.itineraries || itineraries,
      reels: newData.reels || reels
    }));
  };

  useEffect(() => {
    refreshData();
  }, []);

  // ==========================================
  // MUTATION HANDLERS (Firestore + Local Fallback)
  // ==========================================

  const updateCreatorProfile = async (newProfile) => {
    setCreatorProfile(newProfile);
    saveLocalFallback({ creatorProfile: newProfile });
    if (isFirebaseLive) {
      await saveCreatorProfileToDb(newProfile);
    }
  };

  const addOrUpdatePromoCode = async (promo) => {
    const id = promo.id || `promo-${Date.now()}`;
    const updated = { ...promo, id };
    const newList = promoCodes.some(p => p.id === id)
      ? promoCodes.map(p => p.id === id ? updated : p)
      : [updated, ...promoCodes];
    
    setPromoCodes(newList);
    saveLocalFallback({ promoCodes: newList });
    if (isFirebaseLive) {
      await savePromoCodeToDb(updated);
    }
    return id;
  };

  const deletePromoCode = async (id) => {
    const newList = promoCodes.filter(p => p.id !== id);
    setPromoCodes(newList);
    saveLocalFallback({ promoCodes: newList });
    if (isFirebaseLive) {
      await deletePromoCodeFromDb(id);
    }
  };

  const addOrUpdateDestination = async (dest) => {
    const id = dest.id || `dest-${Date.now()}`;
    const updated = { ...dest, id };
    const newList = destinations.some(d => d.id === id)
      ? destinations.map(d => d.id === id ? updated : d)
      : [updated, ...destinations];

    setDestinations(newList);
    saveLocalFallback({ destinations: newList });
    if (isFirebaseLive) {
      await saveDestinationToDb(updated);
    }
    return id;
  };

  const deleteDestination = async (id) => {
    const newList = destinations.filter(d => d.id !== id);
    setDestinations(newList);
    saveLocalFallback({ destinations: newList });
    if (isFirebaseLive) {
      await deleteDestinationFromDb(id);
    }
  };

  const addOrUpdateItinerary = async (itin) => {
    const id = itin.id || `itin-${Date.now()}`;
    const updated = { ...itin, id };
    const newList = itineraries.some(i => i.id === id)
      ? itineraries.map(i => i.id === id ? updated : i)
      : [updated, ...itineraries];

    setItineraries(newList);
    saveLocalFallback({ itineraries: newList });
    if (isFirebaseLive) {
      await saveItineraryToDb(updated);
    }
    return id;
  };

  const deleteItinerary = async (id) => {
    const newList = itineraries.filter(i => i.id !== id);
    setItineraries(newList);
    saveLocalFallback({ itineraries: newList });
    if (isFirebaseLive) {
      await deleteItineraryFromDb(id);
    }
  };

  const addOrUpdateReel = async (reel) => {
    const id = reel.id || `reel-${Date.now()}`;
    const updated = { ...reel, id };
    const newList = reels.some(r => r.id === id)
      ? reels.map(r => r.id === id ? updated : r)
      : [updated, ...reels];

    setReels(newList);
    saveLocalFallback({ reels: newList });
    if (isFirebaseLive) {
      await saveReelToDb(updated);
    }
    return id;
  };

  const deleteReel = async (id) => {
    const newList = reels.filter(r => r.id !== id);
    setReels(newList);
    saveLocalFallback({ reels: newList });
    if (isFirebaseLive) {
      await deleteReelFromDb(id);
    }
  };

  const recordLead = async (leadData) => {
    await saveSubscriberLead(leadData);
    setLeads(prev => [{ ...leadData, createdAt: new Date().toISOString() }, ...prev]);
  };

  const seedDatabase = async () => {
    const res = await seedFirestoreWithDefaults({
      creatorProfile: defaultData.creatorProfile,
      promoCodesData: defaultData.promoCodesData,
      destinationsData: defaultData.destinationsData,
      itinerariesData: defaultData.destinationsData,
      reelsData: defaultData.videoReelsData
    });
    await refreshData();
    return res;
  };

  const resetToDefaults = () => {
    localStorage.removeItem('tineskie_cms_overrides');
    setCreatorProfile(defaultData.creatorProfile || {});
    setPromoCodes(defaultData.promoCodesData || []);
    setDestinations(defaultData.destinationsData || []);
    setItineraries(defaultData.destinationsData || []);
    setReels(defaultData.videoReelsData || []);
  };

  return (
    <DataContext.Provider
      value={{
        isFirebaseLive,
        isLoading,
        refreshData,
        creatorProfile,
        promoCodes,
        destinations,
        itineraries,
        reels,
        leads,
        updateCreatorProfile,
        addOrUpdatePromoCode,
        deletePromoCode,
        addOrUpdateDestination,
        deleteDestination,
        addOrUpdateItinerary,
        deleteItinerary,
        addOrUpdateReel,
        deleteReel,
        recordLead,
        seedDatabase,
        resetToDefaults
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useTravelData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useTravelData must be used within a DataProvider');
  }
  return context;
}
