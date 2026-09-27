import { Sun, Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-[#111625] to-black text-gray-300 py-16 border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 border-b border-white/10 pb-12 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-white font-heading font-bold text-2xl sm:text-3xl tracking-tight">
                S<Sun className="w-7 h-7 text-brand-sun-start mx-0.5 mt-0.5" />LARIT
              </div>
              <div className="text-brand-green font-heading font-bold text-sm leading-none mt-1 uppercase">
                Academy
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>
          
          {/* Important Navigation Links */}
          <div className="md:col-span-4">
            <h4 className="font-heading font-bold text-white mb-4 uppercase tracking-wider text-xs sm:text-sm">
              {t('footer.nav_title')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="text-gray-400 hover:text-brand-green transition-colors inline-block py-0.5">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-400 hover:text-brand-green transition-colors inline-block py-0.5">
                  {t('nav.programs')}
                </a>
              </li>
              <li>
                <a href="#why-solarit" className="text-gray-400 hover:text-brand-green transition-colors inline-block py-0.5">
                  {t('nav.why_solarit')}
                </a>
              </li>
              <li>
                <a href="#facility" className="text-gray-400 hover:text-brand-green transition-colors inline-block py-0.5">
                  {t('nav.facility')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Channels */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold text-white mb-4 uppercase tracking-wider text-xs sm:text-sm">
              {t('footer.social_title')}
            </h4>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.facebook.com/profile.php?id=61560671136948" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-green hover:border-brand-green text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/solarit-academy/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-green hover:border-brand-green text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/solaritacademy/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-green hover:border-brand-green text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          
        </div>
        
        {/* Copyright & Secondary Attribution */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Solarit Academy. {t('footer.rights')}
          </div>
          <div className="flex items-center gap-1">
            {t('footer.built_by')}{' '}
            <a 
              href="https://novadigital.studio/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white font-medium ml-1 transition-colors"
            >
              Nova Digital Studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
