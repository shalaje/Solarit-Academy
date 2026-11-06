import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Cpu, SunMedium, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import TacticalCard from './TacticalCard';

interface TimelineStep {
  number: string;
  titleSq: string;
  titleEn: string;
  descSq: string;
  descEn: string;
  topicsSq: string[];
  topicsEn: string[];
  tagsSq: string[];
  tagsEn: string[];
  icon: typeof BookOpen;
}

export default function ProgramTimeline() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  const steps: TimelineStep[] = [
    {
      number: '01',
      titleSq: 'Bazat e elektroteknikës, siguria dhe mbrojtja e mjedisit',
      titleEn: 'Electrotechnical Fundamentals, Safety & Environmental Protection',
      descSq: 'Njohuri mbi konceptet bazë të elektroteknikës, rregulloret strikte të sigurisë në punë në lartësi (HSE), dhe protokollet e mbrojtjes së mjedisit gjatë instalimeve.',
      descEn: 'Core electrotechnical concepts, workplace health and height safety standards (HSE), and environmental protection protocols during solar installations.',
      topicsSq: [
        'Bazat e elektroteknikës dhe qarqet elektrike',
        'Siguria dhe shëndeti në punë në lartësi (HSE)',
        'Mbrojtja e mjedisit dhe standardet teknike'
      ],
      topicsEn: [
        'Electrotechnical fundamentals and electrical circuits',
        'Workplace safety and height protection (HSE)',
        'Environmental protection and technical standards'
      ],
      tagsSq: ['Teori', 'Siguri HSE', 'Standarde'],
      tagsEn: ['Theory', 'HSE Safety', 'Standards'],
      icon: BookOpen
    },
    {
      number: '02',
      titleSq: 'Sistemet solare PV – ndërtimi, operimi dhe legjislacioni',
      titleEn: 'Solar PV Systems – Construction, Operation & Legislation',
      descSq: 'Arkitektura e sistemeve fotovoltaike, parimet themelore të operimit, mënyrat e lidhjes në rrjet dhe kuadri ligjor e rregullativ në fuqi.',
      descEn: 'Photovoltaic system architecture, operational fundamentals, grid-tie connection methods, and prevailing legal and regulatory frameworks.',
      topicsSq: [
        'Teknologjitë e moduleve fotovoltaike dhe inverterëve',
        'Parimet e operimit dhe lidhjes në rrjetin elektrik',
        'Korniza ligjore, lejet dhe kërkesat rregullative'
      ],
      topicsEn: [
        'Photovoltaic module and inverter technologies',
        'Operation and utility grid connection principles',
        'Regulatory compliance, permitting, and legal framework'
      ],
      tagsSq: ['Teknologji', 'Operim Rrjeti', 'Kuadri Ligjor'],
      tagsEn: ['Technology', 'Grid Intertie', 'Regulations'],
      icon: Cpu
    },
    {
      number: '03',
      titleSq: 'Projektimi i sistemeve PV dhe simulimi softuerik',
      titleEn: 'PV System Design & Software Simulation',
      descSq: 'Modelimi kompjuterik me softuerët më të avancuar, simulimi i prodhimit vjetor të energjisë, llogaritja e hijeve dhe hartimi i skemave elektrike.',
      descEn: 'Computer-aided design with industry-standard software, annual energy yield simulations, shading analyses, and electrical schematics drafting.',
      topicsSq: [
        'Modelimi dhe simulimi me softuerë diellorë profesionalë',
        'Analiza e hijeve dhe llogaritja e prodhimit vjetor',
        'Hartimi i skemave elektrike dhe dosjes së projektimit'
      ],
      topicsEn: [
        'Modeling and simulation with professional solar design software',
        'Shading analysis and annual energy yield calculation',
        'Drafting electrical schematics and project engineering files'
      ],
      tagsSq: ['Simulim 3D', 'PV*SOL & CAD', 'Fizibilitet'],
      tagsEn: ['3D Simulation', 'PV*SOL & CAD', 'Feasibility'],
      icon: SunMedium
    },
    {
      number: '04',
      titleSq: 'Praktikë në terren',
      titleEn: 'Field Hands-on Practice',
      descSq: 'Aftësim i plotë praktik i drejtpërdrejtë në park solar: montimi mekanik i strukturave, paneleve, instalimi elektrik, lidhja në rrjet, testimet dhe vënia në funksion.',
      descEn: 'Direct, comprehensive hands-on practice at the solar park: mechanical rack mounting, PV module assembly, electrical cabling, grid connection, testing, and commissioning.',
      topicsSq: [
        'Montimi mekanik i strukturave dhe moduleve diellore',
        'Lidhjet elektrike DC/AC dhe krimpimi i konektorëve MC4',
        'Testimi, matjet elektrike dhe vënia në punë e sistemit solar'
      ],
      topicsEn: [
        'Mechanical structure and solar module assembly',
        'DC/AC electrical wiring and MC4 connector crimping',
        'Testing, electrical measurements, and solar system commissioning'
      ],
      tagsSq: ['Montim Terreni', 'Lidhje DC/AC', 'Komisionim'],
      tagsEn: ['Field Mounting', 'DC/AC Wiring', 'Commissioning'],
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-navy tracking-tight">
            {currentLanguage === 'sq' ? 'Si është i strukturuar programi?' : 'How is the program structured?'}
          </h2>
          
          <div className="mt-4 max-w-2xl text-gray-600">
            {currentLanguage === 'sq' ? (
              <div className="space-y-2">
                <p className="text-base sm:text-lg font-medium text-brand-navy leading-relaxed">
                  Një rrugëtim i qartë 4-fazor me 1 javë aftësimi intensiv që të dërgon:
                </p>
                <div className="space-y-1.5 pl-1 text-sm sm:text-base text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <span className="text-brand-green font-bold text-base mt-0.5">•</span>
                    <span><strong>Nga teoria:</strong> Bazat teknike dhe inxhinierike në klasë.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-brand-green font-bold text-base mt-0.5">•</span>
                    <span><strong>Deri te praktika:</strong> Montimi dhe vënia në punë e një sistemi solar</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-base sm:text-lg font-medium text-brand-navy leading-relaxed">
                  A structured 4-phase journey with 1 week of intensive training that takes you:
                </p>
                <div className="space-y-1.5 pl-1 text-sm sm:text-base text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <span className="text-brand-green font-bold text-base mt-0.5">•</span>
                    <span><strong>From theory:</strong> Technical and engineering fundamentals in the classroom.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-brand-green font-bold text-base mt-0.5">•</span>
                    <span><strong>To practice:</strong> Mounting and commissioning of a solar system</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Step Selector Navigation (Left Column) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3 relative">
            {/* Mobile Progress Step Indicator (Point 4) */}
            <div className="lg:hidden flex items-center justify-between px-3 py-1.5 rounded-xl bg-gray-100 text-xs font-mono text-gray-600">
              <span className="font-semibold text-brand-navy">
                {currentLanguage === 'sq' ? `Faza 0${activeStep + 1} nga 0${steps.length}` : `Phase 0${activeStep + 1} of 0${steps.length}`}
              </span>
              <span className="text-[11px] text-gray-500">{currentLanguage === 'sq' ? 'Zgjidhni fazën për detaje' : 'Select phase for details'}</span>
            </div>

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

                  {/* Step Title */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-heading font-bold text-sm sm:text-base leading-snug transition-colors ${
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
              className="w-full h-full min-h-[400px]"
            >
              <div className="p-8 sm:p-10 md:p-12 h-full flex flex-col justify-between bg-white rounded-2xl relative overflow-hidden">
                
                {/* Card Header & Description */}
                <div>
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

                  <p className="text-base text-gray-600 leading-relaxed mb-6">
                    {currentLanguage === 'sq' ? currentStepData.descSq : currentStepData.descEn}
                  </p>
                </div>

                {/* Key Deliverables / Topics List with Category Tags (Point 4) */}
                <div className="pt-6 border-t border-gray-100 bg-gray-50/70 -mx-8 sm:-mx-10 md:-mx-12 -mb-8 sm:-mb-10 md:-mb-12 p-6 sm:p-8 rounded-b-2xl">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">
                    {currentLanguage === 'sq' ? 'KOMPETENCAT KRYESORE TË FITUARA:' : 'KEY LEARNING OUTCOMES:'}
                  </div>
                  <div className="space-y-2.5">
                    {(currentLanguage === 'sq' ? currentStepData.topicsSq : currentStepData.topicsEn).map((topic, i) => {
                      const tag = (currentLanguage === 'sq' ? currentStepData.tagsSq : currentStepData.tagsEn)[i];
                      return (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-gray-100 text-xs sm:text-sm text-gray-700 shadow-2xs">
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                            <span className="leading-snug">{topic}</span>
                          </div>
                          {tag && (
                            <span className="self-start sm:self-center text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20 shrink-0">
                              {tag}
                            </span>
                          )}
                        </div>
                      );
                    })}
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
