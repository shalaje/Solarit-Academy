import { useLanguage } from '../context/LanguageContext';

export default function Partners() {
  const { t } = useLanguage();

  return (
    <section id="partners" className="py-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
              {t('partners.title')}
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70">
            {/* Use text/icons as placeholders since actual logos will be provided */}
            <div className="text-2xl font-heading font-bold text-gray-800">ELING Grup</div>
            <div className="text-2xl font-heading font-bold text-gray-800">Helvetas</div>
            <div className="text-2xl font-heading font-bold text-gray-800">LuxDev</div>
            <div className="text-2xl font-heading font-bold text-gray-800">Alfa Solar Energy</div>
          </div>
        </div>
      </div>
    </section>
  );
}
