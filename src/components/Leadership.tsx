import { useLanguage } from '../context/LanguageContext';
import TacticalCard from './TacticalCard';

export default function Leadership() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-solar-motif opacity-[0.03] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-green/15 text-emerald-400 border border-brand-green/30 text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-sm shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
            <span>{t('badge.leadership')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            {t('leadership.title')}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <TacticalCard
            isDark={true}
            radarColor="bg-amber-400"
            coordinateTag="LEADERSHIP // HQ"
            className="w-full"
          >
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 rounded-2xl border border-white/20 overflow-hidden relative shadow-2xl">
                  <div className="absolute inset-0 bg-brand-green/10 mix-blend-overlay z-10"></div>
                  <img 
                    src="/ceo%201.1.jpg" 
                    alt="Academy Manager" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop';
                    }}
                  />
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <div className="text-[9px] font-mono font-bold tracking-[0.3em] uppercase text-brand-yellow mb-3">
                    STATEMENT // 2026 MANDATE
                  </div>
                  <blockquote className="text-lg md:text-xl font-heading font-medium leading-relaxed text-gray-200 mb-6 italic">
                    {t('leadership.manager.quote')}
                  </blockquote>
                  <div>
                    <div className="text-sm md:text-base font-bold uppercase tracking-tight leading-snug text-white mb-1">
                      Rita Nitaj
                    </div>
                    <div className="text-brand-yellow font-mono text-xs uppercase tracking-wider">
                      {t('leadership.manager.role')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TacticalCard>
        </div>
      </div>
    </section>
  );
}
