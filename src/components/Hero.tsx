import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-navy/70 z-10 mix-blend-multiply"></div>
        <img
          src="/images/solar-park-training.jpg"
          alt="Trainees at solar park"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            // Fallback for placeholder
            e.currentTarget.src = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop';
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
            <span className="text-brand-yellow text-sm font-semibold tracking-wide uppercase">ELING Grup</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
            {t('hero.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex justify-center items-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white px-8 py-4 rounded-lg font-heading font-semibold text-lg transition-colors shadow-lg shadow-brand-green/20"
            >
              {t('hero.apply')}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#programs"
              className="inline-flex justify-center items-center gap-2 bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-heading font-semibold text-lg transition-colors backdrop-blur-sm"
            >
              {t('hero.programs')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
