import { BookOpenCheck, Award, MapPin, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhySolarit() {
  const { t } = useLanguage();

  const reasons = [
    {
      id: 'dual',
      icon: <BookOpenCheck className="w-5 h-5 text-brand-green" />,
      titleKey: 'why.dual.title',
      descKey: 'why.dual.desc',
    },
    {
      id: 'cert',
      icon: <Award className="w-5 h-5 text-brand-green" />,
      titleKey: 'why.cert.title',
      descKey: 'why.cert.desc',
    },
    {
      id: 'park',
      icon: <MapPin className="w-5 h-5 text-brand-green" />,
      titleKey: 'why.park.title',
      descKey: 'why.park.desc',
    },
    {
      id: 'eling',
      icon: <ShieldCheck className="w-5 h-5 text-brand-green" />,
      titleKey: 'why.eling.title',
      descKey: 'why.eling.desc',
    }
  ];

  return (
    <section id="why-solarit" className="py-20 lg:py-28 relative bg-[#F7F8FA] border-y border-neutral-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-widest uppercase mb-4">
            {t('badge.advantage')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-navy tracking-tight">
            {t('why.title')}
          </h2>
        </div>

        {/* Numbered Benefits List with Generous Spacing and Huge Numbers */}
        <div className="divide-y divide-brand-navy/10 border-y border-brand-navy/10">
          {reasons.map((reason, index) => (
            <div 
              key={reason.id} 
              className="group flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-10 md:py-12 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl transition-all duration-300 hover:bg-white/90 hover:shadow-sm"
            >
              {/* Huge Number */}
              <div className="text-6xl sm:text-7xl md:text-8xl font-heading font-extrabold text-gray-200 group-hover:text-brand-green/80 group-hover:scale-105 transition-all duration-300 select-none shrink-0 w-24 sm:w-28 leading-none">
                0{index + 1}
              </div>

              {/* Title & Short Description */}
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-1 rounded-md bg-brand-green/10 text-brand-green">
                    {reason.icon}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-brand-navy group-hover:text-brand-navy transition-colors">
                    {t(reason.titleKey)}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                  {t(reason.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
