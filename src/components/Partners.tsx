import { useLanguage } from '../context/LanguageContext';
import TacticalCard from './TacticalCard';

export default function Partners() {
  const { t, currentLanguage } = useLanguage();

  const partnersList = [
    {
      name: 'ELING Grup',
      role: currentLanguage === 'sq' ? 'Themelues Strategjik & Industri' : 'Strategic Industrial Founder',
    },
    {
      name: 'Helvetas',
      role: currentLanguage === 'sq' ? 'Bashkëpunim Zviceran për Zhvillim' : 'Swiss Intercooperation Partner',
    },
    {
      name: 'LuxDev',
      role: currentLanguage === 'sq' ? 'Zhvillimi i Arsimit Profesional' : 'Vocational & Green Training',
    },
    {
      name: 'Alfa Solar Energy',
      role: currentLanguage === 'sq' ? 'Teknologji & Komponentë PV' : 'Solar PV Technology Partner',
    }
  ];

  return (
    <section id="partners" className="py-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TacticalCard
          isDark={false}
          radarColor="bg-brand-green"
          coordinateTag="NETWORK // ALLIANCE ECOSYSTEM"
        >
          <div className="p-8 sm:p-10 md:p-12">
            {/* Header Readout */}
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold uppercase tracking-tight text-brand-navy">
                {t('partners.title')}
              </h2>
            </div>
            
            {/* Partner Modular Tiles with Consistent Breathing Room & Proportion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {partnersList.map((partner) => (
                <div
                  key={partner.name}
                  className="group rounded-2xl border border-neutral-200/90 hover:border-brand-green/60 bg-white/95 hover:bg-white p-6 transition-all duration-200 hover:shadow-sm flex flex-col justify-center text-center sm:text-left min-h-[120px]"
                >
                  {/* Brand name */}
                  <div className="text-lg font-heading font-bold text-gray-900 mb-2 tracking-tight group-hover:text-brand-green transition-colors">
                    {partner.name}
                  </div>

                  {/* Role / Description */}
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                    {partner.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TacticalCard>
      </div>
    </section>
  );
}
