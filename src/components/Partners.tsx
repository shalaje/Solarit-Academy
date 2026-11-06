import { useLanguage } from '../context/LanguageContext';
import TacticalCard from './TacticalCard';

export default function Partners() {
  const { t, currentLanguage } = useLanguage();

  const partnersList = [
    {
      name: 'ELING Grup',
      role: currentLanguage === 'sq' ? 'Themelues Strategjik & Industri' : 'Strategic Industrial Founder',
      url: 'https://eling-ks.com',
    },
    {
      name: 'A+ Electric',
      role: currentLanguage === 'sq' ? 'Instalime Elektrike & Tension i Ulët' : 'Low-Voltage Electrical & Building Systems',
      url: 'https://eling-ks.com/2025/04/13/a/',
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
    <section id="partners" className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TacticalCard
          isDark={false}
          radarColor="bg-brand-green"
          coordinateTag="NETWORK // ALLIANCE ECOSYSTEM"
        >
          <div className="p-8 sm:p-10 md:p-12">
            {/* Header Readout */}
            <div className="text-left mb-10">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-green font-semibold mb-1 block">
                {currentLanguage === 'sq' ? 'Bashkëpunimi Edukativ & Industrial' : 'Educational & Industrial Alliance'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-brand-navy">
                {t('partners.title')}
              </h2>
            </div>
            
            {/* Partner Modular Tiles with Equal Height & Consistent Proportions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
              {partnersList.map((partner) => {
                const CardContent = (
                  <div className="flex flex-col justify-between h-full">
                    {/* Brand name */}
                    <div className="text-lg font-heading font-bold text-gray-900 mb-2.5 tracking-tight group-hover:text-brand-green transition-colors">
                      {partner.name}
                    </div>

                    {/* Role / Description */}
                    <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mt-auto">
                      {partner.role}
                    </p>
                  </div>
                );

                return partner.url ? (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-neutral-200/90 hover:border-brand-green/60 bg-white/95 hover:bg-white p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col text-left h-full min-h-[130px]"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div
                    key={partner.name}
                    className="group rounded-2xl border border-neutral-200/90 hover:border-brand-green/60 bg-white/95 hover:bg-white p-6 transition-all duration-200 hover:shadow-sm flex flex-col text-left h-full min-h-[130px]"
                  >
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </TacticalCard>
      </div>
    </section>
  );
}
