import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-brand-navy">
        <div className="absolute inset-0 bg-solar-motif opacity-[0.06] z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent z-10 mix-blend-multiply"></div>
        <img
          src="/solar-park.jpg"
          alt="Trainees at solar park"
          className="w-full h-full object-cover object-right opacity-60 mix-blend-luminosity"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop';
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-heading font-bold text-white leading-[1.05] tracking-tight mb-8">
            {t('hero.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center font-bold tracking-wide rounded-full px-6 py-2.5 text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-lg shadow-brand-green/20 gap-2"
            >
              {t('hero.apply')}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center justify-center font-bold tracking-wide rounded-full px-6 py-2.5 text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-transparent border border-white/60 hover:border-white hover:bg-white/10 text-white backdrop-blur-sm gap-2"
            >
              {t('hero.programs')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
