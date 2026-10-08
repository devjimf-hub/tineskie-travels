import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Helper to get configuration from environment variables or custom runtime storage
export function getFirebaseConfig() {
  const customConfig = localStorage.getItem('tineskie_custom_firebase_config');
  if (customConfig) {
    try {
      const parsed = JSON.parse(customConfig);
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse custom Firebase config from localStorage', e);
    }
  }

  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
  };
}

const firebaseConfig = getFirebaseConfig();

export const isFirebaseConfigured = () => {
  const config = getFirebaseConfig();
  return Boolean(config.apiKey && config.projectId && config.apiKey !== "YOUR_API_KEY");
};

// Initialize Firebase safely
let app = null;
let db = null;
let auth = null;

try {
  if (isFirebaseConfigured()) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  }
} catch (error) {
  console.warn("Firebase initialization skipped or encountered an error:", error);
}

export { app, db, auth };
