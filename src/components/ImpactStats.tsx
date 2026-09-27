import { useLanguage } from '../context/LanguageContext';
import TacticalCard from './TacticalCard';

export default function ImpactStats() {
  const { t } = useLanguage();

  const stats = [
    { number: '300+', labelKey: 'impact.trained', code: 'KPI.01' },
    { number: '100', labelKey: 'impact.capacity', code: 'KPI.02' },
    { number: '5', labelKey: 'impact.instructors', code: 'KPI.03' },
    { number: '60%', labelKey: 'impact.women', code: 'KPI.04' }
  ];

  return (
    <section className="py-12 -mt-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TacticalCard
          isDark={true}
          radarColor="bg-brand-green"
          coordinateTag="TELEMETRY // NATIONAL DATA"
        >
          <div className="bg-gradient-to-br from-brand-green/90 via-slate-900 to-[#111625] rounded-2xl py-12 px-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-solar-motif opacity-10 pointer-events-none"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center relative z-10">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center px-4">
                  <span className="text-[9px] font-mono font-bold tracking-[0.3em] uppercase text-brand-yellow/80 mb-1">
                    {stat.code}
                  </span>
                  <div className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-2 font-mono">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm font-mono font-medium opacity-90 uppercase tracking-wider text-gray-300">
                    {t(stat.labelKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TacticalCard>
      </div>
    </section>
  );
}
