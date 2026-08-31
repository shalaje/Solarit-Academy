import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Map, Award, CheckCircle2 } from 'lucide-react';

export default function ProgramTimeline() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  // Note: These would ideally be translated via context, but we use hardcoded strings for demonstration
  const timelineSteps = [
    {
      id: 'theory',
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Java 1-4: Teoria dhe Bazat',
      titleEn: 'Weeks 1-4: Theory & Basics',
      desc: 'Mësim intensiv në klasë. Modulet mbulojnë bazat e energjisë solare, sigurinë në punë, dhe projektimin e sistemeve fotovoltaike.',
      descEn: 'Intensive classroom learning. Modules cover solar energy fundamentals, workplace safety, and PV system design.',
      color: 'bg-brand-navy'
    },
    {
      id: 'practice',
      icon: <Map className="w-5 h-5" />,
      title: 'Java 5-8: Praktika në Park',
      titleEn: 'Weeks 5-8: Park Practice',
      desc: 'Aplikim praktik në parkun solar 2MW në Pejë. Instalime reale, matje, dhe zgjidhje të problemeve në terren.',
      descEn: 'Hands-on application at the 2MW solar park in Pejë. Real installations, measurements, and field troubleshooting.',
      color: 'bg-brand-sun-start'
    },
    {
      id: 'cert',
      icon: <Award className="w-5 h-5" />,
      title: 'Java 9-10: Certifikimi',
      titleEn: 'Weeks 9-10: Certification',
      desc: 'Testimet finale teorike dhe praktike, të ndjekura nga lëshimi i certifikatës së njohur ndërkombëtarisht.',
      descEn: 'Final theoretical and practical exams, followed by the issuance of internationally recognized certification.',
      color: 'bg-brand-green'
    }
  ];

  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/5 text-brand-navy text-xs font-bold tracking-widest uppercase mb-4">
            {currentLanguage === 'sq' ? 'Rrugëtimi i Programit' : 'Program Journey'}
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-navy">
            {currentLanguage === 'sq' ? 'Si duket një program trajnimi?' : 'What does a training program look like?'}
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl text-lg">
            {currentLanguage === 'sq' 
              ? 'Një pasqyrë e strukturuar e kurrikulës tonë 10-javore. *[DATAT DHE STRUKTURA E SAKTË DUHET TË KONFIRMOHEM NGA KLIENTI]*' 
              : 'A structured overview of our 10-week curriculum. *[EXACT DATES AND STRUCTURE TO BE CONFIRMED BY CLIENT]*'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Timeline Navigation */}
          <div className="lg:w-1/3 relative">
            {/* Vertical Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-gray-100 rounded-full hidden md:block"></div>
            
            <div className="space-y-6">
              {timelineSteps.map((step, index) => {
                const isActive = activeStep === index;
                const isPassed = activeStep > index;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className="relative flex items-center gap-6 w-full text-left group"
                  >
                    <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
                      ${isActive ? step.color + ' text-white scale-110 shadow-lg' : 
                        isPassed ? 'bg-brand-green/20 text-brand-green' : 'bg-white border-2 border-gray-100 text-gray-400 group-hover:border-gray-300'}`}
                    >
                      {isPassed ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold font-heading transition-colors ${isActive ? 'text-brand-navy' : 'text-gray-500'}`}>
                        {currentLanguage === 'sq' ? step.title : step.titleEn}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline Content */}
          <div className="lg:w-2/3">
            <div className="bg-[#F7F8FA] rounded-3xl p-8 md:p-12 relative overflow-hidden h-full min-h-[300px] flex items-center">
              <div className="absolute inset-0 bg-solar-motif text-brand-navy opacity-[0.03] pointer-events-none"></div>
              
              <div className="relative z-10 transition-all duration-500 animate-in fade-in slide-in-from-right-8" key={activeStep}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-bold mb-6 ${timelineSteps[activeStep].color}`}>
                  {currentLanguage === 'sq' ? 'Moduli Aktual' : 'Current Module'}
                </div>
                
                <h3 className="text-3xl font-heading font-bold text-brand-navy mb-6">
                  {currentLanguage === 'sq' ? timelineSteps[activeStep].title : timelineSteps[activeStep].titleEn}
                </h3>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  {currentLanguage === 'sq' ? timelineSteps[activeStep].desc : timelineSteps[activeStep].descEn}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
