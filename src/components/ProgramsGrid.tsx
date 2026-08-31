import { Sun, Battery, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProgramsGrid() {
  const { t } = useLanguage();

  const programs = [
    {
      id: 'solar',
      icon: <Sun className="w-8 h-8 text-white" />,
      titleKey: 'prog.solar.title',
      descKey: 'prog.solar.desc',
      durationKey: 'prog.solar.duration',
      bgClass: 'bg-brand-green'
    },
    {
      id: 'battery',
      icon: <Battery className="w-8 h-8 text-white" />,
      titleKey: 'prog.battery.title',
      descKey: 'prog.battery.desc',
      durationKey: 'prog.battery.duration',
      bgClass: 'bg-brand-navy'
    },
    {
      id: 'efficiency',
      icon: <Building2 className="w-8 h-8 text-brand-navy" />,
      titleKey: 'prog.efficiency.title',
      descKey: 'prog.efficiency.desc',
      durationKey: 'prog.efficiency.duration',
      bgClass: 'bg-brand-yellow'
    }
  ];

  return (
    <section id="programs" className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-widest uppercase mb-4">
            {t('badge.curriculum')}
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-4">
            {t('programs.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('programs.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Featured Program */}
          <div className="lg:w-7/12">
            <div className="group rounded-3xl border border-gray-100 bg-white p-10 md:p-12 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden">
              {/* Optional motif background for featured card */}
              <div className="absolute inset-0 bg-solar-motif text-brand-green opacity-5 pointer-events-none"></div>
              
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-md relative z-10 ${programs[0].bgClass} transform group-hover:scale-105 transition-transform`}>
                {programs[0].icon}
              </div>
              
              <h3 className="text-3xl font-heading font-bold text-brand-navy mb-4 relative z-10">
                {t(programs[0].titleKey)}
              </h3>
              
              <p className="text-gray-600 text-lg mb-8 flex-grow relative z-10 leading-relaxed">
                {t(programs[0].descKey)}
              </p>
              
              <div className="pt-8 border-t border-gray-100 mt-auto relative z-10">
                <span className="inline-flex items-center text-sm font-semibold text-brand-green bg-brand-green/10 px-4 py-2 rounded-md">
                  {t(programs[0].durationKey)}
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Programs */}
          <div className="lg:w-5/12 flex flex-col gap-8">
            {programs.slice(1).map((prog) => (
              <div 
                key={prog.id}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-6 h-full"
              >
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center shadow-md ${prog.bgClass} transform group-hover:scale-105 transition-transform`}>
                  {prog.icon}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-heading font-bold text-brand-navy mb-2">
                    {t(prog.titleKey)}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {t(prog.descKey)}
                  </p>
                  
                  <span className="inline-flex items-center text-xs font-semibold text-brand-green bg-brand-green/10 px-2 py-1 rounded-md">
                    {t(prog.durationKey)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
