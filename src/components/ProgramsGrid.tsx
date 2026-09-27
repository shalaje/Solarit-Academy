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
      titleSq: 'Instalues i Certifikuar Fotovoltaik (PV)',
      titleEn: 'Certified PV Systems Installer',
      descSq: 'Programi flamur i trajnimit praktik dhe teorik për montimin, lidhjen në rrjet, dhe mirëmbajtjen e impianteve solare fotovoltaike sipas standardeve evropiane.',
      descEn: 'Comprehensive practical and theoretical certification covering residential & commercial PV installation, grid-tie connections, and IEC compliance.',
      price: '€490',
      pricePeriodSq: 'Pagesë e plotë ose me 3 këste',
      pricePeriodEn: 'Full payment or 3 installments',
      levelSq: 'Niveli Bazë drejt të Avancuarit',
      levelEn: 'Basic to Intermediate',
      duration: '8 Javë (120 Orë)',
      formatSq: 'Klasë + Park Solar 2MW',
      formatEn: 'Classroom + 2MW Solar Park',
      certSq: 'Certifikatë e Akredituar Kombëtare',
      certEn: 'Accredited National Certification',
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
      tag: 'ENERGY STORAGE (BESS)',
      tagColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      accentBorder: 'hover:border-emerald-500/50',
      accentGlow: 'hover:shadow-emerald-500/10',
      titleSq: 'Sistemet e Ruajtjes së Energjisë me Bateri (BESS)',
      titleEn: 'Battery Energy Storage Systems Specialist',
      descSq: 'Specializim i avancuar për inxhinierë dhe teknikë mbi sistemet e akumulimit industrial dhe rezidencial me litium-jon (LFP/NMC) dhe menaxhimin e BMS.',
      descEn: 'Advanced engineering and installation of commercial and utility-scale Battery Energy Storage Systems (BESS), BMS protocols, and microgrid integration.',
      price: '€550',
      pricePeriodSq: 'Pagesë e plotë ose me 3 këste',
      pricePeriodEn: 'Full payment or 3 installments',
      levelSq: 'Niveli i Avancuar',
      levelEn: 'Advanced Professional',
      duration: '6 Javë (90 Orë)',
      formatSq: 'Lab Elektrik + Laborator Hibrid',
      formatEn: 'Electrical Lab + Hybrid Systems',
      certSq: 'Certifikatë Profesionale e Specializuar',
      certEn: 'Specialized Professional Certification',
      bgGradient: 'from-emerald-500/20 via-slate-900 to-slate-950',
      bannerImage: '/03.jpg',
      seatsLeft: 4,
      highlightsSq: [
        'Kimi e baterive Litium-Hekur-Fosfat (LiFePO4) dhe kërkesat e sigurisë',
        'Parametrizimi dhe monitorimi i Sistemit të Menaxhimit të Baterive (BMS)',
        'Integrimi i baterive me inverterë hibridë (Deye, Victron, Sungrow)',
        'Sistemet e sigurisë kundër rrezikut termik (Thermal Runaway)',
      ],
      highlightsEn: [
        'Lithium Iron Phosphate (LiFePO4) chemistry and industrial safety codes',
        'BMS configuration, cell balancing, and CANbus/Modbus telemetry',
        'Hybrid inverter integration (Deye, Victron, Sungrow)',
        'Fire suppression standards and thermal runaway prevention protocols',
      ],
      curriculum: [
        {
          week: 'Java 01 - 02',
          titleSq: 'Kimia e Qelizave & Arkitektura e Moduleve të Baterive',
          titleEn: 'Cell Chemistries & Battery Pack Architecture',
          descSq: 'Krahasimi LFP vs NMC, DoD (Thellësia e shkarkimit), ciklet e jetës, rezistenca e brendshme dhe C-rates.',
          descEn: 'LFP vs NMC benchmarking, Depth of Discharge, lifecycle analysis, internal impedance, and charge/discharge C-rates.',
        },
        {
          week: 'Java 03 - 04',
          titleSq: 'BMS, Protokollet e Komunikimit & Inverterët Hibridë',
          titleEn: 'BMS, Communication Protocols & Hybrid Inverters',
          descSq: 'Konfigurimi i protokolleve CAN/RS485, integrimi me inverterë hibridë dhe logjika e karikimit/shkarkimit në orët me çmim të lirë.',
          descEn: 'CAN/RS485 communication setup, hybrid inverter synchronization, peak shaving, and time-of-use optimization.',
        },
        {
          week: 'Java 05 - 06',
          titleSq: 'Instalimi Praktik, Siguria Kundër Zjarrit & Certifikimi',
          titleEn: 'Physical Installation, Safety & Commissioning',
          descSq: 'Instalimi fizik i kabineteve të baterive, ventilimi, sistemet e fikjes së gazit dhe testimi nën ngarkesë reale.',
          descEn: 'Cabinet deployment, cooling/HVAC, fire detection/suppression integration, and live-load capacity validation.',
        }
      ]
    },
    {
      id: 'pv-design-engineer',
      category: 'solar',
      tag: 'ENGINEERING & CAD',
      tagColor: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      accentBorder: 'hover:border-cyan-500/50',
      accentGlow: 'hover:shadow-cyan-500/10',
      titleSq: 'Inxhinieri & Projektim me PV*SOL dhe AutoCAD',
      titleEn: 'Solar PV Systems Engineering & Software Design',
      descSq: 'Trajnim kompjuterik për inxhinierë elektrikë e mekanikë mbi modelimin 3D të hijeve, llogaritjen e prodhimit vjetor dhe skemat njëvijore elektrike.',
      descEn: 'Software-driven engineering training covering 3D shading analysis, annual energy yield simulation in PV*SOL, and AutoCAD electrical single-line diagrams.',
      price: '€420',
      pricePeriodSq: 'Pagesë e plotë ose me 2 këste',
      pricePeriodEn: 'Full payment or 2 installments',
      levelSq: 'Nivel Mesatar - i Avancuar',
      levelEn: 'Intermediate - Advanced',
      duration: '5 Javë (75 Orë)',
      formatSq: 'Laborator IT & Projekte Reale',
      formatEn: 'Computer Lab & Real Projects',
      certSq: 'Certifikatë Teknike e Projektimit',
      certEn: 'Technical Design Certificate',
      bgGradient: 'from-cyan-500/20 via-slate-900 to-slate-950',
      bannerImage: '/01.jpg',
      seatsLeft: 8,
      highlightsSq: [
        'Modelimi 3D i ndërtesave dhe terrenit në PV*SOL',
        'Analiza e saktë e humbjeve (hije, pluhur, rënie tensioni)',
        'Dizajnimi i skemave njëvijore (SLD) sipas rregullave të KOSTT/KEDS',
        'Hartimi i fizibilitetit ekonomik dhe kthimit të investimit (ROI)',
      ],
      highlightsEn: [
        '3D building and terrain modeling in PV*SOL premium',
        'Detailed loss tree analysis (shading, soiling, cable DC drop)',
        'Single-line diagram (SLD) drafting for utility interconnection compliance',
        'Financial modeling, LCOE calculation, and ROI project presentations',
      ],
      curriculum: [
        {
          week: 'Java 01',
          titleSq: 'Mbledhja e të Dhënave të Terrenit & Rrezatimi Diellor',
          titleEn: 'Site Data Acquisition & Meteorological Datasets',
          descSq: 'Burimet e të dhënave PVGIS, Meteonorm dhe vlerësimi i hapësirës së çatisë/tokës.',
          descEn: 'PVGIS, Meteonorm databases, satellite data, roof azimuth, and drone survey modeling.',
        },
        {
          week: 'Java 02 - 03',
          titleSq: 'Modelimi 3D & Simulimi me PV*SOL',
          titleEn: '3D Simulation & String Optimization in PV*SOL',
          descSq: 'Krijimi i pengesave, simulimi i animuar i hijeve përgjatë 365 ditëve dhe çiftëzimi optimal i vargjeve me MPPT.',
          descEn: 'Obstacle construction, sun-path shading animations, and automated MPPT inverter string matching.',
        },
        {
          week: 'Java 04 - 05',
          titleSq: 'Hartimi i Projektit Elektrik & Dosja Teknike',
          titleEn: 'Electrical Drawings & Final Technical Submission',
          descSq: 'Përgatitja e skemës njëvijore, lista e materialeve (BOM), dhe raporti përfundimtar për lejen e kyçjes.',
          descEn: 'AutoCAD SLD generation, bill of materials (BOM), and submission-ready engineering dossier.',
        }
      ]
    },
    {
      id: 'solar-om',
      category: 'solar',
      tag: 'O&M INSPECTION',
      tagColor: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      accentBorder: 'hover:border-yellow-500/50',
      accentGlow: 'hover:shadow-yellow-500/10',
      titleSq: 'Operimi, Mirëmbajtja & Diagnostikimi (O&M)',
      titleEn: 'Solar Plant O&M & Diagnostics Specialist',
      descSq: 'Aftësim i thelluar për teknikë të terrenit në mirëmbajtjen parandaluese, zbulimin e defekteve me kamera termike, dhe matjen e kurbave I-V.',
      descEn: 'Hands-on operational maintenance, preventive testing, I-V curve tracing, drone thermography, and inverter fault troubleshooting on utility-scale plants.',
      price: '€380',
      pricePeriodSq: 'Pagesë e plotë',
      pricePeriodEn: 'One-time payment',
      levelSq: 'Niveli Mesatar',
      levelEn: 'Intermediate Level',
      duration: '4 Javë (60 Orë)',
      formatSq: 'Park Solar 2MW + Terren',
      formatEn: '2MW Solar Park + Field',
      certSq: 'Certifikatë Specialisti O&M',
      certEn: 'O&M Specialist Certificate',
      bgGradient: 'from-yellow-500/20 via-slate-900 to-slate-950',
      bannerImage: '/solar-park.jpg',
      seatsLeft: 5,
      highlightsSq: [
        'Diagnostikim i pikave të nxehta (Hotspots) me kamera termale FLIR',
        'Matja dhe interpretimi i kurbave I-V (I-V curve tracer)',
        'Testimi i izolimit të kabllove (Megger insulation resistance)',
        'Pastrimi automatik dhe menaxhimi i vegjetacionit në parqe solare',
      ],
      highlightsEn: [
        'Hotspot diagnosis via FLIR calibrated thermal imaging cameras',
        'I-V curve tracing, fill factor analysis, and degradation measurements',
        'Insulation resistance megohmmeter testing for cable grounding faults',
        'Automated cleaning systems, vegetation control, and preventive scheduling',
      ],
      curriculum: [
        {
          week: 'Java 01',
          titleSq: 'Strategjitë e Mirëmbajtjes (Parandaluese vs Korrigjuese)',
          titleEn: 'Maintenance Strategies (Preventive vs Corrective)',
          descSq: 'KPI-të kryesore të një impianti: PR (Performance Ratio), disponueshmëria, dhe llogaritja e humbjeve nga papastërtia.',
          descEn: 'Key plant KPIs: Performance Ratio (PR), uptime, soiling index, and scheduled overhaul workflows.',
        },
        {
          week: 'Java 02 - 03',
          titleSq: 'Instrumentet e Testimit në Terren në Parkun 2MW',
          titleEn: 'Field Instrumentation at 2MW Plant',
          descSq: 'Përdorimi i kurbomatësit I-V, testuesit të tokëzimit, kamerës termale sipas standardit IEC 62446-3.',
          descEn: 'Operation of I-V curve tracers, earth loop testers, and IEC 62446-3 thermographic classification.',
        },
        {
          week: 'Java 04',
          titleSq: 'Zgjidhja e Defekteve të Inverterit & Raportimi',
          titleEn: 'Inverter Troubleshooting & SCADA Reporting',
          descSq: 'Diagnostikimi i kodeve të gabimit të inverterave industrialë, zëvendësimi i siguresave dhe platformat SCADA.',
          descEn: 'Fault code analysis on central/string inverters, component replacement, and digital SCADA analytics.',
        }
      ]
    },
    {
      id: 'offgrid-microgrid',
      category: 'battery',
      tag: 'OFF-GRID & MICROGRIDS',
      tagColor: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
      accentBorder: 'hover:border-indigo-500/50',
      accentGlow: 'hover:shadow-indigo-500/10',
      titleSq: 'Sistemet Autonome Off-Grid & Mikrorrjetet',
      titleEn: 'Off-Grid Solar & Microgrid Systems',
      descSq: 'Zgjidhje energjetike të pavarura nga rrjeti për zona rurale, bujqësi, pompa diellore, telekomunikacion dhe impiante hibride me gjeneratorë.',
      descEn: 'Stand-alone off-grid power systems for rural electrification, agricultural solar water pumping, telecommunication towers, and generator hybrids.',
      price: '€450',
      pricePeriodSq: 'Pagesë e plotë ose me 2 këste',
      pricePeriodEn: 'Full payment or 2 installments',
      levelSq: 'Niveli Bazë - Mesatar',
      levelEn: 'Basic - Intermediate',
      duration: '5 Javë (75 Orë)',
      formatSq: 'Klasë + Laborator Praktik',
      formatEn: 'Classroom + Workshop Lab',
      certSq: 'Certifikatë Ndërkombëtare Off-Grid',
      certEn: 'International Off-Grid Certificate',
      bgGradient: 'from-indigo-500/20 via-slate-900 to-slate-950',
      bannerImage: '/586104350_122199067754355704_647952871261180247_n.jpg',
      seatsLeft: 7,
      highlightsSq: [
        'Dimensionimi i saktë i autonomisë së baterive për ditë pa diell',
        'Integrimi me kontrollorë karikimi MPPT dhe gjeneratorë dizell (Auto-start)',
        'Sistemet e pompimit solar për ujitje bujqësore (Solar Water Pumping)',
        'Menaxhimi i ngarkesave kritike dhe prioritetizimi me rele inteligjente',
      ],
      highlightsEn: [
        'Precise autonomy sizing for consecutive cloudy days (Days of Autonomy)',
        'MPPT charge controller coupling and automated generator start/stop (ATS)',
        'Solar DC/AC surface and submersible water pump sizing for irrigation',
        'Smart load shedding relays and critical sub-panel wiring',
      ],
      curriculum: [
        {
          week: 'Java 01 - 02',
          titleSq: 'Auditimi i Ngarkesave & Llogaritja e Kapacitetit',
          titleEn: 'Load Profiling & Capacity Calculation',
          descSq: 'Përcaktimi i kërkesës ditore për vat-orë (Wh), llogaritja e rrymave startuese të motorëve dhe koeficientët e sigurisë.',
          descEn: 'Daily watt-hour audit, motor surge inrush current multipliers, and autonomy reserve sizing.',
        },
        {
          week: 'Java 03 - 04',
          titleSq: 'Montimi i Inverter-Karikuesve & Pompave Solare',
          titleEn: 'Inverter-Chargers & Solar Pumping Assemblies',
          descSq: 'Konfigurimi i Victron MultiPlus, SmartSolar MPPT, dhe inverterëve me frekuencë të ndryshueshme (VFD) për pompa.',
          descEn: 'Setting up Victron Energy ecosystems, SmartSolar controllers, and Variable Frequency Drives for pumps.',
        },
        {
          week: 'Java 05',
          titleSq: 'Sinkronizimi Hibrid & Testimi Praktik',
          titleEn: 'Hybrid Synchronization & Practical Bench Test',
          descSq: 'Lidhja e impiantit me burim dytësor backup dhe simulimi i dështimit të burimeve primare në laborator.',
          descEn: 'Backup source synchronization, AC-coupling with existing generators, and black-start commissioning.',
        }
      ]
    },
    {
      id: 'industrial-safety-hse',
      category: 'solar',
      tag: 'SAFETY & COMPLIANCE',
      tagColor: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
      accentBorder: 'hover:border-rose-500/50',
      accentGlow: 'hover:shadow-rose-500/10',
      titleSq: 'Siguria në Punë në Lartësi & Standardet Elektrike (HSE)',
      titleEn: 'Work at Height Safety & Electrical High Voltage (HSE)',
      descSq: 'Certifikim thelbësor për çdo montues dhe inxhinier diellor mbi pajisjet e mbrojtjes personale (PPE), shpëtimin në çati dhe rreziqet nga tensioni i lartë DC.',
      descEn: 'Critical health, safety, and environmental (HSE) qualification focusing on fall arrest harness protocols, roof rope access, and high-voltage DC arc flash prevention.',
      price: '€220',
      pricePeriodSq: 'Pagesë e plotë',
      pricePeriodEn: 'One-time fee',
      levelSq: 'Të Gjitha Nivelet',
      levelEn: 'All Levels',
      duration: '2 Javë (30 Orë)',
      formatSq: 'Simulim Praktik në Kullë / Çati',
      formatEn: 'Tower & Roof Practical Rigging',
      certSq: 'Certifikatë e Sigurisë në Punë (HSE)',
      certEn: 'Certified HSE Occupational Safety',
      bgGradient: 'from-rose-500/20 via-slate-900 to-slate-950',
      bannerImage: '/640933758_122212965542355704_6725679518158766618_n.jpg',
      seatsLeft: 10,
      highlightsSq: [
        'Përdorimi i rripave të sigurimit dhe sistemeve të ankorimit (Lifelines)',
        'Mbrojtja nga rreziqet e harkut elektrik (Arc Flash) dhe shokut nga 1000V/1500V DC',
        'Procedurat e bllokimit dhe etiketimit të energjisë (LOTO - Lockout/Tagout)',
        'Protokolli i shpëtimit dhe ndihmës së shpejtë për punonjësit në lartësi',
      ],
      highlightsEn: [
        'Harness fitment, dynamic lanyard inspection, and certified lifeline rigging',
        '1000V/1500V DC arc flash protection, insulated PPE, and safe de-energization',
        'Lockout/Tagout (LOTO) protocols for electrical distribution cabinets',
        'Suspension trauma rescue and occupational emergency first-response drills',
      ],
      curriculum: [
        {
          week: 'Java 01',
          titleSq: 'Rregullat Ligjore & Pajisjet Mbrojtëse Personale (PPE)',
          titleEn: 'Regulatory Standards & PPE Deployment',
          descSq: 'Inspektimi i kaskave, rripave truporë me 5 pika ankorimi, litarëve statikë dhe pikave të sigurta të montimit.',
          descEn: '5-point full-body harness check, anchor point testing, static ropes, and fall arrest rating criteria.',
        },
        {
          week: 'Java 02',
          titleSq: 'Ushtrime Praktike të Shpëtimit & LOTO Elektrik',
          titleEn: 'Practical Evacuation Drills & Electrical LOTO',
          descSq: 'Simulim i personit të varur në litar, përdorimi i pajisjes së zbritjes emergjente dhe vendosja e drynave LOTO në kutitë e kombinuara.',
          descEn: 'Suspension trauma rapid lowering protocols, descender device drills, and combiner box LOTO isolation practice.',
        }
      ]
    }
  ];

  const filteredPrograms = programs.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="programs" className="py-24 bg-[#0B0F19] text-white relative overflow-hidden">
      {/* Visual Accent Background Pattern */}
      <div className="absolute inset-0 bg-solar-motif opacity-[0.04] pointer-events-none"></div>
      
      {/* Radial ambient glow effects */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-heading font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            {currentLanguage === 'sq' ? 'PROGRAMET E AVANCUARA' : 'ADVANCED PROGRAM CATALOG'}
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white mb-5">
            {currentLanguage === 'sq' ? (
              <>Kurrikula Profesionale <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-brand-yellow">e Gjeneratës së Re</span></>
            ) : (
              <>Professional Curriculum <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-400 to-brand-yellow">for Modern Industry</span></>
            )}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            {currentLanguage === 'sq' 
              ? 'Trajnime të thelluara teknike me mësim dual: teori inxhinierike në laborator dhe praktikë intensive në parkun diellor 2MW në Pejë.'
              : 'Engineering-grade technical qualifications combining classroom rigour with hands-on commissioning at Kosovo\'s premier 2MW operational solar plant.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2.5 rounded-lg text-sm font-heading font-semibold transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-brand-green text-white shadow-md shadow-brand-green/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {currentLanguage === 'sq' ? 'Të Gjitha Programet (6)' : 'All Programs (6)'}
            </button>
            <button
              onClick={() => setActiveCategory('solar')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-heading font-semibold transition-all duration-200 ${
                activeCategory === 'solar'
                  ? 'bg-brand-green text-white shadow-md shadow-brand-green/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-400" />
              {currentLanguage === 'sq' ? 'Fotovoltaik & O&M (4)' : 'Solar PV & O&M (4)'}
            </button>
            <button
              onClick={() => setActiveCategory('battery')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-heading font-semibold transition-all duration-200 ${
                activeCategory === 'battery'
                  ? 'bg-brand-green text-white shadow-md shadow-brand-green/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Battery className="w-4 h-4 text-emerald-400" />
              {currentLanguage === 'sq' ? 'Bateri & Mikrorrjete (2)' : 'Storage & Microgrids (2)'}
            </button>
          </div>
        </div>

        {/* Programs Grid: 3-column responsive layout with Tactical 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-6">
          {filteredPrograms.map((course) => (
            <TacticalCard
              key={course.id}
              className="flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1.5"
              radarColor="bg-emerald-400"
              coordinateTag={`MODULE // ${course.tag}`}
              isDark={true}
            >
              {/* Inner Card Container */}
              <div className="flex flex-col h-full overflow-hidden rounded-2xl">
                {/* Card Banner with Photo + Overlay */}
                <div className="relative h-52 overflow-hidden bg-slate-900 border-b border-white/5">
                  <img 
                    src={course.bannerImage} 
                    alt={currentLanguage === 'sq' ? course.titleSq : course.titleEn}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 opacity-80"
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
                  <h3 className="text-lg md:text-xl font-heading font-bold uppercase tracking-tight leading-snug text-white group-hover:text-brand-green transition-colors mb-2.5 min-h-[3.25rem] line-clamp-2">
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
                      <span className="font-semibold text-white font-mono text-[11px]">{course.duration}</span>
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

                  {/* Price Row - Highly Visible above CTA */}
                  <div className="pt-3.5 pb-3.5 mt-auto flex items-baseline justify-between border-t border-white/10 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                      {currentLanguage === 'sq' ? 'Çmimi i Trajnimit' : 'Tuition Fee'}
                    </span>
                    <span className="text-2xl md:text-3xl font-heading font-bold text-brand-yellow tracking-tight">
                      {course.price}
                    </span>
                  </div>

                  {/* Action Buttons - Immediately Identifiable CTA */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full inline-flex items-center justify-center font-heading font-semibold tracking-wide rounded-full px-3 py-2.5 text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-white/20 gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-brand-yellow" />
                      {currentLanguage === 'sq' ? 'SILLABUSI' : 'SYLLABUS'}
                    </button>
                    <a
                      href="#contact"
                      className="w-full inline-flex items-center justify-center font-heading font-bold tracking-wide rounded-full px-3 py-2.5 text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-md shadow-brand-green/25 hover:shadow-lg hover:shadow-brand-green/35 gap-1.5"
                    >
                      <span>{currentLanguage === 'sq' ? 'APLIKO' : 'ENROLL'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </div>
            </TacticalCard>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-slate-900 via-[#131B2E] to-slate-900 p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-heading font-bold text-white mb-1">
                {currentLanguage === 'sq' ? 'Standardi Dual Gjermano-Kosovar i Aftësimit' : 'German-Kosovar Dual Training Standard'}
              </h4>
              <p className="text-sm text-gray-400 max-w-xl">
                {currentLanguage === 'sq' 
                  ? 'Çdo kursant merr përvojë në impiantin solar 2MW në Pejë të ELING Grup dhe certifikohet për të punuar menjëherë në tregun vendas dhe ndërkombëtar.'
                  : 'Every trainee completes real-world commissioning at ELING Grup\'s 2MW Pejë plant and obtains immediate qualifications for the regional and European market.'}
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="whitespace-nowrap inline-flex items-center justify-center font-bold tracking-wide rounded-full px-6 py-2.5 text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-white hover:bg-gray-100 text-brand-navy shadow-lg"
          >
            {currentLanguage === 'sq' ? 'Bisedo me Këshilltarin e Trajnimit' : 'Talk with an Advisor'}
          </a>
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
                  {selectedCourse.duration}
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
