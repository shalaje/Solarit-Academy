import { useState, useEffect, useMemo, TouchEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera
} from 'lucide-react';

export interface AlbumPhoto {
  id: string;
  url: string;
  fullUrl?: string;
  titleSq?: string;
  titleEn?: string;
  locationSq?: string;
  locationEn?: string;
}

export default function TestimonialsGallery() {
  const { t } = useLanguage();
  const { customPhotos } = useSiteData();
  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Clean photo album of 21 actual training pictures, prioritizing women participants first
  const photos: AlbumPhoto[] = [
    {
      id: 'sol-01',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.52.28_PM_b016910b.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.28_PM_b016910b.jpeg',
    },
    {
      id: 'sol-02',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.52.26_PM_b52e715d.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.26_PM_b52e715d.jpeg',
    },
    {
      id: 'sol-03',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.52.16_PM_9eabe683.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.16_PM_9eabe683.jpeg',
    },
    {
      id: 'sol-04',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.52.17_PM_06313a49.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.17_PM_06313a49.jpeg',
    },
    {
      id: 'sol-05',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.52.20_PM_b7673cce.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.20_PM_b7673cce.jpeg',
    },
    {
      id: 'sol-06',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.51.32_PM_5436ba23.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.32_PM_5436ba23.jpeg',
    },
    {
      id: 'sol-07',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.51.38_PM_dc1f0359.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.38_PM_dc1f0359.jpeg',
    },
    {
      id: 'sol-08',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.52.25_PM_b48d3990.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.25_PM_b48d3990.jpeg',
    },
    {
      id: 'sol-09',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.52.23_PM_5f890b38.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.23_PM_5f890b38.jpeg',
    },
    {
      id: 'sol-10',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.51.42_PM_5be1884f.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.42_PM_5be1884f.jpeg',
    },
    {
      id: 'sol-11',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.51.31_PM_e08d37c1.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.31_PM_e08d37c1.jpeg',
    },
    {
      id: 'sol-12',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.47.42_PM_35ebce02.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.47.42_PM_35ebce02.jpeg',
    },
    {
      id: 'sol-13',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.47.46_PM_6aeaa91d.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.47.46_PM_6aeaa91d.jpeg',
    },
    {
      id: 'sol-14',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.47.43_PM_7b8381f4.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.47.43_PM_7b8381f4.jpeg',
    },
    {
      id: 'sol-15',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.51.24_PM_e1c9df63.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.24_PM_e1c9df63.jpeg',
    },
    {
      id: 'sol-16',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.51.26_PM_864f90fd.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.26_PM_864f90fd.jpeg',
    },
    {
      id: 'sol-17',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.51.35_PM_751d8b93.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.35_PM_751d8b93.jpeg',
    },
    {
      id: 'sol-18',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.52.29_PM_44208b6d.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.29_PM_44208b6d.jpeg',
    },
    {
      id: 'sol-19',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.51.28_PM_e420188d.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.28_PM_e420188d.jpeg',
    },
    {
      id: 'sol-20',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.47.45_PM_2541b744.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.47.45_PM_2541b744.jpeg',
    },
    {
      id: 'sol-21',
      url: '/assets/aistudio/optimized/WhatsApp_Image_2026-11-05_at_3.51.34_PM_0365b688.jpeg',
      fullUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.34_PM_0365b688.jpeg',
    }
  ];

  // Combine custom dynamic photos from Firebase with baseline album
  const allPhotos: AlbumPhoto[] = useMemo(() => {
    const formattedCustom: AlbumPhoto[] = customPhotos.map((cp) => ({
      id: cp.id,
      url: cp.url,
      fullUrl: cp.url,
      titleSq: cp.titleSq,
      titleEn: cp.titleEn
    }));
    return [...formattedCustom, ...photos];
  }, [customPhotos]);

  // Divide into two rows for the continuous smooth marquee
  const rowOne = useMemo(() => allPhotos.filter((_, idx) => idx % 2 === 0), [allPhotos]);
  const rowTwo = useMemo(() => allPhotos.filter((_, idx) => idx % 2 !== 0), [allPhotos]);

  // Touch swipe support for mobile lightbox (Point 7)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null || lightboxIndex === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      // Swiped left -> next photo
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allPhotos.length : null));
    } else if (diff < -45) {
      // Swiped right -> previous photo
      setLightboxIndex((prev) => (prev !== null ? (prev - 1 + allPhotos.length) % allPhotos.length : null));
    }
    setTouchStartX(null);
  };

  const activePhoto = lightboxIndex !== null ? allPhotos[lightboxIndex] : null;

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#0D111D] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-solar-motif opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-green/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-gray-300 border border-white/15 text-xs font-heading font-medium mb-4">
            <Camera className="w-3.5 h-3.5 text-gray-400" />
            <span>{currentLanguage === 'sq' ? 'Gjeneratat e kaluara | Galeri' : 'Past cohorts | Gallery'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            {currentLanguage === 'sq' 
              ? 'Grupet dhe përvoja praktike në terren' 
              : 'Previous cohorts & practical field experience'}
          </h2>
          
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
            {currentLanguage === 'sq'
              ? 'Momente nga trajnimet e mëparshme, duke përfshirë ligjëratat, praktikën në parkun solar dhe certifikimin e pjesëmarrësve.'
              : 'Moments from previous trainings, including lectures, practice at the solar park, and participant certification.'}
          </p>
        </div>
      </div>

      {/* Dual-Row Continuous Smooth Auto-Scrolling Reel (GPU accelerated) */}
      <div className="space-y-3 sm:space-y-4 overflow-hidden py-2 select-none">
        
        {/* Row 1 (moving left) */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-3 sm:gap-4 animate-marquee-left hover:[animation-play-state:paused] cursor-pointer">
            {[...rowOne, ...rowOne].map((photo, index) => {
              const originalIndex = allPhotos.findIndex(p => p.id === photo.id);
              return (
                <div
                  key={`r1-${photo.id}-${index}`}
                  onClick={() => setLightboxIndex(originalIndex !== -1 ? originalIndex : 0)}
                  className="relative w-60 sm:w-80 md:w-96 h-40 sm:h-52 md:h-60 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg group/card transition-all duration-300 hover:scale-[1.02] hover:border-brand-green/60 bg-[#161D2E]"
                >
                  <img
                    src={photo.url}
                    alt="Solarit Academy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105 pointer-events-none select-none"
                    onError={(e) => {
                      e.currentTarget.src = photo.fullUrl || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  
                  {/* Clean Hover Enlarge Button */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 (moving right) */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-3 sm:gap-4 animate-marquee-right hover:[animation-play-state:paused] cursor-pointer">
            {[...rowTwo, ...rowTwo].map((photo, index) => {
              const originalIndex = allPhotos.findIndex(p => p.id === photo.id);
              return (
                <div
                  key={`r2-${photo.id}-${index}`}
                  onClick={() => setLightboxIndex(originalIndex !== -1 ? originalIndex : 0)}
                  className="relative w-60 sm:w-80 md:w-96 h-40 sm:h-52 md:h-60 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg group/card transition-all duration-300 hover:scale-[1.02] hover:border-brand-green/60 bg-[#161D2E]"
                >
                  <img
                    src={photo.url}
                    alt="Solarit Academy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105 pointer-events-none select-none"
                    onError={(e) => {
                      e.currentTarget.src = photo.fullUrl || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  
                  {/* Clean Hover Enlarge Button */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activePhoto && lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] bg-[#111625] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#0C101A]">
              <div className="text-xs sm:text-sm text-gray-400 font-mono">
                {lightboxIndex + 1} / {allPhotos.length}
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image (with mobile touch swipe support) */}
            <div 
              className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[480px] touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={activePhoto.fullUrl || activePhoto.url}
                alt="Solarit Academy"
                decoding="async"
                className="max-h-[78vh] w-auto max-w-full object-contain mx-auto select-none pointer-events-none"
                onError={(e) => {
                  e.currentTarget.src = activePhoto.url;
                }}
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={() => setLightboxIndex((lightboxIndex - 1 + allPhotos.length) % allPhotos.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => setLightboxIndex((lightboxIndex + 1) % allPhotos.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
