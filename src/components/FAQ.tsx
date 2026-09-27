import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  const faqs = [
    {
      id: 'req',
      qSq: 'Cilat janë kërkesat për aplikim?',
      qEn: 'What are the application requirements?',
      aSq: 'Aplikantët duhet të kenë përfunduar shkollën e mesme. Përvoja paraprake në fushën e energjisë nuk është e detyrueshme por është përparësi. [TË KONFIRMOHET]',
      aEn: 'Applicants must have completed high school. Prior experience in energy is not required but is an advantage. [TO BE CONFIRMED]'
    },
    {
      id: 'cost',
      qSq: 'Sa është kostoja e programit?',
      qEn: 'What is the program cost?',
      aSq: 'Kostoja e plotë e programit, përfshirë materialet dhe certifikimin, mund të paguhet me këste. Ju lutemi na kontaktoni për ofertat aktuale. [TË KONFIRMOHET]',
      aEn: 'The full cost of the program, including materials and certification, can be paid in installments. Please contact us for current offers. [TO BE CONFIRMED]'
    },
    {
      id: 'cert',
      qSq: 'Sa është vlefshmëria e certifikatës?',
      qEn: 'What is the validity of the certification?',
      aSq: 'Certifikata jonë njihet ndërkombëtarisht dhe është e vlefshme përgjithmonë, megjithëse rekomandohet rifreskim njohurish çdo 3 vite. [TË KONFIRMOHET]',
      aEn: 'Our certification is internationally recognized and permanently valid, although a knowledge refresher is recommended every 3 years. [TO BE CONFIRMED]'
    },
    {
      id: 'duration',
      qSq: 'Sa zgjat një program i plotë?',
      qEn: 'How long does a full program take?',
      aSq: 'Programi bazë për instalues solar zgjat zakonisht 10 javë. Orari është fleksibil për profesionistët që punojnë. [TË KONFIRMOHET]',
      aEn: 'The core solar installer program typically takes 10 weeks. The schedule is flexible for working professionals. [TO BE CONFIRMED]'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-navy">
            {currentLanguage === 'sq' ? 'Pyetjet e Shpeshta' : 'Frequently Asked Questions'}
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.id} 
                className="relative rounded-2xl border border-neutral-200/80 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:border-neutral-300 hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left bg-white hover:bg-neutral-50/50 transition-colors"
                >
                  <span className="text-base md:text-lg font-heading font-bold text-brand-navy">
                    {currentLanguage === 'sq' ? faq.qSq : faq.qEn}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-brand-navy/60 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-brand-green' : ''}`} />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pt-2 border-t border-neutral-100">
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans mt-3">
                      {currentLanguage === 'sq' ? faq.aSq : faq.aEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
