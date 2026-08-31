import { BookOpenCheck, Award, MapPin, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhySolarit() {
  const { t } = useLanguage();

  const reasons = [
    {
      id: 'dual',
      icon: <BookOpenCheck className="w-6 h-6 text-brand-green" />,
      titleKey: 'why.dual.title',
      descKey: 'why.dual.desc',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'cert',
      icon: <Award className="w-6 h-6 text-brand-green" />,
      titleKey: 'why.cert.title',
      descKey: 'why.cert.desc',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'park',
      icon: <MapPin className="w-6 h-6 text-brand-green" />,
      titleKey: 'why.park.title',
      descKey: 'why.park.desc',
      image: 'https://images.unsplash.com/photo-1509391366360-1f9509e1394e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'eling',
      icon: <ShieldCheck className="w-6 h-6 text-brand-green" />,
      titleKey: 'why.eling.title',
      descKey: 'why.eling.desc',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'
    }
  ];

  return (
    <section id="why-solarit" className="py-20 relative bg-[#F7F8FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        {/* Common Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-widest uppercase mb-4">
            {t('badge.advantage')}
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-navy">
            {t('why.title')}
          </h2>
        </div>

        {/* NUMBERED LIST */}
        <div className="flex flex-col">
          <div className="border-t-2 border-brand-navy/10"></div>
          {reasons.map((reason, index) => (
            <div key={reason.id} className="group flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-b-2 border-brand-navy/10 transition-colors hover:border-brand-green">
              <div className="text-5xl md:text-6xl font-heading font-bold text-gray-200 group-hover:text-brand-green transition-colors">
                0{index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-heading font-bold text-brand-navy mb-4 group-hover:text-brand-green transition-colors">
                  {t(reason.titleKey)}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
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
