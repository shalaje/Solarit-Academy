import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Cpu, SunMedium, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import TacticalCard from './TacticalCard';

interface TimelineStep {
  number: string;
  weeksSq: string;
  weeksEn: string;
  titleSq: string;
  titleEn: string;
  descSq: string;
  descEn: string;
  topicsSq: string[];
  topicsEn: string[];
  icon: typeof BookOpen;
}

export default function ProgramTimeline() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  const steps: TimelineStep[] = [
    {
      number: '01',
      weeksSq: 'Java 1–3',
      weeksEn: 'Weeks 1–3',
      titleSq: 'Bazat Inxhinierike & Fizika Fotovoltaike',
      titleEn: 'Engineering Foundations & PV Physics',
      descSq: 'Mësim intensiv teorik në laborator. Analiza e rrezatimit diellor, teknologjitë e moduleve fotovoltaike (Monokristaline, Bifacial), llogaritja e këndeve optimale dhe bazat elektrike të rrymës së vazhduar (DC) e alternative (AC).',
      descEn: 'Rigorous classroom and lab instruction covering solar irradiance modeling, silicon and bifacial cell physics, tilt and azimuth optimization, and fundamental electrical DC/AC laws.',
      topicsSq: [
        'Fizika fotovoltaike & matjet e rrezatimit diellor',
        'Siguria në punë dhe mbrojtja në lartësi (HSE)',
        'Standardet evropiane dhe rregulloret teknike'
      ],
      topicsEn: [
        'PV cell physics & irradiance solar mapping',
        'Workplace safety & height protection protocols (HSE)',
        'European IEC standards & local electrical codes'
      ],
      icon: BookOpen
    },
    {
      number: '02',
      weeksSq: 'Java 4–5',
      weeksEn: 'Weeks 4–5',
      titleSq: 'Projektimi & Pajisjet Elektrike (BOS)',
      titleEn: 'System Design & Electrical Equipment',
      descSq: 'Përzgjedhja dhe dimensionimi i inverterave on-grid dhe hibrid, mbrojtjet nga mbingarkesat dhe rrufetë, kabllimi diellor i specializuar dhe modelimi i skemave njëvijore me softuer profesional.',
      descEn: 'Selection and configuration of on-grid string inverters, DC/AC overvoltage and surge suppression devices, specialized UV-rated solar cabling, and single-line diagram schematic drafting.',
      topicsSq: [
        'Dimensionimi i stringjeve dhe raporteve DC/AC',
        'Konfigurimi i inverterave (Huawei, SMA, Fronius)',
        'Mbrojtjet diferenciale dhe mbrojtja nga shkarkimet atmosferike'
      ],
      topicsEn: [
        'String sizing and DC-to-AC capacity ratios',
        'Commercial inverter configuration (Huawei, SMA, Fronius)',
        'Surge arrestors, grounding and DC disconnect switches'
      ],
      icon: Cpu
    },
    {
      number: '03',
      weeksSq: 'Java 6–8',
      weeksEn: 'Weeks 6–8',
      titleSq: 'Praktikë në Terren në Parkun 2MW',
      titleEn: 'Field Operations at 2MW Solar Park',
      descSq: 'Përvojë direkte praktike në impiantin funksional në Pejë. Montimi real i strukturave mbajtëse, fiksimi i paneleve me moment-çelës, krimpimi i lidhëseve MC4 dhe testimet me instrumente profesionale.',
      descEn: 'Direct hands-on immersion at the active 2MW utility-scale solar plant in Pejë. Real mounting of racking systems, torque-wrench fastening, precision MC4 connector crimping, and electrical safety checks.',
      topicsSq: [
        'Montim mekanik në struktura fikse dhe çati',
        'Matjet e tensionit Voc, rrymës Isc dhe rezistencës së izolimit',
        'Inspektimi termografik me kamera infra të kuqe'
      ],
      topicsEn: [
        'Mechanical mounting on ground-mount racks and rooftop structures',
        'Voc open-circuit and Isc short-circuit instrument testing',
        'Thermographic imaging for hotspot detection and diagnostics'
      ],
      icon: SunMedium
    },
    {
      number: '04',
      weeksSq: 'Java 9–10',
      weeksEn: 'Weeks 9–10',
      titleSq: 'Vënia në Punë & Certifikimi Zyrtar',
      titleEn: 'Commissioning & Official Certification',
      descSq: 'Verifikimi përfundimtar i vënies në funksion sipas standardit IEC 62446, lëshimi i raportit të pranimit teknik, testimi final teorik dhe praktik, dhe pajisja me certifikatën e akredituar.',
      descEn: 'Full commissioning and energization checklists under IEC 62446, generation of electrical safety handover reports, formal examinations, and the conferral of state-accredited diplomas.',
      topicsSq: [
        'Procedurat e vënies nën tension dhe sinkronizimit me rrjetin',
        'Testi përfundimtar teorik dhe provimi praktik në terren',
        'Pajisja me diplomë të njohur kombëtare dhe ndërkombëtare'
      ],
      topicsEn: [
        'Grid synchronization and utility energization sign-off',
        'Final written exam and practical commissioning evaluation',
        'Conferral of accredited professional qualification'
      ],
      icon: Award
    }
  ];

  const currentStepData = steps[activeStep];
  const StepIcon = currentStepData.icon;

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-widest uppercase mb-4">
            {currentLanguage === 'sq' ? 'Rrugëtimi i Kurrikulës' : 'Program Journey'}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-navy tracking-tight">
            {currentLanguage === 'sq' ? 'Si duket një program trajnimi?' : 'What does a training program look like?'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
            {currentLanguage === 'sq' 
              ? 'Një rrugëtim i qartë 4-fazor me 10 javë aftësimi intensiv: nga bazat e fizikës në klasë deri te montimi dhe vënia në punë në parkun diellor 2MW.' 
              : 'A structured 4-phase, 10-week technical journey: progressing from laboratory theory to full-scale deployment at our operational 2MW solar facility.'}
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Step Selector Navigation (Left Column) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3 relative">
            {/* Visual connecting track */}
            <div className="absolute left-[34px] top-6 bottom-6 w-0.5 bg-gray-200 hidden sm:block -z-0"></div>

            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const isPast = activeStep > index;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative z-10 flex items-center gap-4 sm:gap-5 group cursor-pointer ${
                    isActive
                      ? 'bg-brand-navy text-white border-brand-navy shadow-lg shadow-brand-navy/15 translate-x-1 sm:translate-x-2'
                      : 'bg-[#F9FAFB] hover:bg-white text-brand-navy border-gray-200/80 hover:border-brand-green/50 shadow-sm'
                  }`}
                >
                  {/* Step Number Badge */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-base transition-all duration-300 shrink-0 ${
                      isActive
                        ? 'bg-brand-green text-white shadow-md shadow-brand-green/30 scale-105'
                        : isPast
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white border border-gray-200 text-gray-500 group-hover:text-brand-green group-hover:border-brand-green/30'
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Step Title & Week Readout */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isActive ? 'text-brand-yellow' : 'text-gray-500'
                        }`}
                      >
                        {currentLanguage === 'sq' ? step.weeksSq : step.weeksEn}
                      </span>
                    </div>
                    <div
                      className={`font-heading font-bold text-sm sm:text-base leading-snug truncate transition-colors ${
                        isActive ? 'text-white' : 'text-brand-navy group-hover:text-brand-green'
                      }`}
                    >
                      {currentLanguage === 'sq' ? step.titleSq : step.titleEn}
                    </div>
                  </div>

                  {/* Active Indicator Chevron */}
                  <div className={`shrink-0 transition-transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:opacity-60'}`}>
                    <ChevronRight className={`w-5 h-5 ${isActive ? 'text-brand-yellow' : 'text-gray-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Content Card (Right Column) */}
          <div className="lg:col-span-7 flex">
            <TacticalCard
              isDark={false}
              radarColor="bg-brand-green"
              coordinateTag={`PHASE // ${currentStepData.number}`}
              className="w-full h-full min-h-[420px]"
            >
              <div className="p-8 sm:p-10 md:p-12 h-full flex flex-col justify-between bg-white rounded-2xl relative overflow-hidden">
                
                {/* Card Header */}
                <div>
                  <div className="flex items-center justify-end mb-6">
                    <span className="text-xs font-mono font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
                      {currentLanguage === 'sq' ? currentStepData.weeksSq : currentStepData.weeksEn}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-navy text-white flex items-center justify-center shrink-0 shadow-md">
                      <StepIcon className="w-6 h-6 text-brand-yellow" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-navy leading-snug">
                        {currentLanguage === 'sq' ? currentStepData.titleSq : currentStepData.titleEn}
                      </h3>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <p className="text-base text-gray-600 leading-relaxed mb-6">
                    {currentLanguage === 'sq' ? currentStepData.descSq : currentStepData.descEn}
                  </p>
                </div>

                {/* Key Deliverables / Topics List */}
                <div className="pt-6 border-t border-gray-100 bg-gray-50/70 -mx-8 sm:-mx-10 md:-mx-12 -mb-8 sm:-mb-10 md:-mb-12 p-6 sm:p-8 rounded-b-2xl">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">
                    {currentLanguage === 'sq' ? 'KOPMETENCAT KRYESORE TË FITUARA:' : 'KEY LEARNING OUTCOMES:'}
                  </div>
                  <div className="space-y-2.5">
                    {(currentLanguage === 'sq' ? currentStepData.topicsSq : currentStepData.topicsEn).map((topic, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                        <span className="leading-snug">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </TacticalCard>
          </div>

        </div>

      </div>
    </section>
  );
}
