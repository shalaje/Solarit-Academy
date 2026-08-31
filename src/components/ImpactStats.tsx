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
        <div className="bg-gradient-to-r from-brand-green to-[#5a8a30] rounded-3xl py-12 text-white shadow-xl shadow-brand-green/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20 text-center">
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
