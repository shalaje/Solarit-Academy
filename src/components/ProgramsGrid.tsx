import { useState } from 'react';
import { 
  Sun, 
  Battery, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  GraduationCap, 
  BookOpen, 
  Zap, 
  X,
  FileCheck2,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TacticalCard from './TacticalCard';

export interface ModuleItem {
  week: string;
  titleSq: string;
  titleEn: string;
  descSq: string;
  descEn: string;
}

export interface ProgramCourse {
  id: string;
  category: 'all' | 'solar' | 'battery';
  tag: string;
  tagColor: string; // Tailwind color classes
  accentBorder: string;
  accentGlow: string;
  titleSq: string;
  titleEn: string;
  descSq: string;
  descEn: string;
  price: string;
  pricePeriodSq: string;
  pricePeriodEn: string;
  levelSq: string;
  levelEn: string;
  duration: string;
  durationSq?: string;
  durationEn?: string;
  formatSq: string;
  formatEn: string;
  certSq: string;
  certEn: string;
  bgGradient: string;
  bannerImage: string;
  highlightsSq: string[];
  highlightsEn: string[];
  curriculum: ModuleItem[];
  seatsLeft?: number;
}

export default function ProgramsGrid() {
  const { t } = useLanguage();
  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';
  const [activeCategory, setActiveCategory] = useState<'all' | 'solar' | 'battery'>('all');
  const [selectedCourse, setSelectedCourse] = useState<ProgramCourse | null>(null);

  const programs: ProgramCourse[] = [
    {
      id: 'pv-installer-pro',
      category: 'solar',
      tag: 'SOLAR PV',
      tagColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      accentBorder: 'hover:border-amber-500/50',
      accentGlow: 'hover:shadow-amber-500/10',
      titleSq: 'Instalimi i sistemeve solare',
      titleEn: 'Solar PV Systems Installation',
      descSq: 'Program praktik dhe teorik per: montimin, instalimin, lidhjen në rrjet dhe mirëmbajtjen',
      descEn: 'Practical and theoretical program for: mounting, installation, grid connection, and maintenance',
      price: '€490',
      pricePeriodSq: 'Pagesë e plotë ose me 3 këste',
      pricePeriodEn: 'Full payment or 3 installments',
      levelSq: 'Niveli Bazë drejt të Avancuarit',
      levelEn: 'Basic to Intermediate',
      duration: '1 javë',
      durationSq: '1 javë',
      durationEn: '1 week',
      formatSq: 'Klasë + Park Solar 2MW',
      formatEn: 'Classroom + 2MW Solar Park',
      certSq: 'Certifikatë e vijueshmërisë',
      certEn: 'Certificate of Attendance',
      bgGradient: 'from-amber-500/20 via-slate-900 to-slate-950',
      bannerImage: '/02.jpg',
      seatsLeft: 6,
      highlightsSq: [
        'Praktikë direkte në parkun solar funksional 2MW në Pejë',
        'Montim mekanik i strukturave dhe moduleve fotovoltaike',
        'Lidhje elektrike DC/AC dhe inverters (SMA, Huawei, Fronius)',
        'Rregulloret e sigurisë në punë në lartësi (HSE)',
      ],
      highlightsEn: [
        'Direct hands-on training at the operational 2MW solar park in Pejë',
        'Mechanical mounting of racks and PV modules',
        'DC/AC cabling, stringing, and inverter wiring (SMA, Huawei, Fronius)',
        'Workplace health, safety and height protection (HSE)',
      ],
      curriculum: [
        {
          week: 'Java 01 - 02',
          titleSq: 'Bazat e Energjisë Diellore & Fizika Fotovoltaike',
          titleEn: 'Solar Fundamentals & PV Physics',
          descSq: 'Rrezatimi diellor, llojet e qelizave fotovoltaike (Monokristaline, Bifacial), këndet e pjerrësisë dhe orientimi optimal.',
          descEn: 'Solar irradiance, cell technologies (Monocrystalline, Bifacial), tilt angles, and azimuth optimization.',
        },
        {
          week: 'Java 03 - 04',
          titleSq: 'Projektimi & Pajisjet Elektrike (Inverter, Kabllim DC)',
          titleEn: 'Design & Electrical Balance of Systems',
          descSq: 'Përzgjedhja e inverterave on-grid/off-grid, dimensionimi i kabllove, mbrojtjet nga mbingarkesa dhe rrufeja.',
          descEn: 'Inverter selection, string sizing, surge protection devices, and DC disconnect safety protocols.',
        },
        {
          week: 'Java 05 - 07',
          titleSq: 'Praktikë në Terren në Parkun Solar 2MW',
          titleEn: 'Field Operations at 2MW Solar Park',
          descSq: 'Montim real i shinave, moduleve, shtrëngimi me moment çelës, krimpimi i lidhëseve MC4 dhe matjet e tensionit me Voc/Isc.',
          descEn: 'Real installation of mounting racks, torque specs, MC4 connector crimping, and Voc/Isc commissioning measurements.',
        },
        {
          week: 'Java 08',
          titleSq: 'Vënia në Punë, Testimi & Provimi Final',
          titleEn: 'Commissioning, Testing & Final Exam',
          descSq: 'Protokollet e testimit sipas IEC 62446, kontrolli me kamerë termike për pika të nxehta, dhe testimi përfundimtar teorik-praktik.',
          descEn: 'IEC 62446 commissioning tests, infrared thermography for hotspot detection, and theoretical/practical qualification exam.',
        }
      ]
    },
    {
      id: 'bess-master',
      category: 'battery',
      tag: 'SOLAR HIBRID',
      tagColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      accentBorder: 'hover:border-emerald-500/50',
      accentGlow: 'hover:shadow-emerald-500/10',
      titleSq: 'Sistemet solare hibride',
      titleEn: 'Hybrid Solar Systems',
      descSq: 'Specializim i avancuar për inxhinierë dhe teknikë mbi sistemet solare hibride dhe konfigurimi i tyre',
      descEn: 'Advanced specialization for engineers and technicians on hybrid solar systems and their configuration',
      price: '€550',
      pricePeriodSq: 'Pagesë e plotë',
      pricePeriodEn: 'Full payment',
      levelSq: 'Niveli i Avancuar',
      levelEn: 'Advanced Professional',
      duration: '1 javë',
      durationSq: '1 javë',
      durationEn: '1 week',
      formatSq: 'Klasë + Praktike',
      formatEn: 'Classroom + Practice',
      certSq: 'Certifikatë e vijueshmërisë',
      certEn: 'Certificate of Attendance',
      bgGradient: 'from-emerald-500/20 via-slate-900 to-slate-950',
      bannerImage: '/03.jpg',
      seatsLeft: 4,
      highlightsSq: [
        'Konfigurimi dhe instalimi i sistemeve solare hibride',
        'Integrimi me bateri dhe inverterë hibridë',
        'Parametrizimi dhe menaxhimi i energjisë',
      ],
      highlightsEn: [
        'Configuration and installation of hybrid solar systems',
        'Integration with battery storage and hybrid inverters',
        'Parameter setup and energy management',
      ],
      curriculum: [
        {
          week: 'Pjesa 1',
          titleSq: 'Bazat e Sistemeve Solare Hibride & Inverterët',
          titleEn: 'Hybrid Solar Fundamentals & Inverters',
          descSq: 'Arkitektura e sistemeve hibride, inverterët hibridë dhe logjika e operimit.',
          descEn: 'Hybrid architecture, hybrid inverters, and operational logic.',
        },
        {
          week: 'Pjesa 2',
          titleSq: 'Praktikë në Konfigurim & Integrim me Bateri',
          titleEn: 'Hands-on Configuration & Battery Integration',
          descSq: 'Lidhja e baterive, parametrizimi dhe testimet praktike në laborator.',
          descEn: 'Battery connection, parameter setup, and hands-on lab testing.',
        }
      ]
    },
    {
      id: 'pv-design-engineer',
      category: 'solar',
      tag: 'SOFTWARE & CAD',
      tagColor: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      accentBorder: 'hover:border-cyan-500/50',
      accentGlow: 'hover:shadow-cyan-500/10',
      titleSq: 'Trajnim Profesional për Softuerët Solarë: AutoCAD, PV*SOL & PVsyst',
      titleEn: 'Professional Training for Solar Software: AutoCAD, PV*SOL & PVsyst',
      descSq: 'Trajnim kompjuterik. Modelimin 3D të hijeve, llogaritjen e prodhimit vjetor, simulimet e avancuara dhe skemat elektrike.',
      descEn: 'Computer training. 3D shading modeling, annual yield calculation, advanced simulations, and electrical schematics.',
      price: '€420',
      pricePeriodSq: 'Pagesë e plotë',
      pricePeriodEn: 'Full payment',
      levelSq: 'Nivel Mesatar - i Avancuar',
      levelEn: 'Intermediate - Advanced',
      duration: '1 Javë',
      durationSq: '1 Javë',
      durationEn: '1 Week',
      formatSq: 'Klasë',
      formatEn: 'Classroom',
      certSq: 'Certifikatë e Vijueshmërisë.',
      certEn: 'Certificate of Attendance',
      bgGradient: 'from-cyan-500/20 via-slate-900 to-slate-950',
      bannerImage: '/01.jpg',
      seatsLeft: 8,
      highlightsSq: [
        'Modelimi 3D i ndërtesave dhe terrenit në PV*SOL & PVsyst',
        'Analiza e hijeve, llogaritja e prodhimit vjetor dhe skemat në AutoCAD',
      ],
      highlightsEn: [
        '3D building and terrain modeling in PV*SOL & PVsyst',
        'Shading analysis, annual yield simulation, and AutoCAD schematics',
      ],
      curriculum: [
        {
          week: 'Pjesa 1',
          titleSq: 'Projektimi & Skemat me AutoCAD',
          titleEn: 'AutoCAD Design & Schematics',
          descSq: 'Hartimi i skemave njëvijore dhe planeve të instalimit fotovoltaik.',
          descEn: 'Single-line diagrams and PV installation layouts in AutoCAD.',
        },
        {
          week: 'Pjesa 2',
          titleSq: 'Simulimi 3D me PV*SOL & PVsyst',
          titleEn: '3D Simulation with PV*SOL & PVsyst',
          descSq: 'Modelimi i hijeve, llogaritja e prodhimit vjetor dhe raporti i fizibilitetit.',
          descEn: 'Shading simulation, annual production yield, and bankable reports.',
        }
      ]
    }
  ];

  const filteredPrograms = programs.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const solarCount = programs.filter(p => p.category === 'solar').length;
  const batteryCount = programs.filter(p => p.category === 'battery').length;

  return (
    <section id="programs" className="py-24 bg-[#0B0F19] text-white relative overflow-hidden">
      {/* Visual Accent Background Pattern */}
      <div className="absolute inset-0 bg-solar-motif opacity-[0.04] pointer-events-none"></div>
      
      {/* Radial ambient glow effects */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-14">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-gray-300 text-xs font-heading font-medium tracking-wider uppercase mb-4">
            {currentLanguage === 'sq' ? 'PROGRAMET E AVANCUARA' : 'ADVANCED PROGRAM CATALOG'}
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white mb-5">
            {currentLanguage === 'sq' ? 'Kurrikula profesionale e gjeneratës së re' : 'Professional curriculum for modern industry'}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            {currentLanguage === 'sq' 
              ? 'Trajnime të avancuara teknike: ky program kombinon teorinë me praktikën intensive drejtpërdrejt në parkun solar në Pejë, duke të përgatitur plotësisht me përvojë reale për tregun e punës.'
              : 'Advanced technical training: this program combines theory with intensive hands-on practice directly at the solar park in Pejë, thoroughly preparing you with real-world experience for the job market.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="w-full flex justify-center mb-12 sm:mb-16 px-4 sm:px-6">
          <div className="w-full sm:w-auto max-w-md sm:max-w-none p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col sm:flex-row gap-1.5 sm:gap-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-heading font-semibold transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-brand-green text-white shadow-md shadow-brand-green/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{currentLanguage === 'sq' ? `Të Gjitha Programet (${programs.length})` : `All Programs (${programs.length})`}</span>
            </button>
            <button
              onClick={() => setActiveCategory('solar')}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-heading font-semibold transition-all duration-200 ${
                activeCategory === 'solar'
                  ? 'bg-brand-green text-white shadow-md shadow-brand-green/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{currentLanguage === 'sq' ? `Instalim i sistemeve solare (${solarCount})` : `Solar PV Installation (${solarCount})`}</span>
            </button>
            <button
              onClick={() => setActiveCategory('battery')}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-heading font-semibold transition-all duration-200 ${
                activeCategory === 'battery'
                  ? 'bg-brand-green text-white shadow-md shadow-brand-green/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Battery className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{currentLanguage === 'sq' ? `Sistemet solare hibride (${batteryCount})` : `Hybrid Solar Systems (${batteryCount})`}</span>
            </button>
          </div>
        </div>

        {/* Programs Grid: 3-column responsive layout with Tactical 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-6">
          {filteredPrograms.map((course) => (
            <TacticalCard
              key={course.id}
              className="flex flex-col h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.018] hover:shadow-2xl hover:shadow-brand-green/20"
              radarColor="bg-emerald-400"
              coordinateTag={`MODULE // ${course.tag}`}
              isDark={true}
            >
              {/* Inner Card Container */}
              <div className="flex flex-col h-full overflow-hidden rounded-2xl border border-white/5 group-hover:border-brand-green/30 transition-colors duration-300">
                {/* Card Banner with Photo + Overlay */}
                <div className="relative h-52 overflow-hidden bg-slate-900 border-b border-white/5">
                  <img 
                    src={course.bannerImage} 
                    alt={currentLanguage === 'sq' ? course.titleSq : course.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111625] via-[#111625]/40 to-transparent"></div>
                  
                  {/* Floating Tags */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className={`px-2.5 py-1 rounded-sm text-[9px] font-mono font-bold tracking-[0.3em] uppercase backdrop-blur-md ${course.tagColor}`}>
                      {course.tag}
                    </span>
                  </div>

                  {/* Level Badge in lower corner of banner */}
                  <div className="absolute bottom-3 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-gray-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/10">
                      <GraduationCap className="w-3.5 h-3.5 text-brand-green" />
                      {currentLanguage === 'sq' ? course.levelSq : course.levelEn}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  
                  {/* Course Title - Dominant Element after Image */}
                  {/* Course Title - Dominant Element after Image (Sentence Case, up to 3 lines, equal height) */}
                  <h3 className="text-lg md:text-xl font-heading font-bold tracking-tight leading-snug text-white group-hover:text-brand-green transition-colors mb-2.5 min-h-[4.5rem] line-clamp-3">
                    {currentLanguage === 'sq' ? course.titleSq : course.titleEn}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs md:text-sm text-gray-400 line-clamp-2 mb-5 leading-relaxed min-h-[2.5rem]">
                    {currentLanguage === 'sq' ? course.descSq : course.descEn}
                  </p>

                  {/* Key Metadata Group */}
                  <div className="bg-[#0B0F19]/90 rounded-xl p-3.5 border border-white/5 mb-5 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-gray-300">
                      <span className="flex items-center gap-1.5 text-gray-400 text-[11px] font-mono uppercase">
                        <Clock className="w-3.5 h-3.5 text-brand-green" />
                        {currentLanguage === 'sq' ? 'Koha:' : 'Dur:'}
                      </span>
                      <span className="font-semibold text-white font-mono text-[11px]">
                        {currentLanguage === 'sq' ? (course.durationSq || course.duration) : (course.durationEn || course.duration)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-gray-300">
                      <span className="flex items-center gap-1.5 text-gray-400 text-[11px] font-mono uppercase">
                        <Layers className="w-3.5 h-3.5 text-brand-green" />
                        {currentLanguage === 'sq' ? 'Formati:' : 'Format:'}
                      </span>
                      <span className="font-semibold text-white truncate max-w-[170px] text-[11px]" title={currentLanguage === 'sq' ? course.formatSq : course.formatEn}>
                        {currentLanguage === 'sq' ? course.formatSq : course.formatEn}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-gray-300">
                      <span className="flex items-center gap-1.5 text-gray-400 text-[11px] font-mono uppercase">
                        <Award className="w-3.5 h-3.5 text-brand-green" />
                        {currentLanguage === 'sq' ? 'Cert:' : 'Cert:'}
                      </span>
                      <span className="font-semibold text-brand-yellow truncate max-w-[170px] text-[11px]">
                        {currentLanguage === 'sq' ? course.certSq : course.certEn}
                      </span>
                    </div>
                  </div>

                  {/* Highlights List */}
                  <div className="mb-6 space-y-1.5">
                    {(currentLanguage === 'sq' ? course.highlightsSq : course.highlightsEn).slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                        <span className="leading-tight text-gray-300 line-clamp-1">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button - Direct Prominent CTA aligned at bottom */}
                  <div className="pt-4 mt-auto border-t border-white/5">
                    <a
                      href="#contact"
                      className="w-full inline-flex items-center justify-center font-heading font-bold tracking-wide rounded-full px-5 py-3 text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-md shadow-brand-green/25 hover:shadow-lg hover:shadow-brand-green/35 gap-2"
                    >
                      <span>{currentLanguage === 'sq' ? 'APLIKO TANI' : 'ENROLL NOW'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </div>
            </TacticalCard>
          ))}
        </div>

        {/* Consultation Callout Banner (Centered CTA) */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-brand-navy via-slate-900 to-[#0d121f] border border-white/10 py-14 sm:py-16 md:py-20 px-6 sm:px-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-solar-motif opacity-[0.05] pointer-events-none"></div>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-[11px] sm:text-xs font-heading font-semibold tracking-wider text-gray-400 uppercase mb-4 sm:mb-5">
              {currentLanguage === 'sq' ? 'GATI PËR TË FILLUAR?' : 'READY TO START?'}
            </div>
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-[1.15] mb-5 tracking-tight">
              {currentLanguage === 'sq' ? (
                <>
                  Nuk jeni të sigurt cilin <br />
                  <span className="text-brand-green font-heading">modul të zgjidhni?</span>
                </>
              ) : (
                <>
                  Not sure which <br />
                  <span className="text-brand-green font-heading">module to pick?</span>
                </>
              )}
            </h3>

            <p className="text-sm sm:text-base md:text-lg text-gray-300/90 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-sans font-normal">
              {currentLanguage === 'sq' 
                ? 'Trajnerët tanë do të vlerësojnë profilin tuaj dhe do të rekomandojnë pikën e duhur të fillimit.'
                : 'Our trainers will assess your profile and recommend the right starting point.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center font-heading font-bold tracking-wide rounded-full px-8 py-3.5 text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-xl shadow-brand-green/25 hover:shadow-2xl hover:shadow-brand-green/40 cursor-pointer"
              >
                {currentLanguage === 'sq' ? 'Rezervo Konsultë Falas' : 'Book Free Consultation'}
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center font-heading font-semibold tracking-wide rounded-full px-8 py-3.5 text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/60 backdrop-blur-sm cursor-pointer"
              >
                {currentLanguage === 'sq' ? 'Kontakto Akademinë' : 'Contact Academy'}
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Course Detailed Syllabus Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] bg-[#111625] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 md:p-8 bg-slate-900 border-b border-slate-800">
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-heading font-bold uppercase tracking-wider ${selectedCourse.tagColor}`}>
                  {selectedCourse.tag}
                </span>
                <span className="text-xs text-brand-yellow font-semibold">
                  {currentLanguage === 'sq' ? (selectedCourse.durationSq || selectedCourse.duration) : (selectedCourse.durationEn || selectedCourse.duration)}
                </span>
              </div>

              <h3 className="text-2xl font-heading font-bold text-white pr-8">
                {currentLanguage === 'sq' ? selectedCourse.titleSq : selectedCourse.titleEn}
              </h3>
              
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-green" />
                  <span>{currentLanguage === 'sq' ? selectedCourse.formatSq : selectedCourse.formatEn}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>{currentLanguage === 'sq' ? selectedCourse.certSq : selectedCourse.certEn}</span>
                </div>
              </div>
            </div>

            {/* Modal Body: Modules breakdown */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-gray-300">
              
              <div>
                <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-2">
                  {currentLanguage === 'sq' ? 'Përshkrimi i Programit' : 'Program Overview'}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {currentLanguage === 'sq' ? selectedCourse.descSq : selectedCourse.descEn}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-green" />
                  {currentLanguage === 'sq' ? 'Struktura Javore e Moduleve' : 'Weekly Module Syllabus'}
                </h4>
                
                <div className="space-y-4">
                  {selectedCourse.curriculum.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-brand-yellow">
                        <span>{item.week}</span>
                        <FileCheck2 className="w-4 h-4 text-brand-green" />
                      </div>
                      <h5 className="font-heading font-bold text-white text-base">
                        {currentLanguage === 'sq' ? item.titleSq : item.titleEn}
                      </h5>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {currentLanguage === 'sq' ? item.descSq : item.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-3">
                  {currentLanguage === 'sq' ? 'Aftësitë që do të Fitoni' : 'Key Skills Acquired'}
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {(currentLanguage === 'sq' ? selectedCourse.highlightsSq : selectedCourse.highlightsEn).map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-300 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-gray-400">{currentLanguage === 'sq' ? 'Kostoja e plotë' : 'Tuition Fee'}</div>
                <div className="text-2xl font-heading font-bold text-brand-yellow">{selectedCourse.price}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="inline-flex items-center justify-center font-semibold tracking-wide rounded-full px-5 py-2.5 text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-slate-800 text-gray-300 hover:text-white"
                >
                  {currentLanguage === 'sq' ? 'Mbyll' : 'Close'}
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedCourse(null)}
                  className="inline-flex items-center justify-center font-bold tracking-wide rounded-full px-6 py-2.5 text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-md shadow-brand-green/20 gap-2"
                >
                  <span>{currentLanguage === 'sq' ? 'Apliko për këtë Kurs' : 'Apply for Course'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
