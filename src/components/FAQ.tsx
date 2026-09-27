import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Plus } from 'lucide-react';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  const faqs = [
    {
      id: 'req',
      qSq: 'Cilat janë kërkesat për aplikim?',
      qEn: 'What are the application requirements?',
      aSq: 'Aplikantët duhet të kenë përfunduar shkollën e mesme. Përvoja paraprake në fushën e energjisë nuk është e detyrueshme por është përparësi.',
      aEn: 'Applicants must have completed secondary education. Prior electrical or energy experience is not strictly required but considered an asset.'
    },
    {
      id: 'cost',
      qSq: 'Sa është kostoja e programit dhe mënyrat e pagesës?',
      qEn: 'What is the program fee and payment plan?',
      aSq: 'Kostoja e trajnimit përfshin të gjitha materialet laboratorike, pajisjet e sigurisë dhe certifikimin final. Pagesa mund të bëhet e plotë ose me deri në 3 këste mujore.',
      aEn: 'Tuition includes all lab materials, practical gear at the 2MW park, and official certification. Payments can be made upfront or in up to 3 installments.'
    },
    {
      id: 'cert',
      qSq: 'Sa është vlefshmëria e certifikatës së lëshuar?',
      qEn: 'What is the accreditation and validity of the certification?',
      aSq: 'Certifikata e Solarit Academy njihet kombëtarisht nga autoritetet përkatëse dhe përputhet me standardet ndërkombëtare IEC për instalimet fotovoltaike.',
      aEn: 'The credential awarded by Solarit Academy is officially recognized and adheres to international IEC technical standards for solar PV systems.'
    },
    {
      id: 'duration',
      qSq: 'Sa zgjat një program i plotë dhe si organizohet orari?',
      qEn: 'How long does the training program take and what is the schedule?',
      aSq: 'Programi zgjat 8 deri në 10 javë. Orari është i përshtatshëm edhe për profesionistët në punë, me ligjërata teorike dhe seanca intensive praktike gjatë fundjavave.',
      aEn: 'Programs run between 8 to 10 weeks with flexible scheduling designed for working professionals, combining evening classroom hours with weekend solar park practicums.'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-widest uppercase mb-4">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-navy tracking-tight">
            {currentLanguage === 'sq' ? 'Pyetjet e Shpeshta' : 'Frequently Asked Questions'}
          </h2>
        </div>
        
        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.id} 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-brand-green/50 bg-[#F9FAFB] shadow-md' 
                    : 'border-neutral-200/80 bg-white hover:border-neutral-300 hover:shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 sm:p-7 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg md:text-xl font-heading font-bold leading-snug transition-colors ${
                    isOpen ? 'text-brand-green' : 'text-brand-navy group-hover:text-brand-green'
                  }`}>
                    {currentLanguage === 'sq' ? faq.qSq : faq.qEn}
                  </span>
                  
                  {/* Rotating Expand/Collapse Plus Icon */}
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ml-4 ${
                    isOpen 
                      ? 'bg-brand-green text-white rotate-45 shadow-sm shadow-brand-green/30' 
                      : 'bg-neutral-100 text-brand-navy/70 group-hover:bg-brand-green/10 group-hover:text-brand-green'
                  }`}>
                    <Plus className="w-5 h-5 transition-transform duration-300" />
                  </span>
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 px-6 sm:px-7 pb-6 sm:pb-7' : 'max-h-0 opacity-0 px-6 sm:px-7 pb-0'
                  }`}
                >
                  <div className="pt-3 border-t border-neutral-200/70">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans mt-2">
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
