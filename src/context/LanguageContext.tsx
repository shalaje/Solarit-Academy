import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sq' | 'en';

interface LanguageContextType {
  language: Language;
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  sq: {
    // Navigation
    'nav.home': 'Ballina',
    'nav.programs': 'Programet',
    'nav.why_solarit': 'Pse Solarit',
    'nav.facility': 'Objekti',
    'nav.testimonials': 'Albumi',
    'nav.partners': 'Partnerët',
    'nav.contact': 'Kontakti',
    'nav.apply': 'Apliko Tani',
    
    // Hero
    'hero.title': 'Bëhu instalues i sistemeve solare',
    'hero.subtitle': 'Zhvillo aftësi profesionale në instalimin e sistemeve fotovoltaike përmes trajnimeve teorike dhe praktikës në parqe solare.',
    'hero.apply': 'Apliko tani',
    'hero.programs': 'Shiko programet',
    
    // Programs
    'programs.title': 'Programet e trajnimit',
    'programs.subtitle': 'Kurrikula e dizajnuar për tregun e punës',
    'prog.solar.title': 'Energjia solare',
    'prog.solar.desc': 'Instalimi dhe mirëmbajtja e sistemeve fotovoltaike.',
    'prog.solar.duration': 'Niveli bazë & i avancuar',
    'prog.battery.title': 'Ruajtja e energjisë me bateri',
    'prog.battery.desc': 'Dizajnimi dhe integrimi i sistemeve akumuluese (BESS).',
    'prog.battery.duration': 'Niveli i avancuar',
    'prog.efficiency.title': 'Efiçienca e energjisë',
    'prog.efficiency.desc': 'Praktikat më të mira për objekte komerciale dhe rezidenciale.',
    'prog.efficiency.duration': 'Niveli bazë',
    
    // Why Solarit
    'why.title': 'Pse Solarit Academy?',
    'why.dual.title': 'Model dual i mësimit',
    'why.dual.desc': 'Kombinim optimal i teorisë në klasë dhe punës praktike.',
    'why.cert.title': 'Certifikim',
    'why.cert.desc': 'Certifikatë e vijueshmërisë',
    'why.park.title': 'Praktika në park solar',
    'why.park.desc': 'Përvojë reale pune në parkun solar në Pejë.',
    'why.eling.title': 'Përkrahur nga ELING Grup',
    'why.eling.desc': 'Mbështetur nga liderët e industrisë së energjisë në vend.',
    
    // Facility
    'facility.title': 'Mjedisi i trajnimit',
    'facility.subtitle': 'Klasa moderne dhe hapësira reale praktike',
    
    // Leadership
    'leadership.title': 'Themeluesja e akademisë',
    'leadership.manager.role': 'Drejtoreshë Ekzekutive',
    'leadership.manager.quote': '"Misioni ynë është të ndërtojmë gjeneratën e re të profesionistëve të energjisë së ripërtëritshme, duke ofruar trajnime me standarde ndërkombëtare dhe duke fuqizuar diversitetin gjinor në sektor."',
    
    // Partners
    'partners.title': 'Partnerët dhe bashkëpunëtorët',
    
    // Impact
    'impact.trained': 'Të trajnuar',
    'impact.capacity': 'Kapaciteti vjetor',
    'impact.instructors': 'Instruktorë',
    'impact.women': 'Pjesëmarrja e grave',
    
    // Common Tags / Badges
    'badge.curriculum': 'Kurrikula',
    'badge.advantage': 'Avantazhi ynë',
    'badge.campus': 'Kampusi',
    'badge.leadership': 'Themeluesja',
    'badge.enrollment': 'Regjistrimi',
    
    // Additional Text
    'why.park_badge.title': '2 MW park solar',
    'why.park_badge.desc': 'Hapësirë për praktikë në Pejë',
    'contact.name.placeholder': 'Filan Fisteku',
    'contact.email.placeholder': 'email@example.com',
    'contact.phone_title': 'Telefon',
    'contact.email_title': 'Email',
    'contact.address_title': 'Adresa',
    'contact.address_desc': 'Magjistralja Ferizaj–Prishtinë, afër Qmi 3, Lipjan',
    'footer.nav_title': 'Navigimi',
    'footer.social_title': 'Rrjetet sociale',
    'footer.built_by': 'Ndërtuar nga',

    'contact.title': 'Apliko ose na kontaktoni',
    'contact.name': 'Emri dhe mbiemri',
    'contact.email': 'Email ose numri i telefonit',
    'contact.program': 'Programi i interesit',
    'contact.message': 'Mesazhi (opsionale)',
    'contact.send': 'Dërgo kërkesën',
    'contact.submitting': 'Duke dërguar aplikimin...',
    'contact.success_title': 'Aplikimi u dërgua me sukses!',
    'contact.success_desc': 'Faleminderit! Ekipi ynë akademik do t\'ju kontaktojë brenda 24 orëve me hapat e radhës.',
    'contact.error_title': 'Dërgimi nuk u realizua',
    'contact.error_desc': 'Ju lutem provoni përsëri ose zgjidhni njërën nga mundësitë direkte më poshtë:',
    'contact.email_fallback': 'Dërgo me email',
    'contact.whatsapp_fallback': 'Kontakto në WhatsApp',
    'contact.submit_another': 'Dërgo një aplikim tjetër',
    
    // Footer
    'footer.tagline': 'Akademia e parë profesionale për energji të ripërtëritshme në Kosovë.',
    'footer.rights': 'Të gjitha të drejtat e rezervuara.'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.programs': 'Programs',
    'nav.why_solarit': 'Why Solarit',
    'nav.facility': 'Facility',
    'nav.testimonials': 'Album',
    'nav.partners': 'Partners',
    'nav.contact': 'Contact',
    'nav.apply': 'Apply Now',
    
    // Hero
    'hero.title': 'Become a solar systems installer',
    'hero.subtitle': 'Develop professional skills in photovoltaic systems installation through theoretical training and hands-on practice at solar parks.',
    'hero.apply': 'Apply now',
    'hero.programs': 'View programs',
    
    // Programs
    'programs.title': 'Training programs',
    'programs.subtitle': 'Curriculum designed for the modern job market',
    'prog.solar.title': 'Solar energy',
    'prog.solar.desc': 'Installation and maintenance of photovoltaic systems.',
    'prog.solar.duration': 'Basic & advanced level',
    'prog.battery.title': 'Battery storage solutions',
    'prog.battery.desc': 'Design and integration of energy storage systems (BESS).',
    'prog.battery.duration': 'Advanced level',
    'prog.efficiency.title': 'Energy efficiency',
    'prog.efficiency.desc': 'Best practices for commercial and residential buildings.',
    'prog.efficiency.duration': 'Basic level',
    
    // Why Solarit
    'why.title': 'Why Solarit Academy?',
    'why.dual.title': 'Dual learning model',
    'why.dual.desc': 'Optimal combination of classroom theory and hands-on practice.',
    'why.cert.title': 'Certification',
    'why.cert.desc': 'Certificate of attendance',
    'why.park.title': 'Practice in solar park',
    'why.park.desc': 'Real-world experience at the solar park in Pejë.',
    'why.eling.title': 'Backed by ELING Grup',
    'why.eling.desc': 'Supported by the leading energy industry company in the country.',
    
    // Facility
    'facility.title': 'Training environment',
    'facility.subtitle': 'Modern classrooms and real-world practical spaces',
    
    // Leadership
    'leadership.title': 'Academy founder',
    'leadership.manager.role': 'Executive Director',
    'leadership.manager.quote': '"Our mission is to build the next generation of renewable energy professionals, providing training to international standards and empowering gender diversity in the sector."',
    
    // Partners
    'partners.title': 'Partners & collaborators',
    
    // Impact
    'impact.trained': 'Trained professionals',
    'impact.capacity': 'Annual capacity',
    'impact.instructors': 'Certified instructors',
    'impact.women': 'Women participation',
    
    // Common Tags / Badges
    'badge.curriculum': 'Curriculum',
    'badge.advantage': 'Our advantage',
    'badge.campus': 'The campus',
    'badge.leadership': 'Founder',
    'badge.enrollment': 'Enrollment',
    
    // Additional Text
    'why.park_badge.title': '2 MW solar park',
    'why.park_badge.desc': 'Practice facility in Pejë',
    'contact.name.placeholder': 'John Doe',
    'contact.email.placeholder': 'email@example.com',
    'contact.phone_title': 'Phone',
    'contact.email_title': 'Email',
    'contact.address_title': 'Address',
    'contact.address_desc': 'Ferizaj-Prishtina Highway, near Qmi 3, Lipjan',
    'footer.nav_title': 'Navigation',
    'footer.social_title': 'Social media',
    'footer.built_by': 'Built by',

    // Contact
    'contact.title': 'Enroll or contact us',
    'contact.name': 'Full name',
    'contact.email': 'Email or phone number',
    'contact.program': 'Program of interest',
    'contact.message': 'Message (optional)',
    'contact.send': 'Send request',
    'contact.submitting': 'Sending application...',
    'contact.success_title': 'Application submitted successfully!',
    'contact.success_desc': 'Thank you! Our academic admissions team will reach out within 24 hours with next steps.',
    'contact.error_title': 'Submission failed',
    'contact.error_desc': 'Please try again or select one of the direct contact channels below:',
    'contact.email_fallback': 'Send via email',
    'contact.whatsapp_fallback': 'Contact on WhatsApp',
    'contact.submit_another': 'Submit another application',
    
    // Footer
    'footer.tagline': 'The first professional renewable energy academy in Kosovo.',
    'footer.rights': 'All rights reserved.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('sq');

  const t = (key: string): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const keys = translations[language] as any;
    return keys[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, currentLanguage: language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
