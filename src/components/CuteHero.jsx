import React from 'react';
import {
  Sparkles,
  MapPin,
  Tag,
  Compass,
  Sliders,
  Play,
  Heart,
  ArrowRight,
  Gift,
  ExternalLink
} from 'lucide-react';
import { FacebookIcon } from './SocialIcons';
import { creatorProfile } from '../data/travelData';

export default function CuteHero({ onOpenShowreel, onOpenFreeGuide }) {
  return (
    <section
      style={{
        paddingTop: '7.5rem',
        paddingBottom: '3.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>

          {/* Cute Creator Avatar with Live Status */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.25rem' }}>
            <div
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                padding: '4px',
                background: 'linear-gradient(135deg, var(--green-matcha) 0%, var(--accent-peach) 100%)',
                boxShadow: '0 12px 30px rgba(46, 90, 68, 0.22)',
                margin: '0 auto'
              }}
            >
              <img
                src={creatorProfile.avatar}
                alt={creatorProfile.name}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%'
                }}
              />
            </div>

            {/* Live Location Pill */}
            <div
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                background: 'var(--color-card)',
                border: '1.5px solid var(--green-matcha)',
                borderRadius: '9999px',
                padding: '0.25rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: '800',
                color: 'var(--green-matcha-dark)',
                boxShadow: 'var(--shadow-cute)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px #10B981' }} />
              <span>{creatorProfile.currentLocation}</span>
            </div>
          </div>

          {/* Cute Facebook Page Badge */}
          <div style={{ marginTop: '1rem', marginBottom: '0.85rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a
              href={creatorProfile.facebookUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.95rem',
                borderRadius: '9999px',
                background: 'var(--green-pistachio)',
                color: 'var(--green-matcha-dark)',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: '800',
                border: '1px solid rgba(46, 90, 68, 0.2)'
              }}
            >
              <FacebookIcon size={14} color="var(--green-matcha-dark)" />
              <span>Notes by Tineskie (320K+ Followers)</span>
              <ExternalLink size={12} />
            </a>

            <span className="cute-stamp">
              Solo Travel & Staycations 🌿
            </span>
          </div>

          {/* Main Title with Italic Serif */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: '900',
              lineHeight: '1.12',
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              marginBottom: '1.25rem'
            }}
          >
            Solo trips, cozy staycations, & <br />
            <span className="font-serif-italic" style={{ color: 'var(--green-matcha)', fontSize: '1.15em' }}>
              honest travel notes.
            </span>
          </h1>

          {/* Bio text */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
              color: 'var(--text-body)',
              lineHeight: '1.65',
              maxWidth: '660px',
              margin: '0 auto 2.25rem auto'
            }}
          >
            {creatorProfile.bio}
          </p>

          {/* Top Quick Links / CTAs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.85rem',
              flexWrap: 'wrap',
              marginBottom: '3.5rem'
            }}
          >
            <a href="#promos" className="btn-cute btn-cute-primary">
              <Tag size={18} />
              <span>Agoda & Klook Promo Codes 🏷️</span>
            </a>

            <a href="#guides" className="btn-cute btn-cute-outline">
              <Compass size={18} />
              <span>Explore Itinerary Notes</span>
            </a>

            <a
              href={creatorProfile.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-cute btn-cute-peach"
            >
              <FacebookIcon size={16} />
              <span>Visit Facebook Page</span>
            </a>
          </div>

          {/* Link-In-Bio Style 4 Cute Action Cards (Like Wiz Travels!) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '1rem',
              marginBottom: '3rem'
            }}
          >
            {[
              {
                title: "Baguio & Mt. Camisong",
                sub: "Pine sea of clouds & artist cafes",
                href: "#guides",
                emoji: "🌲",
                tag: "Highlands",
                color: "var(--green-pistachio)"
              },
              {
                title: "Cebu Mist Mountain",
                sub: "Cliffside infinity pool staycation",
                href: "#guides",
                emoji: "✨",
                tag: "Viral Stay",
                color: "var(--accent-honey-light)"
              },
              {
                title: "Active Promo Codes",
                sub: "TINESKIE (Agoda) & TINESKIEKLOOK",
                href: "#promos",
                emoji: "🏷️",
                tag: "Save 10-15%",
                color: "var(--accent-peach-light)"
              },
              {
                title: "Siargao Island Guide",
                sub: "Secret river swings & rockpools",
                href: "#guides",
                emoji: "🌴",
                tag: "Island Life",
                color: "var(--green-pistachio)"
              }
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="cute-card"
                style={{
                  padding: '1.25rem 1rem',
                  textDecoration: 'none',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '140px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>{item.emoji}</span>
                    <span className="badge-matcha" style={{ fontSize: '0.68rem', padding: '0.2rem 0.6rem' }}>
                      {item.tag}
                    </span>
                  </div>
                  <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '0.98rem', marginBottom: '0.2rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    {item.sub}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem', color: 'var(--green-matcha)', fontWeight: '700', marginTop: '0.75rem' }}>
                  <span>Open</span>
                  <ArrowRight size={13} />
                </div>
              </a>
            ))}
          </div>

          {/* Social Stats Pill Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              padding: '1rem 1.5rem',
              background: 'var(--color-card)',
              borderRadius: '9999px',
              border: '1.5px solid var(--color-card-border)',
              boxShadow: 'var(--shadow-cute)',
              maxWidth: '720px',
              margin: '0 auto'
            }}
          >
            {creatorProfile.stats.map((st, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}>
                <span style={{ fontSize: '1.1rem' }}>{st.emoji}</span>
                <strong style={{ color: 'var(--text-main)', fontWeight: '900' }}>{st.value}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{st.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
