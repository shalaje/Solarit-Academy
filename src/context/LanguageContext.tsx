import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sq' | 'en';

interface LanguageContextType {
  language: Language;
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
    'nav.partners': 'Partnerët',
    'nav.contact': 'Kontakti',
    'nav.apply': 'Apliko Tani',
    
    // Hero
    'hero.title': 'Bëhu Instalues i Certifikuar i Sistemeve Solare',
    'hero.subtitle': 'Aftësim profesional dhe praktikë në parkun solar më të madh në Kosovë.',
    'hero.apply': 'Apliko Tani',
    'hero.programs': 'Shiko Programet',
    
    // Programs
    'programs.title': 'Programet e Trajnimit',
    'programs.subtitle': 'Kurrikula e dizajnuar për tregun e punës',
    'prog.solar.title': 'Energjia Solare',
    'prog.solar.desc': 'Instalimi dhe mirëmbajtja e sistemeve fotovoltaike.',
    'prog.solar.duration': 'Niveli Bazë & i Avancuar',
    'prog.battery.title': 'Ruajtja e Energjisë me Bateri',
    'prog.battery.desc': 'Dizajnimi dhe integrimi i sistemeve akumuluese (BESS).',
    'prog.battery.duration': 'Niveli i Avancuar',
    'prog.efficiency.title': 'Efiçienca e Energjisë',
    'prog.efficiency.desc': 'Praktikat më të mira për objekte komerciale dhe rezidenciale.',
    'prog.efficiency.duration': 'Niveli Bazë',
    
    // Why Solarit
    'why.title': 'Pse Solarit Academy?',
    'why.dual.title': 'Model Dual i Mësimit',
    'why.dual.desc': 'Kombinim optimal i teorisë në klasë dhe punës praktike.',
    'why.cert.title': 'Certifikim Profesional',
    'why.cert.desc': 'Kualifikim i njohur për zhvillim të menjëhershëm në karrierë.',
    'why.park.title': '2 MW Park Solar për Praktikë',
    'why.park.desc': 'Përvojë reale pune në impiantin funksional në Pejë.',
    'why.eling.title': 'Përkrahur nga ELING Grup',
    'why.eling.desc': 'Mbështetur nga liderët e industrisë së energjisë në vend.',
    
    // Facility
    'facility.title': 'Mjedisi i Trajnimit',
    'facility.subtitle': 'Klasa moderne dhe hapësira reale praktike',
    
    // Leadership
    'leadership.title': 'Udhëheqja & Instruktorët',
    'leadership.manager.role': 'Drejtor Ekzekutiv',
    'leadership.manager.quote': '"Misioni ynë është të ndërtojmë gjeneratën e re të profesionistëve të energjisë së ripërtëritshme, duke ofruar trajnime me standarde ndërkombëtare dhe duke fuqizuar diversitetin gjinor në sektor."',
    
    // Partners
    'partners.title': 'Partnerët dhe Bashkëpunëtorët',
    
    // Impact
    'impact.trained': 'Të Trajnuar',
    'impact.capacity': 'Kapaciteti Vjetor',
    'impact.instructors': 'Instruktorë',
    'impact.women': 'Pjesëmarrja e Grave',
    
    // Common Tags / Badges
    'badge.curriculum': 'Kurrikula',
    'badge.advantage': 'Avantazhi Ynë',
    'badge.campus': 'Kampusi',
    'badge.leadership': 'Ekipi Drejtues',
    'badge.enrollment': 'Regjistrimi',
    
    // Additional Text
    'why.park_badge.title': '2 MW Park Solar',
    'why.park_badge.desc': 'Hapësirë për praktikë në Pejë',
    'contact.name.placeholder': 'Filan Fisteku',
    'contact.email.placeholder': 'email@example.com',
    'contact.phone_title': 'Telefon',
    'contact.email_title': 'Email',
    'contact.address_title': 'Adresa',
    'contact.address_desc': 'Magjistralja Ferizaj–Prishtinë, afër Qmi 3, Lipjan',
    'footer.nav_title': 'Navigimi',
    'footer.social_title': 'Rrjetet Sociale',
    'footer.built_by': 'Ndërtuar nga',

    // Contact
    'contact.title': 'Apliko ose Na Kontaktoni',
    'contact.name': 'Emri dhe Mbiemri',
    'contact.email': 'Email ose Numri i Telefonit',
    'contact.program': 'Programi i Interesit',
    'contact.message': 'Mesazhi (Opsionale)',
    'contact.send': 'Dërgo Kërkesën',
    
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
    'nav.partners': 'Partners',
    'nav.contact': 'Contact',
    'nav.apply': 'Apply Now',
    
    // Hero
    'hero.title': 'Become a Certified Solar Installer',
    'hero.subtitle': 'Professional training and hands-on practice at Kosovo\'s largest solar park.',
    'hero.apply': 'Apply Now',
    'hero.programs': 'View Programs',
    
    // Programs
    'programs.title': 'Training Programs',
    'programs.subtitle': 'Curriculum designed for the modern job market',
    'prog.solar.title': 'Solar Energy',
    'prog.solar.desc': 'Installation and maintenance of photovoltaic systems.',
    'prog.solar.duration': 'Basic & Advanced Level',
    'prog.battery.title': 'Battery Storage Solutions',
    'prog.battery.desc': 'Design and integration of energy storage systems (BESS).',
    'prog.battery.duration': 'Advanced Level',
    'prog.efficiency.title': 'Energy Efficiency',
    'prog.efficiency.desc': 'Best practices for commercial and residential buildings.',
    'prog.efficiency.duration': 'Basic Level',
    
    // Why Solarit
    'why.title': 'Why Solarit Academy?',
    'why.dual.title': 'Dual Learning Model',
    'why.dual.desc': 'Optimal combination of classroom theory and hands-on practice.',
    'why.cert.title': 'Professional Certification',
    'why.cert.desc': 'Recognized qualification for immediate career advancement.',
    'why.park.title': '2 MW Solar Park',
    'why.park.desc': 'Real-world experience at the functional solar plant in Pejë.',
    'why.eling.title': 'Backed by ELING Grup',
    'why.eling.desc': 'Supported by the leading energy industry company in the country.',
    
    // Facility
    'facility.title': 'Training Environment',
    'facility.subtitle': 'Modern classrooms and real-world practical spaces',
    
    // Leadership
    'leadership.title': 'Leadership & Instructors',
    'leadership.manager.role': 'Executive Director',
    'leadership.manager.quote': '"Our mission is to build the next generation of renewable energy professionals, providing training to international standards and empowering gender diversity in the sector."',
    
    // Partners
    'partners.title': 'Partners & Collaborators',
    
    // Impact
    'impact.trained': 'Trained Professionals',
    'impact.capacity': 'Annual Capacity',
    'impact.instructors': 'Certified Instructors',
    'impact.women': 'Women Participation',
    
    // Common Tags / Badges
    'badge.curriculum': 'Curriculum',
    'badge.advantage': 'Our Advantage',
    'badge.campus': 'The Campus',
    'badge.leadership': 'Leadership Team',
    'badge.enrollment': 'Enrollment',
    
    // Additional Text
    'why.park_badge.title': '2 MW Solar Park',
    'why.park_badge.desc': 'Practice facility in Pejë',
    'contact.name.placeholder': 'John Doe',
    'contact.email.placeholder': 'email@example.com',
    'contact.phone_title': 'Phone',
    'contact.email_title': 'Email',
    'contact.address_title': 'Address',
    'contact.address_desc': 'Ferizaj-Prishtina Highway, near Qmi 3, Lipjan',
    'footer.nav_title': 'Navigation',
    'footer.social_title': 'Social Media',
    'footer.built_by': 'Built by',

    // Contact
    'contact.title': 'Enroll or Contact Us',
    'contact.name': 'Full Name',
    'contact.email': 'Email or Phone Number',
    'contact.program': 'Program of Interest',
    'contact.message': 'Message (Optional)',
    'contact.send': 'Send Request',
    
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
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
