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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 text-xs font-semibold tracking-wider uppercase mb-4">
            {t('badge.advantage')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-navy tracking-tight">
            {t('why.title')}
          </h2>
        </div>

        {/* 2 x 2 grid of four equal cards, numbers in full colour */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {reasons.map((reason, index) => (
            <div 
              key={reason.id} 
              className="group bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/90 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all duration-300 flex flex-col justify-between h-full border-t-2 border-t-transparent hover:border-t-brand-green"
            >
              <div>
                {/* Top Row with full-colour number and icon */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
                  <div className="text-4xl sm:text-5xl font-mono tabular-nums font-extrabold text-brand-green tracking-tight select-none leading-none">
                    0{index + 1}
                  </div>
                  <div className="p-2.5 rounded-xl bg-brand-green/10 text-brand-green">
                    {reason.icon}
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-navy mb-3 leading-snug">
                  {t(reason.titleKey)}
                </h3>

                {/* Card Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
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
