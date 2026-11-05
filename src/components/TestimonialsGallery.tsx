import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Film,
  Camera
} from 'lucide-react';

export interface AlbumPhoto {
  id: string;
  url: string;
  titleSq?: string;
  titleEn?: string;
  locationSq?: string;
  locationEn?: string;
}

export default function TestimonialsGallery() {
  const { t } = useLanguage();
  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  const [viewMode, setViewMode] = useState<'reel' | 'grid'>('reel');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleGridCount, setVisibleGridCount] = useState(24);

  // Clean photo album of 21 actual training pictures, prioritizing women participants first
  const photos: AlbumPhoto[] = [
    {
      id: 'sol-01',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.28_PM_b016910b.jpeg',
      titleSq: 'Instruktori demonstron aplikacionin e monitorimit për inxhinieret e reja',
      titleEn: 'Instructor demonstrating real-time PV monitoring app to trainees',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-02',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.26_PM_b52e715d.jpeg',
      titleSq: 'Pjesëmarrëset e akademisë gjatë instruksioneve teknike në terren',
      titleEn: 'Female academy participants during technical field briefing',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-03',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.16_PM_9eabe683.jpeg',
      titleSq: 'Inxhiniere në trajnim praktik me pajisje mbrojtëse',
      titleEn: 'Trainee engineer in full PPE safety equipment on site',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-04',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.17_PM_06313a49.jpeg',
      titleSq: 'Vëmendje e plotë gjatë shpjegimit të lidhjeve elektrike',
      titleEn: 'Attentive focus during electrical connection lecture',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-05',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.20_PM_b7673cce.jpeg',
      titleSq: 'Pjesëmarrëse e përkushtuar në Solarit Academy',
      titleEn: 'Dedicated participant at Solarit Academy',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-06',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.32_PM_5436ba23.jpeg',
      titleSq: 'Analiza e këndeve dhe instalimit pranë moduleve fotovoltaike',
      titleEn: 'PV module tilt angle analysis and structure inspection',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-07',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.38_PM_dc1f0359.jpeg',
      titleSq: 'Grupi i suksesshëm me certifikatat e vijueshmërisë',
      titleEn: 'Graduating cohort proudly holding certificates of attendance',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-08',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.25_PM_b48d3990.jpeg',
      titleSq: 'Vëzhgimi i operimit të inverterëve në terren',
      titleEn: 'Observing inverter operation and cabling on site',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-09',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.23_PM_5f890b38.jpeg',
      titleSq: 'Sesion teknik mbi stacionin e inverterëve qendrorë',
      titleEn: 'Technical session at the centralized inverter station',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-10',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.42_PM_5be1884f.jpeg',
      titleSq: 'Protokollet e sigurisë dhe menaxhimi i tensionit të lartë',
      titleEn: 'Safety protocols and high voltage management',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-11',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.31_PM_e08d37c1.jpeg',
      titleSq: 'Ecje orientuese drejt fushës diellore fotovoltaike',
      titleEn: 'Orientation walk toward the operational PV array field',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-12',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.47.42_PM_35ebce02.jpeg',
      titleSq: 'Diskutim praktik mbi shtrirjen e kabllove dhe lidhjet DC',
      titleEn: 'Practical discussion on DC cabling and string layouts',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-13',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.47.46_PM_6aeaa91d.jpeg',
      titleSq: 'Foto e përbashkët e grupit para qendrës trajnuese',
      titleEn: 'Group photo of participants outside training center',
      locationSq: 'Qendra Trajnuese Solarit',
      locationEn: 'Solarit Training Center',
    },
    {
      id: 'sol-14',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.47.43_PM_7b8381f4.jpeg',
      titleSq: 'Shpjegimi i strukturave mbajtëse dhe rezistencës mekanike',
      titleEn: 'Explaining ground-mount structures and mechanical resistance',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-15',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.24_PM_e1c9df63.jpeg',
      titleSq: 'Inspektimi i kutive bashkuese dhe pajisjeve BOS',
      titleEn: 'Inspection of combiner boxes and balance of plant (BOS)',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-16',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.26_PM_864f90fd.jpeg',
      titleSq: 'Demonstrim pranë nënstacionit të transformatorit',
      titleEn: 'Demonstration outside the step-up transformer substation',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-17',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.35_PM_751d8b93.jpeg',
      titleSq: 'Rishikimi i tokëzimit dhe lidhjeve me tokën të strukturës',
      titleEn: 'Reviewing system grounding and structure earthing',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-18',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.52.29_PM_44208b6d.jpeg',
      titleSq: 'Pamje panoramike e parkut solar nën vargmalet e Pejës',
      titleEn: 'Panoramic view of the solar park under Peja mountains',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-19',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.28_PM_e420188d.jpeg',
      titleSq: 'Pamje nga ajri: Grupi trajnues në parkun solar 2MW',
      titleEn: 'Aerial drone view: Cohort at the 2MW utility-scale solar park',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    },
    {
      id: 'sol-20',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.47.45_PM_2541b744.jpeg',
      titleSq: 'Laboratori elektrik: transformatorët dhe pajisjet e fuqisë',
      titleEn: 'Electrical lab: power transformers and medium-voltage gear',
      locationSq: 'Hapësira Laboratorike',
      locationEn: 'Laboratory Space',
    },
    {
      id: 'sol-21',
      url: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.34_PM_0365b688.jpeg',
      titleSq: 'Pajisjet e certifikuara të sigurisë SOLARIT ACADEMY',
      titleEn: 'SOLARIT ACADEMY certified safety gear and apparel',
      locationSq: 'Parku Solar, Pejë',
      locationEn: 'Solar Park, Pejë',
    }
  ];

  // Divide into two rows for the continuous smooth marquee
  const rowOne = useMemo(() => photos.filter((_, idx) => idx % 2 === 0), [photos]);
  const rowTwo = useMemo(() => photos.filter((_, idx) => idx % 2 !== 0), [photos]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
      }
      if (e.key === 'ArrowLeft' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
      }
    };
    if (lightboxIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  const activePhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#0D111D] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-solar-motif opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-green/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/15 text-brand-green border border-brand-green/30 text-xs font-heading font-medium mb-4 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-brand-yellow" />
            <span>{currentLanguage === 'sq' ? 'Gjeneratat e kaluara | Galeri' : 'Past cohorts | Gallery'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            {currentLanguage === 'sq' 
              ? 'Grupet dhe përvoja praktike në terren' 
              : 'Previous cohorts & practical field experience'}
          </h2>
          
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {currentLanguage === 'sq'
              ? 'Momente nga trajnimet e mëparshme, duke përfshirë ligjëratat, praktikën në parkun solar dhe certifikimin e pjesëmarrësve.'
              : 'Moments from previous trainings, including lectures, practice at the solar park, and participant certification.'}
          </p>
        </div>

        {/* View Mode Switcher Toolbar */}
        <div className="flex items-center justify-end mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl">
            <button
              onClick={() => setViewMode('reel')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-heading font-medium transition-all cursor-pointer ${
                viewMode === 'reel' ? 'bg-brand-green text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'sq' ? 'Lëvizje e butë' : 'Smooth reel'}</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-heading font-medium transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-brand-green text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'sq' ? 'Mozaik' : 'Grid'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* VIEW 1: Dual-Row Continuous Smooth Auto-Scrolling Reel (GPU accelerated) */}
      {viewMode === 'reel' ? (
        <div className="space-y-4 overflow-hidden py-2 select-none">
          
          {/* Row 1 (moving left) */}
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-4 animate-marquee-left hover:[animation-play-state:paused] cursor-pointer">
              {[...rowOne, ...rowOne].map((photo, index) => {
                const originalIndex = photos.findIndex(p => p.id === photo.id);
                return (
                  <div
                    key={`r1-${photo.id}-${index}`}
                    onClick={() => setLightboxIndex(originalIndex !== -1 ? originalIndex : 0)}
                    className="relative w-72 sm:w-80 md:w-96 h-48 sm:h-56 md:h-64 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg group/card transition-all duration-300 hover:scale-[1.02] hover:border-brand-green/60 bg-[#161D2E]"
                  >
                    <img
                      src={photo.url}
                      alt="Solarit Academy"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop';
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
            <div className="flex gap-4 animate-marquee-right hover:[animation-play-state:paused] cursor-pointer">
              {[...rowTwo, ...rowTwo].map((photo, index) => {
                const originalIndex = photos.findIndex(p => p.id === photo.id);
                return (
                  <div
                    key={`r2-${photo.id}-${index}`}
                    onClick={() => setLightboxIndex(originalIndex !== -1 ? originalIndex : 0)}
                    className="relative w-72 sm:w-80 md:w-96 h-48 sm:h-56 md:h-64 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg group/card transition-all duration-300 hover:scale-[1.02] hover:border-brand-green/60 bg-[#161D2E]"
                  >
                    <img
                      src={photo.url}
                      alt="Solarit Academy"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop';
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
      ) : (
        /* VIEW 2: Full Responsive Clean Grid */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {photos.slice(0, visibleGridCount).map((photo, idx) => (
              <div
                key={`grid-${photo.id}`}
                onClick={() => setLightboxIndex(idx)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-brand-green/60 bg-[#161D2E]"
              >
                <img
                  src={photo.url}
                  alt="Solarit Academy"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-start justify-end p-3">
                  <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button for Grid */}
          {visibleGridCount < photos.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleGridCount(prev => prev + 12)}
                className="inline-flex items-center justify-center font-heading font-medium tracking-wide rounded-full px-7 py-3 text-xs sm:text-sm transition-all duration-200 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-brand-green/50 cursor-pointer shadow-lg"
              >
                {currentLanguage === 'sq' 
                  ? `Shiko më shumë foto (${photos.length - visibleGridCount} të mbetura)` 
                  : `Show more photos (${photos.length - visibleGridCount} remaining)`}
              </button>
            </div>
          )}
        </div>
      )}

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
                {lightboxIndex + 1} / {photos.length}
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[480px]">
              <img
                src={activePhoto.url}
                alt="Solarit Academy"
                className="max-h-[78vh] w-auto max-w-full object-contain mx-auto"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop';
                }}
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={() => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => setLightboxIndex((lightboxIndex + 1) % photos.length)}
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
