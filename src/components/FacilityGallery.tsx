import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FacilityGallery() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  const galleryImages = [
    { 
      url: '/01.jpg', 
      alt: 'Training Classroom', 
      sq: 'Klasa e Trajnimit & Laboratori Teorik', 
      en: 'Training Classroom & Electrical Lab', 
      specSq: 'Laborator Didaktik • Skema & Teori', 
      specEn: 'Didactic Lab • Schematics & Theory',
      span: 'md:col-span-8 md:row-span-2 aspect-[16/9] md:aspect-auto' 
    },
    { 
      url: '/02.jpg', 
      alt: 'Solar Park Visit', 
      sq: 'Parku Diellor 2MW Llabjan, Pejë', 
      en: '2MW Utility-Scale Solar Park (Llabjan, Pejë)', 
      specSq: 'Park Funksional • 3,000+ Module PV', 
      specEn: 'Operational Park • 3,000+ PV Modules',
      span: 'md:col-span-4 md:row-span-1 aspect-[4/3] md:aspect-auto' 
    },
    { 
      url: '/03.jpg', 
      alt: 'Hands-on Equipment', 
      sq: 'Pajisjet & Veglat Profesionale', 
      en: 'Hands-on Installation Tools', 
      specSq: 'Vegla Montimi • Inverterë DC/AC', 
      specEn: 'Mounting Tools • DC/AC Inverters',
      span: 'md:col-span-4 md:row-span-1 aspect-[4/3] md:aspect-auto' 
    },
    { 
      url: '/586104350_122199067754355704_647952871261180247_n.jpg', 
      alt: 'Safety Training', 
      sq: 'Trajnimi i Sigurisë & HSE në Lartësi', 
      en: 'Safety Protocols & HSE at Height', 
      specSq: 'Standarde Ndërkombëtare • HSE në Lartësi', 
      specEn: 'International Standards • HSE at Height',
      span: 'md:col-span-4 md:row-span-1 aspect-[4/3]' 
    },
    { 
      url: '/640933758_122212965542355704_6725679518158766618_n.jpg', 
      alt: 'Practical Application', 
      sq: 'Aplikimi Praktik në Impiant', 
      en: 'Field Commissioning & Grid Intertie', 
      specSq: 'Testime Elektrike • Lidhja në Rrjet', 
      specEn: 'Electrical Testing • Utility Grid Intertie',
      span: 'md:col-span-8 md:row-span-1 aspect-[16/9] md:aspect-[2/1]' 
    },
  ];

  // Handle escape key for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      }
      if (e.key === 'ArrowLeft' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
      }
    };
    if (lightboxIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryImages.length]);

  return (
    <section id="facility" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 text-xs font-semibold tracking-wider uppercase mb-4">
            {t('badge.campus')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-navy tracking-tight mb-4">
            {t('facility.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {t('facility.subtitle')}
          </p>
        </div>

        {/* Asymmetric Gallery Grid with Consistent Spacing and Radius */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-3 gap-4 sm:gap-5 md:h-[760px]">
          {galleryImages.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setLightboxIndex(idx)}
              className={`${img.span} relative rounded-2xl overflow-hidden group cursor-pointer border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              {/* Overlay with subtle view indicator & technical spec (Point 6) */}
              <div className="absolute inset-0 bg-brand-navy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <h3 className="text-white text-lg sm:text-xl font-heading font-bold translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  {currentLanguage === 'sq' ? img.sq : img.en}
                </h3>
                <span className="inline-block mt-2 px-2.5 py-1 rounded bg-black/60 border border-white/15 text-[10px] font-mono tracking-wider text-brand-yellow uppercase">
                  {currentLanguage === 'sq' ? img.specSq : img.specEn}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-300 mt-2">
                  {currentLanguage === 'sq' ? 'Kliko për inspektim të plotë' : 'Click to inspect full resolution'}
                </span>
              </div>
              
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-12 right-0 sm:right-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer"
              aria-label="Close image lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2.5 transition-colors cursor-pointer z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}
              className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2.5 transition-colors cursor-pointer z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image display */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/15 max-h-[75vh] w-auto">
              <img
                src={galleryImages[lightboxIndex].url}
                alt={galleryImages[lightboxIndex].alt}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Image Caption with Technical Scale Details */}
            <div className="mt-4 text-center">
              <p className="text-white font-heading font-bold text-lg">
                {currentLanguage === 'sq' ? galleryImages[lightboxIndex].sq : galleryImages[lightboxIndex].en}
              </p>
              <p className="text-xs text-brand-yellow font-mono mt-1 uppercase tracking-wider">
                {currentLanguage === 'sq' ? galleryImages[lightboxIndex].specSq : galleryImages[lightboxIndex].specEn}
              </p>
              <p className="text-xs text-gray-400 font-mono mt-1">
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
