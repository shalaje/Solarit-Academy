import { BookOpenCheck, Award, MapPin, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhySolarit() {
  const { t } = useLanguage();

  const reasons = [
    {
      id: 'dual',
      icon: <BookOpenCheck className="w-6 h-6 text-brand-green" />,
      titleKey: 'why.dual.title',
      descKey: 'why.dual.desc'
    },
    {
      id: 'cert',
      icon: <Award className="w-6 h-6 text-brand-green" />,
      titleKey: 'why.cert.title',
      descKey: 'why.cert.desc'
    },
    {
      id: 'park',
      icon: <MapPin className="w-6 h-6 text-brand-green" />,
      titleKey: 'why.park.title',
      descKey: 'why.park.desc'
    },
    {
      id: 'eling',
      icon: <ShieldCheck className="w-6 h-6 text-brand-green" />,
      titleKey: 'why.eling.title',
      descKey: 'why.eling.desc'
    }
  ];

  return (
    <section id="why-solarit" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-widest uppercase mb-4">
              {t('badge.advantage')}
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-8 relative inline-block block">
              {t('why.title')}
              <div className="absolute -bottom-2 left-0 w-12 h-1.5 bg-brand-yellow rounded-full"></div>
            </h2>
            
            <div className="space-y-6 mt-12">
              {reasons.map((reason) => (
                <div key={reason.id} className="flex gap-4 p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-white border border-transparent hover:border-gray-100 cursor-default">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-brand-navy mb-2">
                      {t(reason.titleKey)}
                    </h3>
                    <p className="text-gray-600">
                      {t(reason.descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/40 to-transparent z-10"></div>
              <img 
                src="/solar-park.jpg" 
                alt="Students learning at Solarit" 
                className="w-full h-auto aspect-square lg:aspect-[4/5] object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop';
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-brand-yellow flex items-center justify-center font-heading font-bold text-2xl text-brand-navy">
                    2
                  </div>
                  <div>
                    <div className="font-heading font-bold text-brand-navy text-lg">{t('why.park_badge.title').replace('2 ', '')}</div>
                    <div className="text-gray-600 text-sm">{t('why.park_badge.desc')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
