import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BACKGROUND_SCENES = {
  hero: {
    id: 'hero',
    name: 'Himalayan Ridge',
    location: 'Spiti Valley, Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85',
    position: 'center 40%',
    overlay: 'linear-gradient(to bottom, rgba(16, 27, 45, 0.52) 0%, rgba(16, 27, 45, 0.72) 55%, rgba(16, 27, 45, 0.95) 100%)',
    accent: '#C66B4E',
  },
  explore: {
    id: 'explore',
    name: 'Azure Coastline',
    location: 'Palolem Beach, South Goa',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=85',
    position: 'center 45%',
    overlay: 'linear-gradient(to bottom, rgba(16, 27, 45, 0.62) 0%, rgba(16, 27, 45, 0.82) 55%, rgba(16, 27, 45, 0.96) 100%)',
    accent: '#E9A45B',
  },
  categories: {
    id: 'categories',
    name: 'Royal Heritage & Bastions',
    location: 'Amber Fort, Jaipur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2560&q=85',
    position: 'center 35%',
    overlay: 'linear-gradient(to bottom, rgba(16, 27, 45, 0.68) 0%, rgba(16, 27, 45, 0.85) 55%, rgba(16, 27, 45, 0.96) 100%)',
    accent: '#C66B4E',
  },
  group: {
    id: 'group',
    name: 'Shared Exploration',
    location: 'Western Ghats Ridge',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=2560&q=85',
    position: 'center 30%',
    overlay: 'linear-gradient(to bottom, rgba(16, 27, 45, 0.65) 0%, rgba(16, 27, 45, 0.82) 55%, rgba(16, 27, 45, 0.96) 100%)',
    accent: '#314C42',
  },
  schedule: {
    id: 'schedule',
    name: 'Scenic Travel Corridor',
    location: 'Old Silk Route & Leh-Manali Pass',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2560&q=85',
    position: 'center 42%',
    overlay: 'linear-gradient(to bottom, rgba(16, 27, 45, 0.68) 0%, rgba(16, 27, 45, 0.84) 55%, rgba(16, 27, 45, 0.96) 100%)',
    accent: '#E9A45B',
  },
  budget: {
    id: 'budget',
    name: 'Boutique Sanctuary',
    location: 'Taj Lake Palace, Udaipur',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2560&q=85',
    position: 'center 45%',
    overlay: 'linear-gradient(to bottom, rgba(16, 27, 45, 0.70) 0%, rgba(16, 27, 45, 0.86) 55%, rgba(16, 27, 45, 0.96) 100%)',
    accent: '#C66B4E',
  },
  alerts: {
    id: 'alerts',
    name: 'Atmospheric Elements',
    location: 'Monsoon Seas, Arabian Coast',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2560&q=85',
    position: 'center 38%',
    overlay: 'linear-gradient(to bottom, rgba(16, 27, 45, 0.72) 0%, rgba(16, 27, 45, 0.88) 55%, rgba(16, 27, 45, 0.97) 100%)',
    accent: '#E9A45B',
  },
  cta: {
    id: 'cta',
    name: 'Twilight Horizon',
    location: 'Sunset Bay, Indian Ocean',
    image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=2560&q=85',
    position: 'center 45%',
    overlay: 'linear-gradient(to bottom, rgba(16, 27, 45, 0.58) 0%, rgba(16, 27, 45, 0.78) 50%, rgba(16, 27, 45, 0.95) 100%)',
    accent: '#C66B4E',
  },
  profile: {
    id: 'profile',
    name: 'Traveler Sanctuary',
    location: 'Misty Pines, Coonoor',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=85',
    position: 'center 40%',
    overlay: 'linear-gradient(to bottom, rgba(16, 27, 45, 0.70) 0%, rgba(16, 27, 45, 0.86) 55%, rgba(16, 27, 45, 0.96) 100%)',
    accent: '#C66B4E',
  },
  login: {
    id: 'login',
    name: 'The Horizon Awaits',
    location: 'High Altitude Pass, Ladakh',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85',
    position: 'center 40%',
    overlay: 'linear-gradient(to bottom, rgba(16, 27, 45, 0.70) 0%, rgba(16, 27, 45, 0.88) 55%, rgba(16, 27, 45, 0.98) 100%)',
    accent: '#C66B4E',
  },
};

export default function BackgroundScene({ activeSceneId }) {
  const location = useLocation();
  const layersRef = useRef({});
  const activeSceneRef = useRef('hero');
  const [currentSceneState, setCurrentSceneState] = useState('hero');

  // Preload high-res photographic assets
  useEffect(() => {
    Object.values(BACKGROUND_SCENES).forEach((scene) => {
      const img = new Image();
      img.src = scene.image;
    });
  }, []);

  // GSAP Scene Crossfade Function
  const transitionTo = (nextSceneId) => {
    if (!BACKGROUND_SCENES[nextSceneId]) return;
    if (activeSceneRef.current === nextSceneId) return;

    const prevSceneId = activeSceneRef.current;
    activeSceneRef.current = nextSceneId;
    setCurrentSceneState(nextSceneId);

    const prevEl = layersRef.current[prevSceneId];
    const nextEl = layersRef.current[nextSceneId];
    if (!nextEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (prevEl) gsap.set(prevEl, { opacity: 0, zIndex: 1 });
      gsap.set(nextEl, { opacity: 1, zIndex: 2 });
      return;
    }

    // Bring incoming layer to front
    gsap.set(nextEl, { zIndex: 3 });
    if (prevEl) gsap.set(prevEl, { zIndex: 2 });

    // Smooth photographic crossfade
    if (prevEl) {
      gsap.to(prevEl, {
        opacity: 0,
        scale: 1.04,
        duration: 1.15,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(prevEl, { zIndex: 1 });
        },
      });
    }

    gsap.fromTo(
      nextEl,
      { opacity: prevEl ? 0.2 : 1, scale: 1.03 },
      {
        opacity: 1,
        scale: 1.0,
        duration: 1.15,
        ease: 'power2.inOut',
        overwrite: 'auto',
      }
    );
  };

  // Wire GSAP ScrollTrigger across all sections in the page & route transitions
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;

      // Subtle background parallax on scroll
      if (!prefersReducedMotion) {
        gsap.utils.toArray('.bg-scene-image').forEach((img) => {
          gsap.to(img, {
            yPercent: isMobile ? 3 : 6,
            ease: 'none',
            scrollTrigger: {
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.2,
            },
          });
        });
      }

      // Small delay to allow route DOM tree to paint before attaching triggers
      const timer = setTimeout(() => {
        const sceneElements = document.querySelectorAll('[data-scene]');

        if (sceneElements.length > 0) {
          sceneElements.forEach((el) => {
            const sceneId = el.getAttribute('data-scene');
            if (BACKGROUND_SCENES[sceneId]) {
              ScrollTrigger.create({
                trigger: el,
                start: 'top 55%',
                end: 'bottom 55%',
                onEnter: () => transitionTo(sceneId),
                onEnterBack: () => transitionTo(sceneId),
              });
            }
          });
        }

        // If route has a specific initial scene, transition to it
        const path = location.pathname.replace('/', '') || 'hero';
        let defaultScene = 'hero';
        if (path === 'explore') defaultScene = 'explore';
        else if (path === 'group') defaultScene = 'group';
        else if (path === 'schedule') defaultScene = 'schedule';
        else if (path === 'budget') defaultScene = 'budget';
        else if (path === 'alerts') defaultScene = 'alerts';
        else if (path === 'profile') defaultScene = 'profile';
        else if (path === 'login') defaultScene = 'login';

        if (activeSceneId && BACKGROUND_SCENES[activeSceneId]) {
          transitionTo(activeSceneId);
        } else if (sceneElements.length === 0 || path !== '') {
          transitionTo(defaultScene);
        }

        ScrollTrigger.refresh();
      }, 80);

      return () => clearTimeout(timer);
    });

    return () => ctx.revert();
  }, [location.pathname, activeSceneId]);

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Absolute Stacked Photographic Background Layers */}
      {Object.values(BACKGROUND_SCENES).map((scene) => {
        const isInitial = scene.id === activeSceneRef.current;
        return (
          <div
            key={scene.id}
            ref={(el) => (layersRef.current[scene.id] = el)}
            className="absolute inset-0 w-full h-full will-change-transform will-change-opacity overflow-hidden"
            style={{
              opacity: isInitial ? 1 : 0,
              zIndex: isInitial ? 2 : 1,
            }}
          >
            {/* Photographic Image Layer with parallax target */}
            <div
              className="bg-scene-image absolute inset-[-6%] w-[112%] h-[112%]"
              style={{
                backgroundImage: `url(${scene.image})`,
                backgroundSize: 'cover',
                backgroundPosition: scene.position,
                backgroundRepeat: 'no-repeat',
              }}
            />

            {/* Section-Specific Tactile Dark Scrim Overlay */}
            <div
              className="absolute inset-0 w-full h-full transition-opacity duration-1000"
              style={{ background: scene.overlay }}
            />
          </div>
        );
      })}

      {/* Luxury Vignette Around Viewport Edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 160px rgba(7, 12, 21, 0.85)',
        }}
      />

      {/* Floating Tactical Location Badge (Rootrang-inspired cinematic touch) */}
      <div className="hidden xl:flex fixed bottom-6 left-6 z-30 pointer-events-none items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-midnight-dark/80 backdrop-blur-md border border-sand/15 text-[10px] font-mono tracking-widest uppercase text-sand/80 shadow-luxury transition-all duration-700">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: BACKGROUND_SCENES[currentSceneState]?.accent || '#C66B4E',
          }}
        />
        <span>Location: {BACKGROUND_SCENES[currentSceneState]?.location || 'India'}</span>
      </div>
    </div>
  );
}
