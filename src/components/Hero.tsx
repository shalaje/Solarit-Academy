import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section 
      id="home" 
      className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-32 overflow-hidden"
    >
      {/* Background Image with Rich Contrast Overlay */}
      <div className="absolute inset-0 z-0 bg-brand-navy">
        <div className="absolute inset-0 bg-solar-motif opacity-[0.06] z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/60 z-10"></div>
        <img
          src="/solar-park.jpg"
          alt="Trainees at solar park"
          className="w-full h-full object-cover object-right opacity-45 mix-blend-luminosity"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop';
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-4xl transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-3">
          {/* H1 Headline with Dominant Presence */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.25rem] xl:text-[5.75rem] font-heading font-extrabold text-white leading-[1.05] tracking-tight mb-5 sm:mb-7 drop-shadow-sm">
            {t('hero.title')}
          </h1>
          
          {/* Supporting Paragraph with Enhanced Readability & Contrast */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200/95 font-normal mb-8 sm:mb-10 max-w-2xl leading-relaxed drop-shadow-sm">
            {t('hero.subtitle')}
          </p>
          
          {/* Action CTAs with Distinct Primary / Secondary Hierarchy */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center font-heading font-bold tracking-wide rounded-full px-7 sm:px-8 py-3.5 text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-xl shadow-brand-green/30 hover:shadow-2xl hover:shadow-brand-green/40 gap-2.5"
            >
              <span>{t('hero.apply')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center justify-center font-heading font-semibold tracking-wide rounded-full px-6 sm:px-7 py-3.5 text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-white/5 hover:bg-white/10 text-white/95 hover:text-white border border-white/30 hover:border-white/60 backdrop-blur-sm gap-2"
            >
              <span>{t('hero.programs')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
