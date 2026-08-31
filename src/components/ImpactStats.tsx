import { useLanguage } from '../context/LanguageContext';

export default function ImpactStats() {
  const { t } = useLanguage();

  const stats = [
    { number: '300+', labelKey: 'impact.trained' },
    { number: '100', labelKey: 'impact.capacity' },
    { number: '5', labelKey: 'impact.instructors' },
    { number: '60%', labelKey: 'impact.women' }
  ];

  return (
    <section className="py-12 -mt-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-green to-slate-900 rounded-3xl py-12 text-white shadow-xl shadow-brand-green/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-solar-motif opacity-10 pointer-events-none"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20 text-center relative z-10">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center px-4">
                <div className="text-4xl md:text-5xl font-heading font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base font-medium opacity-90 uppercase tracking-wide">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
