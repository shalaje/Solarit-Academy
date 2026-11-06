import { useLanguage } from '../context/LanguageContext';
import TacticalCard from './TacticalCard';

export default function Leadership() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-brand-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-solar-motif opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-gray-300 border border-white/15 text-xs font-heading font-medium tracking-wider uppercase mb-4">
            <span>{t('badge.leadership')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-white">
            {t('leadership.title')}
          </h2>
        </div>

        {/* Content Block with Enhanced Prominence */}
        <div className="max-w-5xl mx-auto">
          <TacticalCard
            isDark={true}
            radarColor="bg-amber-400"
            coordinateTag="LEADERSHIP // HQ"
            className="w-full"
          >
            <div className="p-8 sm:p-10 md:p-14">
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
                
                {/* Portrait with Visual Importance */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 flex-shrink-0 rounded-2xl border border-white/20 overflow-hidden relative shadow-2xl group">
                  <div className="absolute inset-0 bg-brand-green/10 mix-blend-overlay z-10 pointer-events-none"></div>
                  <img 
                    src="/ceo%201.1.jpg" 
                    alt="Academy Executive Director" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop';
                    }}
                  />
                </div>
                
                {/* Quote and Leadership Details (Point 8: editorial styling) */}
                <div className="text-center lg:text-left flex-1 relative">
                  {/* Decorative oversized quotation mark */}
                  <span className="absolute -top-6 -left-3 sm:-left-6 text-7xl sm:text-8xl font-serif text-brand-green/15 select-none pointer-events-none leading-none z-0">
                    “
                  </span>
                  
                  {/* Powerful Quote with Increased Size and Readability */}
                  <blockquote className="relative z-10 text-xl sm:text-2xl md:text-2xl font-heading font-normal leading-relaxed text-gray-100 mb-8 italic">
                    {t('leadership.manager.quote')}
                  </blockquote>
                  
                  {/* Instructor Name & Clear Role */}
                  <div className="relative z-10 pt-4 border-t border-white/10">
                    <div className="text-xl sm:text-2xl font-heading font-bold uppercase tracking-tight text-white mb-1">
                      Rita Nitaj
                    </div>
                    <div className="text-brand-yellow font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold">
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
