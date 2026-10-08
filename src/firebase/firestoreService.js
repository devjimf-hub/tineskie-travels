import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

/**
 * Helper to check if Firestore instance is available
 */
const checkDb = () => {
  if (!db || !isFirebaseConfigured()) {
    return false;
  }
  return true;
};

// ==========================================
// 1. CREATOR PROFILE
// ==========================================

export async function getCreatorProfileFromDb() {
  if (!checkDb()) return null;
  try {
    const docRef = doc(db, 'settings', 'creatorProfile');
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error('Error fetching creator profile from Firestore:', err);
    return null;
  }
}

export async function saveCreatorProfileToDb(profileData) {
  if (!checkDb()) return false;
  try {
    const docRef = doc(db, 'settings', 'creatorProfile');
    await setDoc(docRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Error saving creator profile to Firestore:', err);
    throw err;
  }
}

// ==========================================
// 2. PROMO CODES
// ==========================================

export async function getPromoCodesFromDb() {
  if (!checkDb()) return null;
  try {
    const q = collection(db, 'promoCodes');
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error fetching promo codes:', err);
    return null;
  }
}

export async function savePromoCodeToDb(promoData) {
  if (!checkDb()) return false;
  try {
    const id = promoData.id || String(Date.now());
    const docRef = doc(db, 'promoCodes', id);
    await setDoc(docRef, {
      ...promoData,
      id,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return id;
  } catch (err) {
    console.error('Error saving promo code:', err);
    throw err;
  }
}

export async function deletePromoCodeFromDb(id) {
  if (!checkDb()) return false;
  try {
    await deleteDoc(doc(db, 'promoCodes', id));
    return true;
  } catch (err) {
    console.error('Error deleting promo code:', err);
    throw err;
  }
}

// ==========================================
// 3. DESTINATIONS
// ==========================================

export async function getDestinationsFromDb() {
  if (!checkDb()) return null;
  try {
    const snap = await getDocs(collection(db, 'destinations'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error fetching destinations:', err);
    return null;
  }
}

export async function saveDestinationToDb(destData) {
  if (!checkDb()) return false;
  try {
    const id = destData.id || String(Date.now());
    await setDoc(doc(db, 'destinations', id), {
      ...destData,
      id,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return id;
  } catch (err) {
    console.error('Error saving destination:', err);
    throw err;
  }
}

export async function deleteDestinationFromDb(id) {
  if (!checkDb()) return false;
  try {
    await deleteDoc(doc(db, 'destinations', id));
    return true;
  } catch (err) {
    console.error('Error deleting destination:', err);
    throw err;
  }
}

// ==========================================
// 4. ITINERARIES
// ==========================================

export async function getItinerariesFromDb() {
  if (!checkDb()) return null;
  try {
    const snap = await getDocs(collection(db, 'itineraries'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error fetching itineraries:', err);
    return null;
  }
}

export async function saveItineraryToDb(itineraryData) {
  if (!checkDb()) return false;
  try {
    const id = itineraryData.id || String(Date.now());
    await setDoc(doc(db, 'itineraries', id), {
      ...itineraryData,
      id,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return id;
  } catch (err) {
    console.error('Error saving itinerary:', err);
    throw err;
  }
}

export async function deleteItineraryFromDb(id) {
  if (!checkDb()) return false;
  try {
    await deleteDoc(doc(db, 'itineraries', id));
    return true;
  } catch (err) {
    console.error('Error deleting itinerary:', err);
    throw err;
  }
}

// ==========================================
// 5. REELS
// ==========================================

export async function getReelsFromDb() {
  if (!checkDb()) return null;
  try {
    const snap = await getDocs(collection(db, 'reels'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error fetching reels:', err);
    return null;
  }
}

export async function saveReelToDb(reelData) {
  if (!checkDb()) return false;
  try {
    const id = reelData.id || String(Date.now());
    await setDoc(doc(db, 'reels', id), {
      ...reelData,
      id,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return id;
  } catch (err) {
    console.error('Error saving reel:', err);
    throw err;
  }
}

export async function deleteReelFromDb(id) {
  if (!checkDb()) return false;
  try {
    await deleteDoc(doc(db, 'reels', id));
    return true;
  } catch (err) {
    console.error('Error deleting reel:', err);
    throw err;
  }
}

// ==========================================
// 6. SUBSCRIBERS / LEADS
// ==========================================

export async function saveSubscriberLead(leadData) {
  if (!checkDb()) {
    // LocalStorage fallback for offline leads
    const local = JSON.parse(localStorage.getItem('tineskie_local_leads') || '[]');
    local.unshift({ ...leadData, createdAt: new Date().toISOString() });
    localStorage.setItem('tineskie_local_leads', JSON.stringify(local));
    return true;
  }
  try {
    await addDoc(collection(db, 'leads'), {
      ...leadData,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (err) {
    console.error('Error saving lead to Firestore:', err);
    // fallback
    const local = JSON.parse(localStorage.getItem('tineskie_local_leads') || '[]');
    local.unshift({ ...leadData, createdAt: new Date().toISOString() });
    localStorage.setItem('tineskie_local_leads', JSON.stringify(local));
    return true;
  }
}

export async function getSubscriberLeads() {
  if (!checkDb()) {
    return JSON.parse(localStorage.getItem('tineskie_local_leads') || '[]');
  }
  try {
    const snap = await getDocs(collection(db, 'leads'));
    const firestoreLeads = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    const localLeads = JSON.parse(localStorage.getItem('tineskie_local_leads') || '[]');
    return [...firestoreLeads, ...localLeads];
  } catch (err) {
    console.error('Error fetching leads:', err);
    return JSON.parse(localStorage.getItem('tineskie_local_leads') || '[]');
  }
}

// ==========================================
// 7. SEED FIRESTORE WITH INITIAL DEFAULT DATA
// ==========================================

export async function seedFirestoreWithDefaults(initialData) {
  if (!checkDb()) {
    throw new Error("Firebase is not connected. Please enter your Firebase API keys in the Settings tab.");
  }

  const {
    creatorProfile,
    promoCodesData,
    destinationsData,
    itinerariesData,
    reelsData
  } = initialData;

  const results = {
    creatorProfile: false,
    promoCodes: 0,
    destinations: 0,
    itineraries: 0,
    reels: 0
  };

  // 1. Seed Creator Profile
  if (creatorProfile) {
    await setDoc(doc(db, 'settings', 'creatorProfile'), {
      ...creatorProfile,
      updatedAt: serverTimestamp()
    });
    results.creatorProfile = true;
  }

  // 2. Seed Promo Codes
  if (Array.isArray(promoCodesData)) {
    for (const promo of promoCodesData) {
      await setDoc(doc(db, 'promoCodes', promo.id), {
        ...promo,
        updatedAt: serverTimestamp()
      });
      results.promoCodes++;
    }
  }

  // 3. Seed Destinations
  if (Array.isArray(destinationsData)) {
    for (const dest of destinationsData) {
      await setDoc(doc(db, 'destinations', dest.id), {
        ...dest,
        updatedAt: serverTimestamp()
      });
      results.destinations++;
    }
  }

  // 4. Seed Itineraries
  if (Array.isArray(itinerariesData)) {
    for (const itin of itinerariesData) {
      await setDoc(doc(db, 'itineraries', itin.id), {
        ...itin,
        updatedAt: serverTimestamp()
      });
      results.itineraries++;
    }
  }

  // 5. Seed Reels
  if (Array.isArray(reelsData)) {
    for (const reel of reelsData) {
      await setDoc(doc(db, 'reels', reel.id), {
        ...reel,
        updatedAt: serverTimestamp()
      });
      results.reels++;
    }
  }

  return results;
}
