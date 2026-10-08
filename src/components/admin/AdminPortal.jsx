import React, { useState, useEffect } from 'react';
import { useTravelData } from '../../context/DataContext';
import { 
  Shield, 
  Lock, 
  Key, 
  Database, 
  Sparkles, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  RefreshCw, 
  Check, 
  X, 
  ExternalLink, 
  Download, 
  User, 
  Tag, 
  MapPin, 
  Calendar, 
  Video, 
  Settings, 
  Users, 
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminPortal({ isOpen, onClose }) {
  const {
    isFirebaseLive,
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
    seedDatabase,
    resetToDefaults,
    refreshData
  } = useTravelData();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('tineskie_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('profile');
  const [toastMsg, setToastMsg] = useState(null);
  const [isSeeding, setIsSeeding] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(creatorProfile);
  useEffect(() => {
    setProfileForm(creatorProfile);
  }, [creatorProfile]);

  // Edit Modal State for Items
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(null); // 'promo', 'dest', 'itin', 'reel'

  // Firebase Config Form
  const [firebaseKeys, setFirebaseKeys] = useState(() => {
    const saved = localStorage.getItem('tineskie_custom_firebase_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
    };
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'tineskie2026' || passcode === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('tineskie_admin_auth', 'true');
      setAuthError('');
      confetti({ particleCount: 40, spread: 60 });
    } else {
      setAuthError('Incorrect passcode. Try "tineskie2026"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tineskie_admin_auth');
  };

  // Save Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateCreatorProfile(profileForm);
      showToast('Creator profile updated successfully!');
      confetti({ particleCount: 30, spread: 50 });
    } catch (err) {
      showToast('Error saving profile: ' + err.message);
    }
  };

  // Seed Firebase
  const handleSeedFirebase = async () => {
    if (!window.confirm('Seed all default travel data, promo codes, and itineraries into Firestore?')) return;
    setIsSeeding(true);
    try {
      const res = await seedDatabase();
      showToast(`Database seeded successfully! (Promos: ${res.promoCodes}, Destinations: ${res.destinations})`);
      confetti({ particleCount: 60, spread: 80 });
    } catch (err) {
      showToast('Seeding failed: ' + err.message);
    } finally {
      setIsSeeding(false);
    }
  };

  // Save Firebase Runtime Config
  const handleSaveFirebaseConfig = (e) => {
    e.preventDefault();
    localStorage.setItem('tineskie_custom_firebase_config', JSON.stringify(firebaseKeys));
    showToast('Firebase configuration saved! Reloading...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Export Leads to CSV
  const handleExportLeads = () => {
    if (!leads.length) {
      alert('No subscriber leads collected yet.');
      return;
    }
    const headers = ['Email', 'Name', 'Destination', 'Date'];
    const rows = leads.map(l => [
      l.email || '',
      l.name || 'Travel Bestie',
      l.destination || 'All Guides',
      l.createdAt || new Date().toISOString()
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tineskie_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10, 25, 18, 0.75)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10000,
            background: 'var(--green-dark)',
            color: '#FFFFFF',
            padding: '0.85rem 1.35rem',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontWeight: '700',
            fontSize: '0.9rem',
            border: '1px solid var(--green-mint)'
          }}
        >
          <CheckCircle2 size={18} color="#00f5a0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Admin Modal Window */}
      <div 
        style={{
          width: '100%',
          maxWidth: '1150px',
          height: '90vh',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--border-light)'
        }}
      >
        
        {/* Top Header Bar */}
        <div 
          style={{
            padding: '1rem 1.5rem',
            background: 'linear-gradient(90deg, #1B4332 0%, #2D6A4F 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Shield size={20} color="#D8F3DC" />
            </div>
            <div>
              <div style={{ fontWeight: '900', fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
                Tineskie Travel CMS & Firebase Admin
              </div>
              <div style={{ fontSize: '0.75rem', color: '#D8F3DC', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isFirebaseLive ? '#10B981' : '#E9C46A' }} />
                <span>{isFirebaseLive ? 'Live Firebase / Firestore Connected' : 'Local Mode (Configure Firebase in Settings)'}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isAuthenticated && (
              <button 
                onClick={handleLogout}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Lock Session
              </button>
            )}

            <button 
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#FFFFFF',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* Passcode Gate */
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ maxWidth: '380px', width: '100%', textAlign: 'center' }}>
              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  background: 'var(--green-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  border: '1px solid var(--border-light)'
                }}
              >
                <Lock size={32} color="var(--green-primary)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                Admin Portal Passcode
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginBottom: '1.5rem' }}>
                Enter your master passcode to edit website contents, promo codes, itineraries, and Firebase data.
              </p>

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1rem' }}>
                  <input 
                    type="password" 
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter passcode (default: tineskie2026)"
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: '1.5px solid var(--border-light)',
                      fontSize: '0.95rem',
                      textAlign: 'center',
                      outline: 'none'
                    }}
                  />
                </div>

                {authError && (
                  <div style={{ color: '#E63946', fontSize: '0.82rem', fontWeight: '700', marginBottom: '1rem' }}>
                    {authError}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-wiz btn-wiz-primary"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <Key size={16} />
                  <span>Unlock Admin Portal</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Full Admin Dashboard Layout */
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            
            {/* Sidebar Navigation */}
            <div 
              style={{
                width: '240px',
                background: 'var(--bg-primary)',
                borderRight: '1px solid var(--border-light)',
                padding: '1.25rem 0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                overflowY: 'auto'
              }}
            >
              {[
                { id: 'profile', label: 'Creator Profile & Hero', icon: <User size={16} /> },
                { id: 'deals', label: 'Promo Deals (Agoda/Klook)', icon: <Tag size={16} />, badge: promoCodes.length },
                { id: 'destinations', label: 'Destinations', icon: <MapPin size={16} />, badge: destinations.length },
                { id: 'itineraries', label: 'Itineraries', icon: <Calendar size={16} />, badge: itineraries.length },
                { id: 'reels', label: 'Reels & Videos', icon: <Video size={16} />, badge: reels.length },
                { id: 'leads', label: 'Leads & Subscribers', icon: <Users size={16} />, badge: leads.length },
                { id: 'firebase', label: 'Firebase & Database', icon: <Database size={16} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: activeTab === tab.id ? 'var(--green-primary)' : 'transparent',
                    color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-heading)',
                    fontWeight: activeTab === tab.id ? '800' : '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span 
                      style={{
                        background: activeTab === tab.id ? 'rgba(255,255,255,0.25)' : 'rgba(45, 106, 79, 0.12)',
                        color: activeTab === tab.id ? '#FFFFFF' : 'var(--green-primary)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: '800'
                      }}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}

              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                <button
                  onClick={refreshData}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    padding: '0.65rem',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    color: 'var(--green-primary)',
                    fontWeight: '700',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  <RefreshCw size={14} />
                  <span>Sync & Refresh Data</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: '1.75rem 2rem', overflowY: 'auto', background: '#FAFCFA' }}>
              
              {/* TAB 1: CREATOR PROFILE & HERO */}
              {activeTab === 'profile' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--text-heading)' }}>
                        Creator Profile & Hero Section
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                        Edit your bio, headline, live location pill, pet name, and social counts.
                      </p>
                    </div>
                    <button onClick={handleSaveProfile} className="btn-wiz btn-wiz-primary btn-wiz-sm">
                      <Save size={15} />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                          Creator Name
                        </label>
                        <input 
                          type="text" 
                          value={profileForm.name || ''}
                          onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                          Brand / Handle
                        </label>
                        <input 
                          type="text" 
                          value={profileForm.brand || ''}
                          onChange={e => setProfileForm({ ...profileForm, brand: e.target.value })}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                          Current Location (Pill in Hero)
                        </label>
                        <input 
                          type="text" 
                          value={profileForm.currentLocation || ''}
                          onChange={e => setProfileForm({ ...profileForm, currentLocation: e.target.value })}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                          Dog / Pet Name (Floating Hero Badge)
                        </label>
                        <input 
                          type="text" 
                          value={profileForm.petName || 'Max'}
                          onChange={e => setProfileForm({ ...profileForm, petName: e.target.value })}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                        Bio & Intro Paragraph
                      </label>
                      <textarea 
                        rows={3}
                        value={profileForm.bio || ''}
                        onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                        Avatar Image Path / URL
                      </label>
                      <input 
                        type="text" 
                        value={profileForm.avatar || ''}
                        onChange={e => setProfileForm({ ...profileForm, avatar: e.target.value })}
                        style={inputStyle}
                      />
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Default: <code>/tineskie-profile.jpg</code> (or any HTTPS image URL)
                      </span>
                    </div>

                    {/* HERO PHOTOS GALLERY (MULTI-PHOTO SLIDESHOW) */}
                    <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '16px', border: '1.5px solid rgba(82, 183, 136, 0.25)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <span>Hero Photo Slideshow (Circle Animation)</span>
                            <span style={{ fontSize: '0.75rem', background: 'var(--green-subtle)', color: 'var(--green-primary)', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontWeight: '800' }}>
                              {(profileForm.heroPhotos || []).length} Photos
                            </span>
                          </h4>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            Add multiple travel photos that fade in with the animated circle transition in the hero.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const newPhotoItem = {
                              id: `photo-${Date.now()}`,
                              url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
                              location: 'New Destination, PH',
                              badge: 'New Staycation',
                              caption: 'Aesthetic travel note'
                            };
                            setProfileForm({
                              ...profileForm,
                              heroPhotos: [...(profileForm.heroPhotos || []), newPhotoItem]
                            });
                          }}
                          className="btn-wiz btn-wiz-primary btn-wiz-sm"
                        >
                          <Plus size={14} />
                          <span>Add Photo</span>
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                        {(profileForm.heroPhotos || []).map((hp, idx) => (
                          <div 
                            key={hp.id || idx}
                            style={{
                              background: 'var(--bg-primary)',
                              borderRadius: '12px',
                              padding: '0.85rem',
                              border: '1px solid var(--border-light)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.5rem'
                            }}
                          >
                            <div style={{ height: '110px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                              <img src={hp.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button
                                type="button"
                                onClick={() => {
                                  if ((profileForm.heroPhotos || []).length <= 1) {
                                    alert('At least one hero photo is required.');
                                    return;
                                  }
                                  const updated = profileForm.heroPhotos.filter((_, i) => i !== idx);
                                  setProfileForm({ ...profileForm, heroPhotos: updated });
                                }}
                                style={{
                                  position: 'absolute',
                                  top: '6px',
                                  right: '6px',
                                  background: 'rgba(220, 38, 38, 0.9)',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>

                            <input 
                              type="text"
                              value={hp.url || ''}
                              onChange={(e) => {
                                const updated = [...profileForm.heroPhotos];
                                updated[idx].url = e.target.value;
                                setProfileForm({ ...profileForm, heroPhotos: updated });
                              }}
                              placeholder="Image URL / path"
                              style={{ ...inputStyle, fontSize: '0.78rem', padding: '0.45rem' }}
                            />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                              <input 
                                type="text"
                                value={hp.location || ''}
                                onChange={(e) => {
                                  const updated = [...profileForm.heroPhotos];
                                  updated[idx].location = e.target.value;
                                  setProfileForm({ ...profileForm, heroPhotos: updated });
                                }}
                                placeholder="Location Tag"
                                style={{ ...inputStyle, fontSize: '0.74rem', padding: '0.4rem' }}
                              />

                              <input 
                                type="text"
                                value={hp.badge || ''}
                                onChange={(e) => {
                                  const updated = [...profileForm.heroPhotos];
                                  updated[idx].badge = e.target.value;
                                  setProfileForm({ ...profileForm, heroPhotos: updated });
                                }}
                                placeholder="Badge / Mood"
                                style={{ ...inputStyle, fontSize: '0.74rem', padding: '0.4rem' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats Editor */}
                    <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
                        4 Hero Stat Chips
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                        {(profileForm.stats || []).map((st, idx) => (
                          <div key={idx} style={{ background: 'var(--bg-primary)', padding: '0.65rem', borderRadius: '10px' }}>
                            <input 
                              type="text" 
                              value={st.value}
                              onChange={e => {
                                const newStats = [...profileForm.stats];
                                newStats[idx].value = e.target.value;
                                setProfileForm({ ...profileForm, stats: newStats });
                              }}
                              style={{ ...inputStyle, fontWeight: '800', marginBottom: '0.3rem', fontSize: '0.9rem' }}
                              placeholder="e.g. 320K+"
                            />
                            <input 
                              type="text" 
                              value={st.label}
                              onChange={e => {
                                const newStats = [...profileForm.stats];
                                newStats[idx].label = e.target.value;
                                setProfileForm({ ...profileForm, stats: newStats });
                              }}
                              style={{ ...inputStyle, fontSize: '0.75rem' }}
                              placeholder="e.g. Facebook Besties"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button type="submit" className="btn-wiz btn-wiz-primary">
                        <Save size={16} />
                        <span>Save Profile to Firebase</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: PROMO DEALS & DISCOUNTS */}
              {activeTab === 'deals' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--text-heading)' }}>
                        Partner Promo Codes ({promoCodes.length})
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                        Add, edit, or remove discount codes for Agoda, Klook, and other travel partners.
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        setEditingType('promo');
                        setEditingItem({
                          id: `promo-${Date.now()}`,
                          partner: 'New Partner',
                          discount: '10% OFF',
                          category: 'Hotels & Stays',
                          code: 'TINESKIE',
                          badge: 'Exclusive Code',
                          subtext: 'Description of promotion',
                          link: 'https://'
                        });
                      }}
                      className="btn-wiz btn-wiz-primary btn-wiz-sm"
                    >
                      <Plus size={15} />
                      <span>Add Promo Code</span>
                    </button>
                  </div>

                  {/* Deals Cards Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                    {promoCodes.map((p) => (
                      <div 
                        key={p.id}
                        style={{
                          background: '#FFFFFF',
                          borderRadius: '16px',
                          padding: '1.25rem',
                          border: '1px solid var(--border-light)',
                          boxShadow: 'var(--shadow-sm)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: '900', fontSize: '1.1rem', color: 'var(--green-primary)' }}>
                              {p.discount}
                            </span>
                            <span style={{ fontSize: '0.72rem', fontWeight: '800', background: 'var(--green-subtle)', color: 'var(--green-dark)', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                              {p.badge || 'Verified'}
                            </span>
                          </div>

                          <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '0.2rem' }}>
                            {p.partner || p.category}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                            {p.subtext}
                          </div>

                          <div style={{ background: 'var(--bg-primary)', padding: '0.45rem 0.75rem', borderRadius: '8px', fontFamily: 'monospace', fontWeight: '800', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            Code: {p.code}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                          <button
                            onClick={() => {
                              setEditingType('promo');
                              setEditingItem(p);
                            }}
                            style={{
                              flex: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.35rem',
                              padding: '0.5rem',
                              borderRadius: '8px',
                              background: 'var(--green-subtle)',
                              color: 'var(--green-primary)',
                              border: 'none',
                              fontWeight: '700',
                              fontSize: '0.8rem',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit3 size={14} />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={async () => {
                              if (window.confirm(`Delete promo code for ${p.partner || p.id}?`)) {
                                await deletePromoCode(p.id);
                                showToast('Promo code deleted');
                              }
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '0.5rem 0.75rem',
                              borderRadius: '8px',
                              background: '#FEE2E2',
                              color: '#DC2626',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: DESTINATIONS */}
              {activeTab === 'destinations' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--text-heading)' }}>
                        Destinations Explorer ({destinations.length})
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                        Manage featured travel spots, photos, tags, and highlights.
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        setEditingType('dest');
                        setEditingItem({
                          id: `dest-${Date.now()}`,
                          title: 'New Destination',
                          country: 'Philippines',
                          category: 'Mountain Retreat',
                          badge: 'Trending ✦',
                          tagline: 'Scenic views & relaxing staycations',
                          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                          rating: '4.95',
                          bestSeason: 'Nov - Apr',
                          highlights: ['Sunrise viewing', 'Local cafe tour']
                        });
                      }}
                      className="btn-wiz btn-wiz-primary btn-wiz-sm"
                    >
                      <Plus size={15} />
                      <span>Add Destination</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {destinations.map(d => (
                      <div key={d.id} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ height: '140px', position: 'relative' }}>
                          <img src={d.image} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.92)', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: '800' }}>
                            {d.badge || d.category}
                          </span>
                        </div>
                        <div style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--text-heading)' }}>{d.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--green-primary)', fontWeight: '700', marginBottom: '0.5rem' }}>{d.country}</div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{d.tagline}</div>

                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                              onClick={() => { setEditingType('dest'); setEditingItem(d); }}
                              style={{ flex: 1, padding: '0.45rem', borderRadius: '8px', background: 'var(--green-subtle)', color: 'var(--green-primary)', border: 'none', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer' }}
                            >
                              Edit
                            </button>
                            <button 
                              onClick={async () => {
                                if (window.confirm(`Delete ${d.title}?`)) {
                                  await deleteDestination(d.id);
                                  showToast('Destination deleted');
                                }
                              }}
                              style={{ padding: '0.45rem 0.75rem', borderRadius: '8px', background: '#FEE2E2', color: '#DC2626', border: 'none', cursor: 'pointer' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: ITINERARIES */}
              {activeTab === 'itineraries' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--text-heading)' }}>
                        Travel Itineraries ({itineraries.length})
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                        Manage detailed 3-Day & 5-Day step-by-step guides with budget breakdowns.
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        setEditingType('itin');
                        setEditingItem({
                          id: `itin-${Date.now()}`,
                          title: 'New Custom Itinerary',
                          country: 'Philippines',
                          duration: '3 Days / 2 Nights',
                          budget: '₱5,500 - ₱8,000',
                          highlights: ['Day 1: Arrival', 'Day 2: Exploration', 'Day 3: Sunset'],
                          description: 'Full travel guide description here.'
                        });
                      }}
                      className="btn-wiz btn-wiz-primary btn-wiz-sm"
                    >
                      <Plus size={15} />
                      <span>Add Itinerary</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {itineraries.map(it => (
                      <div key={it.id} style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-heading)' }}>{it.title}</div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                            {it.duration || '3D2N'} · Budget: <strong style={{ color: 'var(--green-primary)' }}>{it.budget || it.estimatedCost}</strong>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => { setEditingType('itin'); setEditingItem(it); }}
                            style={{ padding: '0.45rem 0.95rem', borderRadius: '8px', background: 'var(--green-subtle)', color: 'var(--green-primary)', border: 'none', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={async () => {
                              if (window.confirm(`Delete ${it.title}?`)) {
                                await deleteItinerary(it.id);
                                showToast('Itinerary deleted');
                              }
                            }}
                            style={{ padding: '0.45rem 0.75rem', borderRadius: '8px', background: '#FEE2E2', color: '#DC2626', border: 'none', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: REELS */}
              {activeTab === 'reels' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--text-heading)' }}>
                        Cinematic Reels & Shorts ({reels.length})
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                        Add viral travel reels, views count, thumbnail preview, and Facebook links.
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        setEditingType('reel');
                        setEditingItem({
                          id: `reel-${Date.now()}`,
                          title: 'New Viral Reel',
                          location: 'Siargao, PH',
                          views: '1.2M Views',
                          category: 'Island Living',
                          thumbnail: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=600&q=80',
                          link: 'https://www.facebook.com/notesbytineskie'
                        });
                      }}
                      className="btn-wiz btn-wiz-primary btn-wiz-sm"
                    >
                      <Plus size={15} />
                      <span>Add Reel</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    {reels.map(r => (
                      <div key={r.id} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                        <div style={{ height: '160px', position: 'relative' }}>
                          <img src={r.thumbnail} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.75)', color: '#FFFFFF', padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800' }}>
                            {r.views}
                          </span>
                        </div>
                        <div style={{ padding: '0.85rem' }}>
                          <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-heading)' }}>{r.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{r.location}</div>
                          <div style={{ display: 'flex', gap: '0.45rem' }}>
                            <button onClick={() => { setEditingType('reel'); setEditingItem(r); }} style={{ flex: 1, padding: '0.4rem', borderRadius: '8px', background: 'var(--green-subtle)', color: 'var(--green-primary)', border: 'none', fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer' }}>Edit</button>
                            <button onClick={async () => { if (window.confirm('Delete reel?')) { await deleteReel(r.id); showToast('Reel deleted'); } }} style={{ padding: '0.4rem 0.65rem', borderRadius: '8px', background: '#FEE2E2', color: '#DC2626', border: 'none', cursor: 'pointer' }}><Trash2 size={13} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SUBSCRIBERS / LEADS */}
              {activeTab === 'leads' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--text-heading)' }}>
                        Captured Leads & Subscribers ({leads.length})
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                        Emails captured from Free Travel Guide & Preset sample downloads.
                      </p>
                    </div>

                    <button onClick={handleExportLeads} className="btn-wiz btn-wiz-primary btn-wiz-sm">
                      <Download size={15} />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  {leads.length === 0 ? (
                    <div style={{ background: '#FFFFFF', padding: '3rem', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                      <Users size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem' }} />
                      <h4 style={{ fontWeight: '800', color: 'var(--text-heading)' }}>No leads captured yet</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        When visitors enter their email in the Free Guide modal, they will appear here automatically!
                      </p>
                    </div>
                  ) : (
                    <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                        <thead>
                          <tr style={{ background: 'var(--bg-primary)', textAlign: 'left', borderBottom: '1px solid var(--border-light)' }}>
                            <th style={{ padding: '0.75rem 1rem', fontWeight: '800' }}>Email</th>
                            <th style={{ padding: '0.75rem 1rem', fontWeight: '800' }}>Name</th>
                            <th style={{ padding: '0.75rem 1rem', fontWeight: '800' }}>Guide Requested</th>
                            <th style={{ padding: '0.75rem 1rem', fontWeight: '800' }}>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leads.map((l, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                              <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--green-dark)' }}>{l.email}</td>
                              <td style={{ padding: '0.75rem 1rem' }}>{l.name || 'Travel Bestie'}</td>
                              <td style={{ padding: '0.75rem 1rem' }}>{l.guideType || 'Siargao + Matcha Preset'}</td>
                              <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                {l.createdAt ? new Date(l.createdAt).toLocaleDateString() : 'Recent'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: FIREBASE & DATABASE SETTINGS */}
              {activeTab === 'firebase' && (
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--text-heading)' }}>
                      Firebase & Firestore Settings
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                      Connect your Google Firebase project and populate all collections in 1 click.
                    </p>
                  </div>

                  {/* 1-Click Database Seeder Box */}
                  <div 
                    style={{
                      background: 'linear-gradient(135deg, var(--green-subtle) 0%, #FFFFFF 100%)',
                      border: '2px solid var(--green-mint)',
                      borderRadius: '20px',
                      padding: '1.5rem',
                      marginBottom: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <Sparkles size={18} color="var(--green-primary)" />
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--green-dark)' }}>
                          1-Click Firestore Initial Data Seeder
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', maxWidth: '540px' }}>
                        Pushes all verified promo codes (Agoda/Klook), itineraries, reels, and Tineskie's profile into your Firestore database in one click.
                      </p>
                    </div>

                    <button 
                      onClick={handleSeedFirebase}
                      disabled={isSeeding}
                      className="btn-wiz btn-wiz-primary"
                      style={{ padding: '0.85rem 1.5rem', boxShadow: '0 4px 15px rgba(45, 106, 79, 0.25)' }}
                    >
                      <Database size={16} />
                      <span>{isSeeding ? 'Seeding Firestore...' : 'Seed Firestore Now'}</span>
                    </button>
                  </div>

                  {/* Firebase Configuration Keys Form */}
                  <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                      Firebase Project Credentials
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                      Paste your Firebase project credentials from the <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--green-primary)', fontWeight: '700' }}>Firebase Console</a> (Project Settings &gt; General &gt; Your Apps).
                    </p>

                    <form onSubmit={handleSaveFirebaseConfig} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                        <div>
                          <label style={labelStyle}>API Key (apiKey)</label>
                          <input 
                            type="text" 
                            value={firebaseKeys.apiKey || ''} 
                            onChange={e => setFirebaseKeys({ ...firebaseKeys, apiKey: e.target.value })}
                            placeholder="AIzaSy..." 
                            style={inputStyle} 
                          />
                        </div>

                        <div>
                          <label style={labelStyle}>Project ID (projectId)</label>
                          <input 
                            type="text" 
                            value={firebaseKeys.projectId || ''} 
                            onChange={e => setFirebaseKeys({ ...firebaseKeys, projectId: e.target.value })}
                            placeholder="tineskie-travel" 
                            style={inputStyle} 
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                        <div>
                          <label style={labelStyle}>Auth Domain (authDomain)</label>
                          <input 
                            type="text" 
                            value={firebaseKeys.authDomain || ''} 
                            onChange={e => setFirebaseKeys({ ...firebaseKeys, authDomain: e.target.value })}
                            placeholder="tineskie-travel.firebaseapp.com" 
                            style={inputStyle} 
                          />
                        </div>

                        <div>
                          <label style={labelStyle}>Storage Bucket (storageBucket)</label>
                          <input 
                            type="text" 
                            value={firebaseKeys.storageBucket || ''} 
                            onChange={e => setFirebaseKeys({ ...firebaseKeys, storageBucket: e.target.value })}
                            placeholder="tineskie-travel.appspot.com" 
                            style={inputStyle} 
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                        <div>
                          <label style={labelStyle}>Messaging Sender ID</label>
                          <input 
                            type="text" 
                            value={firebaseKeys.messagingSenderId || ''} 
                            onChange={e => setFirebaseKeys({ ...firebaseKeys, messagingSenderId: e.target.value })}
                            placeholder="1234567890" 
                            style={inputStyle} 
                          />
                        </div>

                        <div>
                          <label style={labelStyle}>App ID (appId)</label>
                          <input 
                            type="text" 
                            value={firebaseKeys.appId || ''} 
                            onChange={e => setFirebaseKeys({ ...firebaseKeys, appId: e.target.value })}
                            placeholder="1:123456:web:abcd..." 
                            style={inputStyle} 
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                        <button 
                          type="button" 
                          onClick={() => {
                            if (window.confirm('Reset all content to original defaults?')) {
                              resetToDefaults();
                              showToast('Reset to default template content');
                            }
                          }}
                          style={{
                            background: 'none',
                            border: '1px solid #E5E7EB',
                            color: '#6B7280',
                            padding: '0.65rem 1rem',
                            borderRadius: '10px',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          Reset Factory Defaults
                        </button>

                        <button type="submit" className="btn-wiz btn-wiz-primary">
                          <Save size={16} />
                          <span>Save & Connect Firebase</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', width: '100%', maxWidth: '520px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h4 style={{ fontWeight: '900', fontSize: '1.15rem', color: 'var(--text-heading)' }}>
                Edit {editingType === 'promo' ? 'Promo Code' : editingType === 'dest' ? 'Destination' : editingType === 'itin' ? 'Itinerary' : 'Item'}
              </h4>
              <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            {/* Promo Code Form */}
            {editingType === 'promo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={labelStyle}>Partner Platform</label>
                  <input type="text" value={editingItem.partner || ''} onChange={e => setEditingItem({ ...editingItem, partner: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Discount Headline (e.g. 10% OFF)</label>
                  <input type="text" value={editingItem.discount || ''} onChange={e => setEditingItem({ ...editingItem, discount: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Category (e.g. Hotels & Stays)</label>
                  <input type="text" value={editingItem.category || ''} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Promo Code String</label>
                  <input type="text" value={editingItem.code || ''} onChange={e => setEditingItem({ ...editingItem, code: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Subtext Description</label>
                  <input type="text" value={editingItem.subtext || ''} onChange={e => setEditingItem({ ...editingItem, subtext: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Affiliate / Claim URL</label>
                  <input type="text" value={editingItem.link || ''} onChange={e => setEditingItem({ ...editingItem, link: e.target.value })} style={inputStyle} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button onClick={() => setEditingItem(null)} style={{ padding: '0.65rem 1rem', borderRadius: '10px', border: '1px solid var(--border-light)', background: '#FFFFFF', cursor: 'pointer' }}>Cancel</button>
                  <button 
                    onClick={async () => {
                      await addOrUpdatePromoCode(editingItem);
                      setEditingItem(null);
                      showToast('Promo code saved!');
                    }} 
                    className="btn-wiz btn-wiz-primary"
                  >
                    Save Promo Code
                  </button>
                </div>
              </div>
            )}

            {/* Destination Form */}
            {editingType === 'dest' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={labelStyle}>Destination Title</label>
                  <input type="text" value={editingItem.title || ''} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Country / Region</label>
                  <input type="text" value={editingItem.country || ''} onChange={e => setEditingItem({ ...editingItem, country: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Category</label>
                  <input type="text" value={editingItem.category || ''} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Image URL</label>
                  <input type="text" value={editingItem.image || ''} onChange={e => setEditingItem({ ...editingItem, image: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Tagline / Short Desc</label>
                  <input type="text" value={editingItem.tagline || ''} onChange={e => setEditingItem({ ...editingItem, tagline: e.target.value })} style={inputStyle} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button onClick={() => setEditingItem(null)} style={{ padding: '0.65rem 1rem', borderRadius: '10px', border: '1px solid var(--border-light)', background: '#FFFFFF', cursor: 'pointer' }}>Cancel</button>
                  <button 
                    onClick={async () => {
                      await addOrUpdateDestination(editingItem);
                      setEditingItem(null);
                      showToast('Destination saved!');
                    }} 
                    className="btn-wiz btn-wiz-primary"
                  >
                    Save Destination
                  </button>
                </div>
              </div>
            )}

            {/* Itinerary Form */}
            {editingType === 'itin' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={labelStyle}>Itinerary Title</label>
                  <input type="text" value={editingItem.title || ''} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Duration</label>
                  <input type="text" value={editingItem.duration || ''} onChange={e => setEditingItem({ ...editingItem, duration: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Budget Estimate</label>
                  <input type="text" value={editingItem.budget || editingItem.estimatedCost || ''} onChange={e => setEditingItem({ ...editingItem, budget: e.target.value, estimatedCost: e.target.value })} style={inputStyle} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button onClick={() => setEditingItem(null)} style={{ padding: '0.65rem 1rem', borderRadius: '10px', border: '1px solid var(--border-light)', background: '#FFFFFF', cursor: 'pointer' }}>Cancel</button>
                  <button 
                    onClick={async () => {
                      await addOrUpdateItinerary(editingItem);
                      setEditingItem(null);
                      showToast('Itinerary saved!');
                    }} 
                    className="btn-wiz btn-wiz-primary"
                  >
                    Save Itinerary
                  </button>
                </div>
              </div>
            )}

            {/* Reel Form */}
            {editingType === 'reel' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={labelStyle}>Reel Title</label>
                  <input type="text" value={editingItem.title || ''} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Location</label>
                  <input type="text" value={editingItem.location || ''} onChange={e => setEditingItem({ ...editingItem, location: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Views Count (e.g. 1.2M Views)</label>
                  <input type="text" value={editingItem.views || ''} onChange={e => setEditingItem({ ...editingItem, views: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Thumbnail URL</label>
                  <input type="text" value={editingItem.thumbnail || ''} onChange={e => setEditingItem({ ...editingItem, thumbnail: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Reel URL / Facebook Video Link</label>
                  <input type="text" value={editingItem.link || ''} onChange={e => setEditingItem({ ...editingItem, link: e.target.value })} style={inputStyle} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button onClick={() => setEditingItem(null)} style={{ padding: '0.65rem 1rem', borderRadius: '10px', border: '1px solid var(--border-light)', background: '#FFFFFF', cursor: 'pointer' }}>Cancel</button>
                  <button 
                    onClick={async () => {
                      await addOrUpdateReel(editingItem);
                      setEditingItem(null);
                      showToast('Reel saved!');
                    }} 
                    className="btn-wiz btn-wiz-primary"
                  >
                    Save Reel
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  borderRadius: '10px',
  border: '1px solid var(--border-light)',
  background: '#FFFFFF',
  fontSize: '0.85rem',
  color: 'var(--text-heading)',
  outline: 'none',
  fontFamily: 'inherit'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: '800',
  color: 'var(--text-heading)',
  marginBottom: '0.3rem'
};
